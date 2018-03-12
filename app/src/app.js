import React, {Component} from 'react';

import Header from './components/Header';
import Playlist from './components/Playlist';
import Suggestions from './components/Suggestions';

import Q from 'q';

import {validateNTSShowURL} from './helpers';
import {getPlaylistData} from '../requests/youtube';
import {getRecentNTSShows} from '../requests/scraper';

import styles from './styles/styles.css';

function initialize(...functions) {
  return Q.all(functions.map(f => f()))
    .then(values => Promise.resolve({suggestions: values[0], playlist: values[1]}))
    .catch(err => err);
}

class NTSPlaylist extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: false,
      ntsShowUrl: '',
      ntsShowUrlError: '',
      playlist: [],
      suggestions: [],
      selected: 0
    };

    this.select = this.select.bind(this);
    this.validateAndSearch = this.validateAndSearch.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }


  componentDidMount () {
    this.setState({loading: true});

    initialize(getRecentNTSShows, getPlaylistData)
      .then(values => this.setState({...values, loading: false}))
      .catch(err => console.log('error initizlizing in componentDidMount', err));
  }

  select(index) {
    this.setState({selected: index});
  }

  validateAndSearch(showUrl) {
    const {validUrl, error} = validateNTSShowURL(showUrl);

    error ? this.setState({ntsShowUrlError: error}) : this.getPlaylist(validUrl);

  }

  getPlaylist(showUrl) {
    getPlaylistData(showUrl)
      .then(playlist => {
        this.setState({playlist: playlist, ntsShowUrlError: null});
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <Header
            search={this.validateAndSearch}
            ntsPlaylistUrl={this.state.ntsPlaylistUrl}
            ntsShowUrlError={this.state.ntsShowUrlError}
            />
          <div className={styles.content}>
            <Suggestions suggestions={this.state.suggestions}/>
            {
              this.state.loading
                ? <div>LOADING...</div>
                : <Playlist
                    playlist={this.state.playlist}
                    select={this.select}
                    selected={this.state.selected}
                    />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default NTSPlaylist;

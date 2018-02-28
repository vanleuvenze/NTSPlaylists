import React, {Component} from 'react';

import Header from './components/Header';
import Playlist from './components/Playlist';
import NowPlaying from './components/NowPlaying';

import {validateNTSShowURL} from './helpers';
import {getPlaylistData} from '../requests/youtube';

import styles from './styles/styles.css';

class NTSPlaylist extends Component {
  constructor (props) {
    super(props);

    this.state = {
      description: {},
      loading: false,
      ntsShowUrl: '',
      ntsShowUrlError: '',
      playlist: null,
      selected: 0
    }

    this.getDescription = this.getDescription.bind(this);
    this.select = this.select.bind(this);
    this.validateAndSearch = this.validateAndSearch.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }


  componentDidMount () {
    this.setState({ loading: true });

    getPlaylistData()
      .then(playlist => {
        this.setState({loading: false, playlist})
    });
  }

  getDescription(artist, description) {
    // if the description is good - use that, otherwise try to get from discogs
  }


  select(index) {
    this.setState({selected: index});
  }

  validateAndSearch(showUrl) {
    const {validUrl, error} = validateNTSShowURL(showUrl);

    error ? this.setState({ntsShowUrlError: error}) : this.getPlaylist(showUrl);

  }

  getPlaylist(showUrl) {
    getPlaylistData(showUrl)
      .then(playlist => {
        this.setState({
          playlist: playlist,
          ntsShowUrlError: null
        })
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

            <div>
              <Playlist playlist={this.state.playlist} select={this.select} selected={this.state.selected}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NTSPlaylist;

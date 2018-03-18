import React, {Component} from 'react';

import Header from './components/Header';
import Playlist from './components/Playlist';
import Suggestions from './components/Suggestions';

import {validateNTSShowURL} from './helpers';
import {getPlaylistData} from '../requests/youtube';
import {getRecentNTSShows} from '../requests/scraper';

import styles from './styles/styles.css';

class NTSPlaylist extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loadingSuggestions: false,
      loadingPlaylist: false,
      ntsShowUrl: '',
      ntsShowUrlError: '',
      playlist: [],
      suggestions: [],
      showSuggestions: false
    };

    this.getPlaylist = this.getPlaylist.bind(this);
    this.validateAndSearch = this.validateAndSearch.bind(this);
  }


  componentDidMount () {
    this.setState({loadingSuggestions: true});

    getRecentNTSShows()
      .then(suggestions => this.setState({suggestions, loadingSuggestions: false}))
      .catch(err => console.log('error loading suggestions', err));
  }

  getPlaylist(showUrl) {
    this.setState({loadingPlaylist: true}, () => {
      getPlaylistData(showUrl)
        .then(playlist => {
          this.setState({
            playlist: playlist,
            ntsShowUrl: showUrl,
            ntsShowUrlError: null,
            loadingPlaylist: false
          });
        });
    });
  }

  validateAndSearch(showUrl) {
    const {validUrl, error} = validateNTSShowURL(showUrl);
    error ? this.setState({ntsShowUrlError: error}) : this.getPlaylist(validUrl);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <Header
            search={this.validateAndSearch}
            ntsShowUrl={this.state.ntsShowUrl}
            ntsShowUrlError={this.state.ntsShowUrlError}
            />
          <div className={styles.content}>
            <div className={styles.suggestionContainer}>
              <Suggestions
                loading={this.state.loadingSuggestions}
                select={suggestionUrl => this.validateAndSearch(suggestionUrl)}
                show={this.state.showSuggestions}
                suggestions={this.state.suggestions}
                toggle={() => this.setState({showSuggestions: !this.state.showSuggestions})}
                />
            </div>
            <div className={styles.playlistContainer}>
              <Playlist
                loading={this.state.loadingPlaylist}
                playlist={this.state.playlist}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NTSPlaylist;

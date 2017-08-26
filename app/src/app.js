import React, { Component } from 'react';

import Header from './components/Header';
import Search from './components/Search';
import Playlist from './components/Playlist';
import NowPlaying from './components/NowPlaying';

import { getPlaylistData } from './utils/utils';
import { getDiscogsArtistInformation } from './utils/discogsAPI';

import styles from './styles/styles.css';

class NTSPlaylist extends Component {
  constructor (props) {
    super(props);

    this.state = {
      description: {},
      loading: false,
      nowPlayingUrl: null,
      playlist: null
    }

    this.getDescription = this.getDescription.bind(this);
    this.select = this.select.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }


  componentDidMount () {
    this.setState({ loading: true });

    getPlaylistData()
      .then(playlist => {
        const firstId = playlist[0].id;
        const firstDescription = playlist[0].description;
        const firstArtist = playlist[0].artist;

        this.setState({
          description: {artist: firstArtist, details: firstDescription},
          loading: false,
          nowPlayingUrl: "https://www.youtube.com/embed/" + firstId,
          playlist,
        })
    });
  }

  getDescription(artist, description) {
    // if the description is good - use that, otherwise try to get from discogs
  }


  select (songInfo) {
    const id = songInfo.id;
    const description = songInfo.description; // this is from youtube
    const artist = songInfo.artist;

    this.setState({
      nowPlayingUrl: "https://www.youtube.com/embed/" + id,
      description: {artist, details: description}
    });
  }


  searchInput (ntsUrl) {
    getPlaylistData(ntsUrl)
      .then(playlist => {
        const firstId = playlist[0].id;
        const description = playlist[0].description;

        this.setState({
          playlist: playlist,
          nowPlayingUrl: "https://www.youtube.com/embed/" + firstId,
          youtubeDescription: description
        })
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <Header/>
        <div>
          <NowPlaying description={this.state.description} nowPlayingUrl={this.state.nowPlayingUrl}/>
          <Playlist playlist={this.state.playlist} select={this.select}/>
        </div>
      </div>
    );
  }
}

export default NTSPlaylist;

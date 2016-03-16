import React, { Component } from 'react'
import { formatPlaylistData } from '../utils/utils.js'
import { CircularProgress } from 'material-ui'
import Header from './components/Header.jsx'
import Search from './components/Search.jsx'
import NowPlaying from './components/NowPlaying.jsx'
import Playlist from './components/Playlist.jsx'
import Q from 'q'

import '../styles/styles.css';


export default class App extends Component {
  constructor () {
    super()
    this.state = {
      playlist: null,
      nowPlayingURL: null,
      nowPlayingArtist: null,
      youtubeDescription: null
    }
    this.select = this.select.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }


  componentWillMount () {

   formatPlaylistData()
   .then(function (playlist) {

      let firstId = playlist[0].id;
      let firstDescription = playlist[0].description;
      let firstArtist = playlist[0].artist
      console.log('from app', playlist);

      this.setState({
        playlist: playlist,
        nowPlayingURL: "https://www.youtube.com/embed/" + firstId,
        nowPlayingArtist: firstArtist,
        youtubeDescription: firstDescription
      })
   }.bind(this));

  }


  select (songInfo) {
    let id = songInfo.id;
    let description = songInfo.description;
    let artist = songInfo.artist;

    console.log('selecting ', songInfo)

    this.setState({
      nowPlayingURL: "https://www.youtube.com/embed/" + id,
      nowPlayingArtist: artist,
      youtubeDescription: description
    });
  }


  searchInput (ntsUrl) {

    formatPlaylistData(ntsUrl)
    .then(function (playlist) {

      let firstId = playlist[0].id;
      let description = playlist[0].description;

      this.setState({
        playlist: playlist,
        nowPlayingArtist: "https://www.youtube.com/embed/" + firstId,
        youtubeDescription: description
      })

    }.bind(this));

  }


  render () {

    return (
      <div className='container'>
        <Header/>
        <Search search={this.searchInput}/>
        <div className='container-flex'>
          <NowPlaying youtubeInfo={this.state}/>
          <Playlist select={this.select} playlist={this.state.playlist}/>
        </div>
      </div>
    )
  }
}

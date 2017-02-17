import React, { Component } from 'react'
import { formatPlaylistData } from '../../utils/utils.js'
import { CircularProgress } from 'material-ui'
import Header from '../Header.jsx'
import Search from '../Search.jsx'
import NowPlaying from './NowPlaying.jsx'
import Playlist from './Playlist.jsx'
import store from '../../store.js'
import Q from 'q'

import '../../../public/styles/styles.css'


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

    console.log('this is our redux store', store.getState())

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
        <div className='container-flex'>
          <NowPlaying youtubeInfo={this.state}/>
          <Playlist select={this.select} playlist={this.state.playlist}/>
        </div>
      </div>
    )
  }
}
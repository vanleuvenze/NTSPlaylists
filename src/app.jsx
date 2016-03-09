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
      nowPlaying: null
    }
    this.select = this.select.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }


  componentWillMount () {

   formatPlaylistData()
   .then(function (playlist) {

      var firstId = playlist[0].id;

      this.setState({
        playlist : playlist,
        nowPlaying : "https://www.youtube.com/embed/" + firstId
      })
   }.bind(this));

  }


  select (videoId) {
    this.setState({
      nowPlaying : "https://www.youtube.com/embed/" + videoId
    }) 
  }


  searchInput (ntsUrl) {
    formatPlaylistData(ntsUrl)
    .then(function (playlist) {

      var firstId = playlist[0].id;

      this.setState({
        playlist: playlist,
        nowPlaying: "https://www.youtube.com/embed/" + firstId
      })

    }.bind(this));
  }


  render () {
    console.log('playlist in App:', this.state.playlist);
    return (
      <div className='container'>
        <Header/>
        <Search search={this.searchInput}/>
        <div className='container-flex'>
          <NowPlaying nowPlaying={this.state.nowPlaying}/>
          <Playlist select={this.select} playlist={this.state.playlist}/>
        </div>
      </div>
    )
  }
}

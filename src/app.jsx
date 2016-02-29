import React, { Component } from 'react';
import { formatPlaylistData } from '../utils/utils.js'
import { CircularProgress } from 'material-ui'
import Playlist from './components/Playlist.jsx'
import Header from './components/Header.jsx'
import NowPlaying from './components/NowPlaying.jsx'
import Q from 'q'

import '../styles/styles.css';


export default class App extends Component {
  constructor () {
    super()
    this.state = {
      playlist: null,
      nowPlaying: null
    }
  }

  componentWillMount () {

   formatPlaylistData()
   .then(function (playlist) {

      var firstId = playlist[0].id;

      this.setState({
        playlist : playlist,
        nowPlaying : "https://www.youtube.com/embed/" + firstId
      })
   }.bind(this))

  }

  select (videoId) {
    console.log(videoId)
    this.setState({
      nowPlaying : videoId
    }) 

  }


  render () {
    console.log('playlist in App:', this.state.playlist)
    return (
      <div className='container'>
        <Header/>
        <Playlist select={this.select.bind(this)} playlist={this.state.playlist}/>
        <NowPlaying nowPlaying={this.state.nowPlaying}/>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { CircularProgress, Menu, MenuItem, Divider } from 'material-ui'
import TrackInfo from './trackInfo.js'
import '../../styles/styles.css';
import h from '../../utils/formatting.js'

const Playlist = ({playlist, select}) => {
  if (playlist === null) {
    return <CircularProgress/>
  }
  return (
    <div className='playlist'>
        <div>
          {
            playlist.map(function (songInfo) {
              if (!songInfo) { return }
              let artistAndTitle = h.getArtistAndTitle(songInfo);
              return (
                <div>
                  <TrackInfo artistAndTitle={artistAndTitle} className = 'playlistItem' select={() => select(songInfo.id)}/>
                  <Divider/>
                </div>
              )
            })
          }
      </div>
    </div>
  )
}


export default Playlist


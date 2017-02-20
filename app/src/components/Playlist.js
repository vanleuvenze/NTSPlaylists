import React, { Component } from 'react'
import { CircularProgress, Menu, MenuItem, Divider } from 'material-ui'
import PlaylistItem from './PlaylistItem.js'
import '../styles/styles.css';

const Playlist = ({ playlist, select }) => {
  if (!playlist) return <CircularProgress/>

  return (
    <div className='playlist'>
      <div>
        {
          playlist.map((songInfo, i) => (
            songInfo
              ? (
                <div key={`playlist-item-${i}`}>
                  <PlaylistItem className='playlistItem' artist={songInfo.artist} title={songInfo.title} select={() => select(songInfo)}/>
                  <Divider/>
                </div>
                )
              : null
          ))
        }
      </div>
    </div>
  )
}


export default Playlist


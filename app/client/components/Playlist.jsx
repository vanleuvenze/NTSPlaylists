import React, { Component } from 'react'
import { CircularProgress, Menu, MenuItem, Divider } from 'material-ui'
import PlaylistItem from './PlaylistItem.jsx'
import '../../public/styles/styles.css';

const Playlist = ({
  playlist, 
  select
}) => {

  if (playlist === null) {
    return <CircularProgress/>
  }

  return (
    <div className='playlist'>
      <div>
        {
          playlist.map(function (songInfo) {
            if (!songInfo) { return }
            return (
              <div>
                <PlaylistItem className='playlistItem' artist={songInfo.artist} title={songInfo.title} select={() => select(songInfo)}/>
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


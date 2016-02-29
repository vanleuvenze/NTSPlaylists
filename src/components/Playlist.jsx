import React, { Component } from 'react'
import { CircularProgress } from 'material-ui'
import '../../styles/styles.css';


const Playlist = ({playlist, select}) => {
  if (playlist === null) {
    return <CircularProgress/>
  }
  return (
    <div className='playlist'>
      <div className='playlist-flex-container'>
        {
          playlist.map(function (track) {
            return <div onClick={() => select(track.id)}>{track.track}</div>
            // return <iframe onClick={() => select(track.id)} className='playlistItem' src={"https://www.youtube.com/embed/" + track.id} />
          })
        }
      </div>
    </div>
  )
}


export default Playlist


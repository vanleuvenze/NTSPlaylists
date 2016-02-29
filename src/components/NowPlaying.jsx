import React, { Component } from 'react'
import '../../styles/styles.css'

const NowPlaying = ({nowPlaying}) => (
  <div className='now-playing'>
    <div className='now-playing-flex-container'>
      <iframe className='now-playing-main' src={nowPlaying} />
    </div>
  </div>
)

export default NowPlaying
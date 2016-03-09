import React, { Component } from 'react' 
import { Paper } from 'material-ui'

const TrackInfo = ({
  artistAndTitle,
  title,
  select
}) => (
  <div className='trackInfo' onClick={select}>
    <div className='artist'>{artistAndTitle.artist.toUpperCase()}</div>
    <div className='songTitle'>{artistAndTitle.title.toUpperCase()}</div>
  </div>


);

export default TrackInfo
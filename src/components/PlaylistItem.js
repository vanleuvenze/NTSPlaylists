import React, { Component } from 'react' 
import { Paper } from 'material-ui'

const PlaylistItem = ({
  artist,
  title,
  select
}) => (
  <div className='playlistItemInfo' onClick={select}>
    <div className='artist'>{artist.toUpperCase()}</div>
    <div className='songTitle'>{title.toUpperCase()}</div>
  </div>
);

export default PlaylistItem
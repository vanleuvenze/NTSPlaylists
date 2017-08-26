import React, { Component } from 'react';
import PlaylistItem from '../PlaylistItem';

const Playlist = ({ playlist, select }) => {
  if (!playlist) return (<div>LOADING...</div>);

  return (
    <div>
      {playlist.map((songInfo, i) => songInfo &&
        <div key={`playlist-item-${i}`}>
          <PlaylistItem artist={songInfo.artist} title={songInfo.title} select={() => select(songInfo)}/>
        </div>
        )
      }
    </div>
);
}

export default Playlist;

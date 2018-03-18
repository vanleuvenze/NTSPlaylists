import React from 'react';
import PlaylistItem from '../PlaylistItem';
import styles from './playlist_styles.css';

const Playlist = ({loading, playlist, select, selected}) => {
  if (loading) return (<div>loading playlist...</div>);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {playlist.map((songInfo, i) => songInfo &&
          <PlaylistItem key={i} {...songInfo}/>
        )}
      </ul>
    </div>
  );
};


export default Playlist;

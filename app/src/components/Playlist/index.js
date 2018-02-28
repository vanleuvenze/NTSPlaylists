import React from 'react';
import PlaylistItem from '../PlaylistItem';
import styles from './playlist_styles.css';

const Playlist = ({ playlist, select, selected}) => {
  if (!playlist) return (<div>LOADING...</div>);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {playlist.map((songInfo, i) => songInfo &&
          <PlaylistItem
            key={i}
            songInfo={songInfo}
            select={() => select(i)}
            selected={selected === i}
            />
        )}
      </ul>
    </div>
  );
};

export default Playlist;

import React from 'react';
import styles from './playlist_item_styles.css';

const collapsedContent = ({artist, title}) => [
	<span key={1}>{artist}</span>,
  <span key={2}>{title}</span>
];

const fullContent = ({artist, description, id, title}) => {
	return (
		<div className={styles.fullContent}>
			<div className={styles.video}>
				<iframe
					className={styles.iframe}
					src={`https://www.youtube.com/embed/${id}`}
					/>
			</div>
			<div className={styles.contentContainer}>
				<span>{artist}</span>
				<div>{description}</div>
			</div>
		</div>
	);
};


const PlaylistItem = ({songInfo, select, selected}) => {
	return (
		<li className={`${styles.item} ${selected ? styles.selected : styles.default}`} onClick={select}>
			{selected ? fullContent(songInfo) : collapsedContent(songInfo)}
		</li>
	);
};

export default PlaylistItem;

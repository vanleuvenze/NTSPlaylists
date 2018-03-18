import React from 'react';
import styles from './playlist_item_styles.css';

const PlaylistItem = ({artist, description, id, title}) => {
	return (
		<li className={styles.item}>
			<div className={styles.fullContent}>
				<div className={styles.video}>
					<iframe
						className={styles.iframe}
						src={`https://www.youtube.com/embed/${id}`}
						/>
				</div>
				<div className={styles.contentContainer}>
					<h3>{artist}</h3>
					<div>{description}</div>
				</div>
			</div>
		</li>
	);
};

export default PlaylistItem;

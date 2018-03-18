import React from 'react';
import Search from '../Search';
import styles from './header_styles.css';

const Header = ({search, ntsShowUrl, ntsShowUrlError}) => (
	<div className={styles.container}>
		<div className={styles.top}>
			<div>NTS Playlist</div>
			<Search search={search} value={ntsShowUrl}/>
		</div>
		<div className={styles.bottom}>
			<span className={styles.error}>{ntsShowUrlError}</span>
		</div>
	</div>
);

export default Header;

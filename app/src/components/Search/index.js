import React from 'react';
import styles from './search_styles.css';


const Search = ({search, value}) => (
	<div className={styles.container}>
		<input
			className={styles.input}
			onKeyUp={e => e.keyCode === 13 && search(e.target.value)}
			placeholder='eg. http://www.nts.live/shows/show/episodes/episode'
			type="text"
		/>
	</div>
);

export default Search;

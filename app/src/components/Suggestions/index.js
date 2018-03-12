import React from 'react';
import styles from './suggestions_styles.css';

const Suggestions = ({suggestions}) => {
  if (!suggestions) return null;

  return (
    <ul className={styles.suggestionContainer}>
      {suggestions.map(s => (
        <li className={styles.suggestion}>
          <span className={styles.showTitle}>{s.name}</span>
          <div className={styles.showUrl}>{s.url}</div>
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;

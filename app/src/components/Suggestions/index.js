import React from 'react';
import styles from './suggestions_styles.css';

const Toggle = ({toggle, displayState}) => (
  <span onClick={toggle}>
    {displayState ? 'hide suggestions' : 'show suggestions'}
  </span>
);

const List = ({suggestions}) => (
  <ul className={styles.list}>
    {suggestions.map((suggestion, i) => (
      <li key={i} className={styles.suggestion}>
        <span key={i} className={styles.showTitle}>{suggestion.name}</span>
      </li>
    ))}
  </ul>
);

const Suggestions = ({suggestions, show, toggle}) => {
  if (!suggestions) return null;

  return (
    <div className={show ? styles.containerShow : styles.containerHide}>
      <Toggle toggle={toggle} displayState={show}/>
      <List suggestions={suggestions}/>
    </div>
  );
};

export default Suggestions;

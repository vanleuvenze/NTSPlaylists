import React from 'react';
import styles from './suggestions_styles.css';

const Toggle = ({toggle, displayState}) => (
  <span className={styles.toggle} onClick={toggle}>
    {displayState ? 'hide suggestions' : 'show suggestions'}
  </span>
);

const List = ({select, suggestions}) => (
  <ul className={styles.list}>
    {suggestions.map((suggestion, i) => (
      <li key={i} className={styles.suggestion} onClick={() => select(suggestion.url)}>
        <span key={i} className={styles.showTitle}>{suggestion.name}</span>
      </li>
    ))}
  </ul>
);

const Suggestions = ({loading, select, show, suggestions, toggle}) => {
  if (!suggestions) return null;
  else if (loading) return (<div>loading suggestions...</div>);

  return (
    <div className={show ? styles.containerShow : styles.containerHide}>
      <Toggle toggle={toggle} displayState={show}/>
      <List select={select} suggestions={suggestions}/>
    </div>
  );
};

export default Suggestions;

import React, { Component } from 'react';
import Description from '../Description';
import { chooseDescription } from '../../utils/helpers.js';

import styles from './now_playing_styles.css';

// TODO: make functional component
export default class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className={styles.iframeContainer}>
          <iframe className={styles.iframe} src={this.props.nowPlayingUrl} />
        </div>
        <Description description={this.props.description}/>
      </div>
    );
  }
};

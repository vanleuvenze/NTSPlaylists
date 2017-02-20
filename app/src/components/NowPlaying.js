import React, { Component } from 'react'
import Description from './Description.js'
import '../styles/styles.css'
import { chooseDescription } from '../utils/helpers.js'

// TODO: make functional component
export default class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='now-playing'>
        <div className='now-playing-flex-container'>
          <iframe className='now-playing-main' src={this.props.nowPlayingUrl} />
          <Description description={this.props.description}/>
        </div>
      </div>
    )
  }
}

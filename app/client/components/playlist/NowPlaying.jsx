import React, { Component } from 'react'
import Description from './Description.jsx'
import '../../../public/styles/styles.css'
import { getDiscogsArtistInformation } from '../../utils/discogsAPI.js'
import { chooseDescription } from '../../utils/helpers.js'

/*

having an issue with getting the correct information to description in an efficient way.  
Trace the data flow from the utility fetch functions, and then orchestrate a more
effective data flow.

think about what happens when we select a new track to play - when should the discogs api
be called? 

*/


export default class NowPlaying extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      aliases: null,
      profile: null,
      groups: null,
      urls: null,
      images: null
    }
  }

  componentWillReceiveProps (props) {
    //here we need to determine if we are getting good info from 
    //the discogs api - and if we are use that - otherwise, use the youtube
    //description
    let artist = props.youtubeInfo.nowPlayingArtist;
    console.log(this.props)
    getDiscogsArtistInformation(artist)
    .then(function (data) {

      var description = chooseDescription(props, data);

      this.setState({
       name: description.name,
       aliases: description.aliases,
       profile: description.profile, 
       groups: description.groups,
       urls: description.urls,
       images: description.images
      })

    }.bind(this))
  }

  render () {
    let videoSRC = this.props.youtubeInfo.nowPlayingURL;
    console.log(videoSRC)
    return (
      <div className='now-playing'>
        <div className='now-playing-flex-container'>
          <iframe className='now-playing-main' src={videoSRC} />
          <Description description={this.state}/>
        </div>
      </div> 
    )
  }
}

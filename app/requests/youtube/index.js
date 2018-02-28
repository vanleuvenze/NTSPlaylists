import Q from 'q';

import {YOUTUBE_API_KEY} from '../../../config/API_KEYS';

import {getNTSTracklist} from '../scraper';
import {formatTrackDetails} from './helpers';

/*

getVideosFromYoutube
takes a single trackname, makes a request to
the youtube API for that information, returns a promise.

*/

function getVideoFromYoutube(track) {
  const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${track}&maxResults=1&key=${YOUTUBE_API_KEY}`;

  return fetch(youtubeURL)
  .then(response => response.text())
  .then(track => JSON.parse(track))
  .catch(err => console.log('Error', err));
}

/*

getVideosFromYoutube
uses the array of promises returned by getPlaylist, resolves them all,
and returns a promise.

*/

function getVideosFromYoutube(url) {
  return getNTSTracklist(url).then(tracks => Q.all(tracks.map(track => getVideoFromYoutube(track))));
}


/*

getPlaylistData
uses the promise returned by getVideosFromYoutube and returns
an array of formatted video objects
IF YOU NEED ANY ADDITIONAL INFORMATION FROM THE YOUTUBE RESPONSE
OBJECT, TWEAK HERE

*/

export function getPlaylistData(url) {
  return getVideosFromYoutube(url)
    .then(playlist => playlist.map(track => (
      track && track.items[0] ? formatTrackDetails(track.items[0]) : null
    )));
}

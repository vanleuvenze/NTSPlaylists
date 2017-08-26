import cheerio from 'cheerio'
import Q from 'q'
import {YOUTUBE_API_KEY} from '../../../config/API_KEYS';
import {getArtistAndTitle} from './formatting'


/*

getNTSTracklist
takes a url from an NTS page and scrapes it for the
tracklist information

*/

function getNTSTracklist(url) {
  console.log('calling');
  url = url || 'http://www.nts.live/shows/guests/episodes/rush-hour-presents-hunee-31st-january-2015'

  return fetch(url)
    .then(res => res.text())
    .then(html => {
      //load our html
      const $ = cheerio.load(html);

      //get our tracklist
      const tracks = $('.tracks').find('li').map((index, listing) => $(listing).text()).get();

      console.log('these are our tracks', tracks);

      return tracks;
    })
    .catch(err => console.log('Error', err));
}

/*

getVideosFromYoutube
takes a single trackname, makes a request to
the youtube API for that information, returns a promise.

*/

function getVideoFromYoutube (track) {
  // TODO: make this a separate function
  const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${track}&maxResults=1&key=${YOUTUBE_API_KEY}`;

  return fetch(youtubeURL)
  .then(response => response.text())
  .then(track => JSON.parse(track))
  .catch(err => console.log('Error', err));
}


// TODO see if there is way to get these in batches instead of making a separate request for each video
// function getVideosFromYoutube (tracks) {
//   // TODO: make this a separate function
//   const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${tracks.join('|')}&maxResults=1&key=${YOUTUBE_API_KEY}`;

//   return fetch(youtubeURL)
//   .then(response => response.text())
//   .then(track => {
//     console.log('OYEEE', JSON.parse(track))
//     return JSON.parse(track)
//   })
//   .catch(err => console.log('Error', err));
// }

/*

getPlaylist
uses getNTSTracklist and getVideoFromYoutube to create and return an array
of promises - this array of promises is used in following function,
getUsablePlaylistData, along with Q.all, to return a resolved array of our
playlist objects.

*/

function getPlaylist (url) {
  return getNTSTracklist(url).then(tracks => tracks.map(track => getVideoFromYoutube(track)));
}


/*

createPlaylistPromiseArray
uses the array of promises returned by getPlaylist, resolves them all,
and returns a promise.

*/

function createPlaylistPromiseArray (url) {
  return getPlaylist(url).then(playlist => Q.all(playlist));
}


/*

getPlaylistData
uses the promise returned by createPlaylistPromiseArray and returns
an array of formatted video objects
IF YOU NEED ANY ADDITIONAL INFORMATION FROM THE YOUTUBE RESPONSE
OBJECT, TWEAK HERE

*/

export function getPlaylistData(url) {
  return createPlaylistPromiseArray(url)
    .then(playlist => {
      return playlist.map(track => {
        const trackDetails = track ? track.items[0] : undefined;

        if (!trackDetails) {
          return;
        }
        const artistAndTitle = getArtistAndTitle(trackDetails.snippet.title);

        return {
          id: trackDetails.id.videoId || '',
          artist: artistAndTitle.artist || '',
          title: artistAndTitle.title || '',
          description: trackDetails.snippet.description || ''
        };

      })
    })
}

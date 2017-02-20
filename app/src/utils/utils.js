import cheerio from 'cheerio'
import Q from 'q'
import {YOUTUBE_API_KEY} from '../../../config/API_KEYS';
import {getArtistAndTitle} from './formatting'


/*

getNTSTracklist
takes a url from an NTS page and scrapes it for the
tracklist information

*/

var getNTSTracklist = function (url) {

  url = url || 'http://www.nts.live/shows/the-do-you-breakfast-show/episodes/the-do-you-breakfast-show-w-charlie-bones-15th-february-2017'

  return fetch(url)
    .then(function (res) {
      return res.text();
    })
    .then(function (html) {
      //load our html
      var $ = cheerio.load(html);

      //get our tracklist
      var listings = $('.tracks').find('li');

      //pull out the individual tracks
      var tracks = listings.map(function () {
        return $(this).text();
      }).get();

      return tracks;
    })
    .catch(function (err) {
      console.log('Error', err);
    })
}


/*

getVideosFromYoutube
takes a single trackname, makes a request to
the youtube API for that information, returns a promise.

*/

var getVideoFromYoutube = function (track) {
  var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + track + "&maxResults=1&key=" + YOUTUBE_API_KEY;

  return fetch(youtubeURL)
  .then(function (response) {
    return response.text();
  })
  .then(function (track) {
    return JSON.parse(track);
  })
  .catch(function (err) {
    console.log('Error', err);
  })

}


/*

getPlaylist
uses getNTSTracklist and getVideoFromYoutube to create and return an array
of promises - this array of promises is used in following function,
getUsablePlaylistData, along with Q.all, to return a resolved array of our
playlist objects.

*/

var getPlaylist = function (url) {
  return getNTSTracklist(url)
    .then(function (tracks) {
      return tracks.map(function (track) {
        return getVideoFromYoutube(track);
    })
  })

}


/*

createPlaylistPromiseArray
uses the array of promises returned by getPlaylist, resolves them all,
and returns a promise.

*/

var createPlaylistPromiseArray = function (url) {

  return getPlaylist(url)
    .then(function (playlist) {
      return Q.all(playlist);
  })

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
      return playlist.map(function (track) {
        console.log(playlist, track)
        var trackDetails = track ? track.items[0] : undefined;

        if (!trackDetails) {
          return;
        }
        var artistAndTitle = getArtistAndTitle(trackDetails.snippet.title);

        return {
          id: trackDetails.id.videoId || '',
          artist: artistAndTitle.artist || '',
          title: artistAndTitle.title || '',
          description: trackDetails.snippet.description || ''
        };

      })
    })
}



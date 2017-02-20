import {DISCOGS_TOKEN} from '../../../config/API_KEYS.js'
import Q from 'q'


var searchDiscogsForArtists = function (artist) {

  artist = artist || 'george benson';
  var spaceFormattedArtist = artist.split(' ').join('%20');

  return fetch("https://api.discogs.com/database/search?q="+ spaceFormattedArtist + "&artist&token="+ DISCOGS_TOKEN)
  .then(function(response) {
    return response.json()
  })
  .then(function (data) {

    if (!data.results.length) { return }
    return data.results[0].resource_url;

  })

}


//use q to not nest this!
export function getDiscogsArtistInformation (artist) {

  return searchDiscogsForArtists(artist)
  .then(function (artistUrl) {
    if (!artistUrl) { return 'Nothing from Discogs!'}
    return fetch(artistUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (artistData) {
      console.log('artist data from discogs', artistData);
      return artistData;
    })
    .catch(err => console.log('discogs error', err))
  })
}





var DISCOGS_TOKEN = require('../config/API_KEYS.js').DISCOGS_TOKEN;
var Q = require('q');


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
var getDiscogsArtistInformation = function (artist) {

  return searchDiscogsForArtists(artist)
  .then(function (artistUrl) {
    if (!artistUrl) { return 'Nothing from Discogs!'}
    return fetch(artistUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (artistData) {
      console.log(artistData)
      return artistData;
    })
  })

}





module.exports = {

  getDiscogsArtistInformation : getDiscogsArtistInformation

}





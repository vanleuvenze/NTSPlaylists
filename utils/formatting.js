

module.exports.getArtistAndTitle = function (songInfo) {
  var separateArtistFromTitle;
  var successfulSeparation = true;

  if (songInfo.track.indexOf('-') !== -1) {

    separateArtistFromTitle = songInfo.track.split('-');

  } else if (songInfo.track.indexOf('–') !== -1) {

    separateArtistFromTitle = songInfo.track.split('–');

  } else {

    separateArtistFromTitle = songInfo.track;
    successfulSeparation = false;

  }
  
  var artist = successfulSeparation ? separateArtistFromTitle[0] : separateArtistFromTitle;
  var songTitle = successfulSeparation ? separateArtistFromTitle[1] : '';

  return {
    artist: artist,
    title: songTitle
  }
  
}


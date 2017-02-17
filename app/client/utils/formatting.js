

var getArtistAndTitle = function (songInfo) {
  var separateArtistFromTitle;
  var successfulSeparation = true;

  if (!songInfo) return;

  if (songInfo.indexOf('-') !== -1) {

    separateArtistFromTitle = songInfo.split('-');

  } else if (songInfo.indexOf('–') !== -1) {

    separateArtistFromTitle = songInfo.split('–');

  } else {

    separateArtistFromTitle = songInfo;
    successfulSeparation = false;

  }

  var artist = successfulSeparation ? separateArtistFromTitle[0] : separateArtistFromTitle;
  var songTitle = successfulSeparation ? separateArtistFromTitle[1] : '';

  return {
    artist: artist,
    title: songTitle
  }

};


module.exports = {

  getArtistAndTitle : getArtistAndTitle

}

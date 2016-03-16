
var chooseDescription = function (backup, discogsInfo) {

  var name = backup.youtubeInfo.nowPlayingArtist;
  var aliases = discogsInfo.aliases || '';
  var profile = discogsInfo.profile || backup.youtubeInfo.youtubeDescription;
  var groups = discogsInfo.groups || '';
  var urls = discogsInfo.groups || '';
  var images = discogsInfo.images || '';

  return {
    name: name,
    aliases: aliases,
    profile: profile, 
    groups: groups,
    urls: urls,
    images: images
  }

}







module.exports = {

  chooseDescription: chooseDescription

}
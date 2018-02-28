export function chooseDescription(backup, discogsInfo) {

  const name = backup.youtubeInfo.nowPlayingArtist;
  const aliases = discogsInfo.aliases || '';
  const profile = discogsInfo.profile || backup.youtubeInfo.youtubeDescription;
  const groups = discogsInfo.groups || '';
  const urls = discogsInfo.groups || '';
  const images = discogsInfo.images || '';

  return {
    name: name,
    aliases: aliases,
    profile: profile,
    groups: groups,
    urls: urls,
    images: images
  };
}

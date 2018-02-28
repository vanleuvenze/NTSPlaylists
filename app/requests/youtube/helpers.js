export function formatTrackDetails(track) {
  const artistAndTitle = track.snippet.title.split('-');

  return {
    artist: artistAndTitle.artist || track.snippet.title,
    description: track.snippet.description || '',
    id: track.id.videoId || '',
    title: artistAndTitle.title || ''
  };
}

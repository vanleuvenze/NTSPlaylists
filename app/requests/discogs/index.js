const {DISCOGS_KEY, DISCOGS_SECRET} =  require('../../config/API_KEYS.js');
const request = require('superagent');

const errorMap = {
  getArtist: 'ERROR FINDING SINGLE ARTIST IN getArtist',
  getResourceUrl: 'ERROR GETTING RESOURCE URL FROM DISCOGS in getResourceUrl'
};

const handleError = ({source, err}) => console.log(`${errorMap[source]} ${err}`);


function formatDiscogsRequestURL(artist) {
  const formattedArtist = artist.split(' ').join('%20');
  return `https://api.discogs.com/database/search?type=artist&q=${formattedArtist}&page=1&per_page=1&artist&key=${DISCOGS_KEY}&secret=${DISCOGS_SECRET}`;
}

function getRateLimitInfo(response) {
  return response
    && response.headers
    && {
         limit: response.headers['x-discogs-ratelimit'],
         used: response.headers['x-discogs-ratelimit-used'],
         remaining: response.headers['x-discogs-ratelimit-remaining']
       };
}

function findResourceUrl(response) {
  // console.log('CHECKING RATE LIMITING', response.headers);

  return response
    && response.body
    && response.body.results
    && response.body.results[0]
    && response.body.results[0].resource_url;
}

function formatResourceUrl(url) {
  return `${url}?key=${DISCOGS_KEY}&secret=${DISCOGS_SECRET}`;
}

function getArtist(resource_url) {
  if (!resource_url) return Promise.resolve({});

  return request(formatResourceUrl(resource_url))
    .then(res => {
      console.log('RATE LIMIT INFO', getRateLimitInfo(res));

      return res.body;
    })
    .catch(err => Promise.reject({source: 'getArtist', error: err}));
}

function getResourceUrl(artist='george benson') {
  return request(formatDiscogsRequestURL(artist))
    .then(res => findResourceUrl(res))
    .catch(err => Promise.reject({source: 'getResourceUrl', error: err}));
}

function searchDiscogsForArtist(artist) {
  return getResourceUrl(artist)
    .then(resource_url => getArtist(resource_url))
    .catch(err => Promise.reject(err));
}

// searchDiscogsForArtist(artist)
//   .then(artist => console.log('got an artist!', artist))
//   .catch(err => handleError(err));

module.exports = {searchDiscogsForArtist, handleDiscogsError: handleError};

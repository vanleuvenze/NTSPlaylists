import cheerio from 'cheerio';

/*

getNTSTracklist
takes a url from an NTS page and scrapes it for the
tracklist information

*/

export function getNTSTracklist(url='http://www.nts.live/shows/guests/episodes/rush-hour-presents-hunee-31st-january-2015') {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      //load html
      const $ = cheerio.load(html);

      //get tracklist
      const tracks = $('.tracks').find('li').map((index, track) => $(track).text()).get();

      return tracks;
    })
    .catch(err => console.log('Error', err));
}

/*

getRecentNTSShows
gets a list of recent NTS shows for suggestion

*/

export function getRecentNTSShows(url='https://www.nts.live/recently-added') {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      //load our html
      const $ = cheerio.load(html);

      //get show list from https://www.nts.live/recently-added
      const shows = $('.nts-grid-item > a').map((index, showLink) => {
        const show = $(showLink);

        return {
          name: show.text(),
          url: 'https://www.nts.live' + show.attr('href')
        };

      }).get();

      return shows;
    })
    .catch(err => console.log('Error', err));
}

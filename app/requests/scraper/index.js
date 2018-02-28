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
      //load our html
      const $ = cheerio.load(html);

      //get our tracklist
      const tracks = $('.tracks').find('li').map((index, listing) => $(listing).text()).get();

      return tracks;
    })
    .catch(err => console.log('Error', err));
}

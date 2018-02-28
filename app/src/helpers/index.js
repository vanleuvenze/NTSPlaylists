const patterns = {
  domain: 'nts',
  tld: '(\.live)',
  path: '/shows/([-a-zA-Z0-9:%_\+.~#?&//=]*)/episodes/([-a-zA-Z0-9:%_\+.~#?&//=]*)'
};

function validate(url) {
	const {domain, tld, path} = patterns;
	const validUrlPattern = new RegExp(domain + tld + path, 'gi');

	return !!url.match(validUrlPattern);
}


export function validateNTSShowURL(url) {
	const isValid = validate(url);

	return isValid
		? {validUrl: url, error: null}
		: {error: 'url should look something like: http://www.nts.live/shows/show/episodes/episode'};
}

const Crawler = require('simplecrawler');
const has = require('lodash/has');

const stringifyURL = require('./helpers/stringifyURL');

module.exports = (uri, options = {}) => {
  // excluded filetypes
  const exclude = [
    'gif',
    'jpg',
    'jpeg',
    'png',
    'ico',
    'bmp',
    'ogg',
    'webp',
    'mp4',
    'webm',
    'mp3',
    'ttf',
    'woff',
    'json',
    'rss',
    'atom',
    'gz',
    'zip',
    'rar',
    '7z',
    'css',
    'js',
    'gzip',
    'exe',
    'svg',
  ].join('|');

  const extRegex = new RegExp(`\\.(${exclude})$`, 'i');

  const crawler = new Crawler(uri.href);

  Object.keys(options).forEach(o => {
    if (has(crawler, o)) {
      crawler[o] = options[o];
    } else if (o === 'crawlerMaxDepth') {
      // eslint-disable-next-line
      console.warn(
        'Option "crawlerMaxDepth" is deprecated. Please use "maxDepth".'
      );
      crawler.maxDepth = options[o];
    }
  });

  // set crawler options
  // see https://github.com/cgiffard/node-simplecrawler#configuration
  crawler.initialPath = uri.pathname !== '' ? uri.pathname : '/';
  crawler.initialProtocol = uri.protocol.replace(':', '');

  // restrict to subpages if path is privided
  crawler.addFetchCondition(parsedUrl => {
    const initialURLRegex = new RegExp(`${uri.pathname}.*`);
    return stringifyURL(parsedUrl).match(initialURLRegex);
  });

  // file type exclusion
  crawler.addFetchCondition(parsedUrl => !parsedUrl.path.match(extRegex));

  return crawler;
};

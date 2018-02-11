const createSitemapIndex = require('../createSitemapIndex');

const url = 'http://example.com';
const filename = 'sitemap.xml';
const count = 2;

test('should be a function', () => {
  expect(createSitemapIndex).toBeInstanceOf(Function);
});

test('should return string', () => {
  const sitemapIndex = createSitemapIndex(url, filename, count);
  expect(typeof sitemapIndex).toBe('string');
});

test('should contain sitemap part url', () => {
  const sitemapIndex = createSitemapIndex(url, filename, count);
  const regex = new RegExp(
    `${url.replace(/\/$/, '')}/sitemap_part${count}.xml`
  );
  expect(sitemapIndex).toMatch(regex);
});

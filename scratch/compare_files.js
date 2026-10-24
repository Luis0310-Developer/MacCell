const fs = require('fs');

const { urls } = (() => {
  const content = fs.readFileSync('scratch/map_urls.js', 'utf8');
  const m = content.match(/const rawUrls = `([\s\S]*?)`;/);
  return { urls: m[1].trim().split('\n').map(s => s.trim()).filter(Boolean) };
})();

const localFiles = fs.readdirSync('assets/img/brands/Xiaomi');

function normalize(str) {
  return str.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/\.[^.]+$/, ''); // remove extension
}

const urlMap = {};
urls.forEach(u => {
  const fname = u.substring(u.lastIndexOf('/') + 1);
  urlMap[normalize(fname)] = u;
});

const matched = [];
const unmatchedLocal = [];
const matchedUrlKeys = new Set();

localFiles.forEach(f => {
  const norm = normalize(f);
  if (urlMap[norm]) {
    matched.push({ local: f, url: urlMap[norm] });
    matchedUrlKeys.add(norm);
  } else {
    unmatchedLocal.push({ file: f, norm });
  }
});

console.log(`Matched: ${matched.length}/${localFiles.length}`);
if (unmatchedLocal.length > 0) {
  console.log('Unmatched local:', unmatchedLocal);
  const remainingUrls = Object.keys(urlMap).filter(k => !matchedUrlKeys.has(k));
  console.log('Remaining URL keys:', remainingUrls);
}

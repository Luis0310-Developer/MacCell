const fs = require('fs');

const { urls } = (() => {
  const content = fs.readFileSync('scratch/inspect_honor.js', 'utf8');
  const m = content.match(/const rawHonorUrls = `([\s\S]*?)`;/);
  return { urls: m[1].trim().split('\n').map(s => s.trim()).filter(Boolean) };
})();

console.log('URLs parsed:', urls.length);

const localFiles = fs.readdirSync('assets/img/brands/Honor');
console.log('Local files:', localFiles.length);

function normalize(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}

const urlMap = {};
urls.forEach(u => {
  const fname = u.substring(u.lastIndexOf('/') + 1);
  const nameWithoutExt = fname.substring(0, fname.lastIndexOf('.'));
  urlMap[normalize(nameWithoutExt)] = u;
});

let matched = 0;
localFiles.forEach(f => {
  const nameWithoutExt = f.substring(0, f.lastIndexOf('.'));
  const norm = normalize(nameWithoutExt);
  if (urlMap[norm]) {
    matched++;
  } else {
    console.log('Unmatched local file:', f, '-> norm:', norm);
  }
});

console.log(`Matched local files: ${matched}/${localFiles.length}`);

// Group by model prefix
const groups = {};
urls.forEach(u => {
  const fname = u.substring(u.lastIndexOf('/') + 1);
  const nameWithoutExt = fname.substring(0, fname.lastIndexOf('.'));
  // strip trailing _1, _2, _3
  const model = nameWithoutExt.replace(/_\d+$/, '');
  if (!groups[model]) groups[model] = [];
  groups[model].push({ file: fname, url: u });
});

for (const [k, v] of Object.entries(groups)) {
  console.log(`Group [${k}] (${v.length} files): ${v.map(x => x.file).join(', ')}`);
}

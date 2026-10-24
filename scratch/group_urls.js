const fs = require('fs');

const { urls } = (() => {
  const content = fs.readFileSync('scratch/map_urls.js', 'utf8');
  const m = content.match(/const rawUrls = `([\s\S]*?)`;/);
  return { urls: m[1].trim().split('\n').map(s => s.trim()).filter(Boolean) };
})();

// Function to add e_trim
function toEtrim(url) {
  return url.replace('/image/upload/', '/image/upload/e_trim/');
}

// Group URLs by prefix/model
const groups = {};
urls.forEach(u => {
  const file = u.substring(u.lastIndexOf('/') + 1);
  // Remove extension
  const nameWithoutExt = file.substring(0, file.lastIndexOf('.'));
  // Match prefix
  const match = nameWithoutExt.match(/^([A-Za-z0-9_]+?)(?:_(\d+))?$/);
  const base = match ? match[1] : nameWithoutExt;
  if (!groups[base]) groups[base] = [];
  groups[base].push({ file, url: u, etrim: toEtrim(u) });
});

console.log('Model groups count:', Object.keys(groups).length);
for (const [key, list] of Object.entries(groups)) {
  console.log(`\nGroup [${key}] (${list.length} images):`);
  list.sort((a,b) => a.file.localeCompare(b.file)).forEach(item => {
    console.log(`  - ${item.file} -> ${item.url}`);
  });
}

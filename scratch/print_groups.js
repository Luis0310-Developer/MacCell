const fs = require('fs');
const content = fs.readFileSync('scratch/map_urls.js', 'utf8');
const m = content.match(/const rawUrls = `([\s\S]*?)`;/);
const urls = m[1].trim().split('\n').map(s => s.trim()).filter(Boolean);

const groups = {};
urls.forEach(u => {
  const file = u.substring(u.lastIndexOf('/') + 1);
  const name = file.substring(0, file.lastIndexOf('.')).replace(/_\d+$/, '');
  if (!groups[name]) groups[name] = [];
  groups[name].push({ file, url: u });
});

for (const [k, v] of Object.entries(groups)) {
  console.log(`${k}: ${v.length} files -> ${v.map(x => x.file).join(', ')}`);
}

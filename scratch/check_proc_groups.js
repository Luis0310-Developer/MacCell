const list = require('./all_models.json');
const procMap = {};
list.forEach(item => {
  const p = item.processor || 'Unknown';
  if (!procMap[p]) procMap[p] = [];
  procMap[p].push(item.name);
});

console.log('Unique processor count:', Object.keys(procMap).length);
const entries = Object.entries(procMap).map(([proc, names]) => ({
  proc,
  count: names.length,
  sample: names[0]
}));

// sort by count desc
entries.sort((a,b) => b.count - a.count);
console.log('Top processors:\n', JSON.stringify(entries.slice(0, 35), null, 2));

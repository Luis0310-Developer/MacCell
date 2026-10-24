const fs = require('fs');

const cat = fs.readFileSync('pages/catalogo.html', 'utf8');
const lines = cat.split('\n');
lines.forEach((l, idx) => {
  if (/sort/i.test(l)) {
    console.log(`${idx+1}: ${l.trim()}`);
  }
});

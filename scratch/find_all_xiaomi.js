const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === '.freebuff' || f === 'scratch') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('brands/Xiaomi') || content.includes('Xiaomi/')) {
        console.log(`Found in: ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (l.includes('brands/Xiaomi') || l.includes('Xiaomi/')) {
            console.log(`  L${idx+1}: ${l.trim().substring(0, 120)}`);
          }
        });
      }
    }
  }
}

searchDir('.');

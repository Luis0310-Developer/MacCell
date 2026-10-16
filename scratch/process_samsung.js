const fs = require('fs');

const svg = fs.readFileSync('samsung_wordmark_clean.svg', 'utf8');
const match = svg.match(/<path[\s\S]*?id="path20"[\s\S]*?\/>/) || svg.match(/<path[\s\S]*?d="([^"]+)"[\s\S]*?id="path20"/);

let d = '';
const dMatch = svg.match(/id="path20"[\s\S]*?d="([^"]+)"/) || svg.match(/d="([^"]+)"[\s\S]*?id="path20"/);
if (dMatch) {
  d = dMatch[1];
} else {
  // Extract between d=" and " id="path20"
  const idx = svg.indexOf('id="path20"');
  const dStart = svg.lastIndexOf('d="', idx) + 3;
  const dEnd = svg.indexOf('"', dStart);
  d = svg.substring(dStart, dEnd);
}

console.log('Path length:', d.length);

const testHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background: #f0f0f0; padding: 40px; font-family: sans-serif;">
  <h1>Testing Samsung Wordmark Transforms</h1>
  <div style="background: white; border: 2px solid #000; border-radius: 12px; padding: 20px; width: 400px; margin-bottom: 20px;">
    <h3>Option 1: translate(535, 82) scale(1, -1) with viewBox="0 0 575 90"</h3>
    <div style="background: #eef2ff; border: 1px dashed blue; padding: 10px;">
      <svg id="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 90" width="100%" height="auto" style="display:block;">
        <g id="g1" transform="translate(535, 82) scale(1, -1)">
          <path id="p1" fill="#1428A0" d="${d}" />
        </g>
      </svg>
    </div>
  </div>
  <pre id="info" style="background:#fff; padding:15px; border:1px solid #ccc;"></pre>
  <script>
    window.addEventListener('load', () => {
      const g = document.getElementById('g1');
      const p = document.getElementById('p1');
      const gBox = g.getBBox();
      const pBox = p.getBBox();
      document.getElementById('info').textContent = JSON.stringify({
        pathBBox: { x: pBox.x, y: pBox.y, width: pBox.width, height: pBox.height },
        gBBox: { x: gBox.x, y: gBox.y, width: gBox.width, height: gBox.height }
      }, null, 2);
    });
  </script>
</body>
</html>`;

fs.writeFileSync('scratch/test_transform.html', testHtml);
console.log('Wrote scratch/test_transform.html successfully');

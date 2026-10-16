const fs = require('fs');

const svg = fs.readFileSync('samsung_wordmark_clean.svg', 'utf8');
const pStart = svg.indexOf('<path');
const pEnd = svg.indexOf('/>', pStart);
const path2Start = svg.indexOf('<path', pEnd);
const path2End = svg.indexOf('/>', path2Start);
const path2 = svg.substring(path2Start, path2End + 2);
console.log('Path 2 snippet:', path2.substring(0, 100));

const dStart = path2.indexOf('d="') + 3;
const dEnd = path2.indexOf('"', dStart);
const d = path2.substring(dStart, dEnd);
console.log('d length:', d.length);

const testHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#f0f0f0;padding:40px;">
  <h1>Option 1</h1>
  <div style="background:white;width:400px;padding:20px;border-radius:12px;border:1px solid #ccc;">
    <svg id="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 90" width="100%" height="auto" style="display:block;">
      <g id="g1" transform="translate(535, 82) scale(1, -1)">
        <path id="p1" fill="#1428A0" d="${d}" />
      </g>
    </svg>
  </div>
  <pre id="info"></pre>
  <script>
    window.addEventListener("load", () => {
      const g = document.getElementById("g1");
      const p = document.getElementById("p1");
      document.getElementById("info").textContent = JSON.stringify({
        pBox: p.getBBox(),
        gBox: g.getBBox()
      }, null, 2);
    });
  </script>
</body>
</html>`;

fs.writeFileSync('scratch/test_transform.html', testHtml);
console.log('Wrote scratch/test_transform.html successfully');

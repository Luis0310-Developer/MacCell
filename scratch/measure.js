const fs = require('fs');

const origSvg = fs.readFileSync('samsung_wordmark_clean.svg', 'utf8');
let noClip = origSvg.replace('clip-path="url(#clipPath16)"', '');
// Remove width and height from svg tag so it scales with viewBox
noClip = noClip.replace('width="7051.4023"', '').replace('height="1080"', '');

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#f0f0f0; padding:20px;">
  <h2>Testing SVG BBox</h2>
  <div id="svgContainer" style="width:500px; height:120px; border:2px solid red; background:white;">
    ${noClip}
  </div>
  <pre id="info" style="font-size:16px; font-weight:bold;"></pre>
  <script>
    window.addEventListener('load', () => {
      const svg = document.querySelector('svg');
      const g8 = document.getElementById('g8');
      const box = g8.getBBox();
      document.getElementById('info').textContent = JSON.stringify(box, null, 2);
    });
  </script>
</body>
</html>`;

fs.writeFileSync('scratch/measure_samsung.html', html);
console.log('Written scratch/measure_samsung.html');

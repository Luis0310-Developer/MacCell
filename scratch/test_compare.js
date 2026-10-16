const fs = require('fs');

// Let's create an HTML that tests the original SVG with different viewBox settings and without clipPath
const origSvg = fs.readFileSync('samsung_wordmark_clean.svg', 'utf8');

// Version A: original exactly as is
// Version B: remove clipPath attribute
let noClip = origSvg.replace('clip-path="url(#clipPath16)"', '');

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#f0f0f0; padding:20px; font-family:sans-serif;">
  <h2>1. Original SVG as is (width 100%, height auto)</h2>
  <div style="background:white; border:2px solid black; padding:20px; width:450px;">
    ${origSvg}
  </div>

  <h2>2. Without clip-path</h2>
  <div style="background:white; border:2px solid red; padding:20px; width:450px;">
    ${noClip}
  </div>
</body>
</html>`;

fs.writeFileSync('scratch/compare_samsung_versions.html', html);
console.log('Written compare_samsung_versions.html');

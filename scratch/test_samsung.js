const fs = require('fs');

const svg = fs.readFileSync('assets/img/trusted-bar/samsung logo bar.svg', 'utf8');

// Let's create a test HTML file that renders this SVG at various sizes to check if the path is clipped or if it fits viewBox
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #333; padding: 20px; font-family: sans-serif; color: white; }
    .box { background: white; padding: 10px; margin: 10px 0; display: inline-block; border-radius: 8px; border: 1px solid #ccc; }
    img { display: block; }
  </style>
</head>
<body>
  <h2>Samsung Logo SVG Tests</h2>
  <div class="box">
    <p style="color:black">img max-height 35px, max-width 140px, contain:</p>
    <img src="assets/img/trusted-bar/samsung logo bar.svg" style="max-height: 35px; max-width: 140px; object-fit: contain;">
  </div>
  <div class="box">
    <p style="color:black">inline SVG with viewBox:</p>
    <div style="width: 140px; height: 35px;">
      ${svg.replace(/width="[^"]+"/, 'width="100%"').replace(/height="[^"]+"/, 'height="100%"')}
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('scratch/test_samsung.html', html);
console.log('Created scratch/test_samsung.html');

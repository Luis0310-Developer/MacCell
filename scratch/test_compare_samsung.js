const fs = require('fs');

let svg = fs.readFileSync('assets/img/trusted-bar/samsung logo bar.svg', 'utf8');

// What if we remove clip-path?
const noClipSvg = svg.replace('clip-path="url(#clipPath16)"', '');

// Also let's find the official standard clean Samsung logo vector (clean paths without broken Inkscape matrix)
// Standard official Samsung wordmark SVG:
const cleanSamsungSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100" width="100%" height="100%">
  <path fill="#1428A0" d="M37.8 77.2c-15.6 0-25.2-7.8-25.2-18.7h13.7c0 4.6 4.3 8.3 11.5 8.3 6.8 0 11.2-3.3 11.2-7.5 0-4.6-4.6-6.6-13.6-8.7-14.7-3.4-24.3-7.5-24.3-19.8 0-11.8 10.3-19.4 24.3-19.4 14.5 0 23.5 7.6 23.9 17.6H46.1c-.6-4.3-4.5-7.3-10.7-7.3-6.5 0-10.4 3.3-10.4 7.2 0 4.2 4.1 6 12.8 8.1 14.9 3.5 25.1 7.4 25.1 20.3 0 12.6-10.4 20-25.1 20zm50.3-64.8l20.4 63.4h-14.4l-3.8-12.8H74.5l-3.8 12.8H57.1l20.3-63.4h10.7zm-2.7 39.5l-5-17.7-5.1 17.7h10.1zm61.1-39.5v63.4h-13.4V29.7l-12.4 34.6h-7.7L112.5 29.7v46.1H99.1V12.4h14.8l11.7 33.3 11.8-33.3h9.1zm50 64.8c-15.6 0-25.2-7.8-25.2-18.7h13.7c0 4.6 4.3 8.3 11.5 8.3 6.8 0 11.2-3.3 11.2-7.5 0-4.6-4.6-6.6-13.6-8.7-14.7-3.4-24.3-7.5-24.3-19.8 0-11.8 10.3-19.4 24.3-19.4 14.5 0 23.5 7.6 23.9 17.6h-13.2c-.6-4.3-4.5-7.3-10.7-7.3-6.5 0-10.4 3.3-10.4 7.2 0 4.2 4.1 6 12.8 8.1 14.9 3.5 25.1 7.4 25.1 20.3 0 12.6-10.4 20-25.1 20zm64.8-.8v-43c0-12.8-9.4-20.2-23.7-20.2s-23.7 7.4-23.7 20.2v43h13.7V33.6c0-6 4-9.8 10-9.8s10 3.8 10 9.8v41.6h13.7zm49.9 0l-23-42.3v42.3h-13.4V12.4h13.8l22.6 41.5V12.4h13.4v63.4h-13.4zm60.7.8c-18.1 0-28.7-11.6-28.7-27.1 0-15.8 10.6-27.3 28.7-27.3 13.9 0 24.7 7.2 26.2 19.3h-13.7c-1.3-5.2-5.7-8.5-12.5-8.5-9.8 0-14.8 6.8-14.8 16.5 0 9.8 5 16.3 14.8 16.3 7 0 11.6-3.4 12.8-8.9h-13.3v-10.5h26.7v24.6c-4.4 3.4-11.7 5.6-16.2 5.6z"/>
</svg>`;

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #333; padding: 20px; font-family: sans-serif; color: white; }
    .box { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; width: 240px; }
  </style>
</head>
<body>
  <div class="box">
    <p style="color:black">Without clip-path:</p>
    <div style="width: 200px; height: 50px;">
      ${noClipSvg.replace(/width="[^"]+"/, 'width="100%"').replace(/height="[^"]+"/, 'height="100%"')}
    </div>
  </div>
  <div class="box">
    <p style="color:black">Clean Official Samsung SVG:</p>
    <div style="width: 200px; height: 50px;">
      ${cleanSamsungSvg}
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('scratch/test_compare_samsung.html', html);
console.log('Created test_compare_samsung.html');

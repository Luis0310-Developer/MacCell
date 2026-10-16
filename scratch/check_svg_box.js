const fs = require('fs');

const svg = fs.readFileSync('assets/img/trusted-bar/samsung logo bar.svg', 'utf8');

// The transform on g8 is: matrix(12.944053,0,0,-12.944053,-540.03625,1620.0233)
// The clip path is: 0, 166.885, 628.238, 0
// Let's check:
// 628.238 * 12.944053 = 8131.95 - 540 = 7591!
// But viewBox width is 7051! 
// 7591 > 7051!
// And for Y:
// 166.885 * -12.944053 = -2160 + 1620 = -540!
// That means the coordinates in the SVG might actually be overflowing or misaligned with viewBox!

console.log('viewBox:', svg.match(/viewBox="[^"]+"/)[0]);
console.log('width/height:', svg.match(/width="[^"]+"/)[0], svg.match(/height="[^"]+"/)[0]);

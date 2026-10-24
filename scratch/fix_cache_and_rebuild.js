const fs = require('fs');
const path = require('path');

// 1. Update checkout-modal.js to remove stale overlay if it doesn't have .dispatch-cards-grid-3
const modalPath = path.join(__dirname, '../js/checkout-modal.js');
let modalCode = fs.readFileSync(modalPath, 'utf8');

modalCode = modalCode.replace(
  `    let overlay = document.getElementById('dispatchCheckoutModal');\n    if (overlay) return overlay;`,
  `    let overlay = document.getElementById('dispatchCheckoutModal');\n    if (overlay && !overlay.querySelector('.dispatch-cards-grid-3')) {\n      overlay.remove();\n      overlay = null;\n    }\n    if (overlay) return overlay;`
);

fs.writeFileSync(modalPath, modalCode, 'utf8');
console.log('Updated ensureModalElement in js/checkout-modal.js');

// 2. Add ?v=20261023-v36 to all checkout-modal.js script tags
const htmlFiles = [
  'pages/catalogo.html',
  'Inicio.html',
  'index.html',
  'pages/ubicacion.html',
  'pages/nosotros.html',
  'pages/contacto.html'
];

htmlFiles.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/checkout-modal\.js(\?v=[a-zA-Z0-9_-]+)?/g, 'checkout-modal.js?v=20261023-v36');
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated checkout-modal script tag in ${f}`);
  }
});

// 3. Update js/main.js scriptPath
const mainPath = path.join(__dirname, '../js/main.js');
let mainCode = fs.readFileSync(mainPath, 'utf8');
mainCode = mainCode.replace(
  `const scriptPath = isPagesDir ? '../js/checkout-modal.js' : 'js/checkout-modal.js';`,
  `const scriptPath = isPagesDir ? '../js/checkout-modal.js?v=20261023-v36' : 'js/checkout-modal.js?v=20261023-v36';`
);
fs.writeFileSync(mainPath, mainCode, 'utf8');
console.log('Updated scriptPath in js/main.js');

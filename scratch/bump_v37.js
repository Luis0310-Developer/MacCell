const fs = require('fs');
const path = require('path');

// 1. Update checkout-modal.js to force remove if not having brand logo
const modalPath = path.join(__dirname, '../js/checkout-modal.js');
let modalCode = fs.readFileSync(modalPath, 'utf8');

modalCode = modalCode.replace(
  `if (overlay && !overlay.querySelector('.dispatch-cards-grid-3'))`,
  `if (overlay && !overlay.querySelector('.dispatch-brand-logo-img'))`
);
fs.writeFileSync(modalPath, modalCode, 'utf8');
console.log('Updated overlay check in checkout-modal.js');

// 2. Bump cache version to v37 in all HTML files
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
    content = content.replace(/20261023-v36/g, '20261023-v37');
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated cache version to v37 in ${f}`);
  }
});

// 3. Update main.js
const mainPath = path.join(__dirname, '../js/main.js');
let mainCode = fs.readFileSync(mainPath, 'utf8');
mainCode = mainCode.replace(/20261023-v36/g, '20261023-v37');
fs.writeFileSync(mainPath, mainCode, 'utf8');
console.log('Updated cache version in js/main.js');

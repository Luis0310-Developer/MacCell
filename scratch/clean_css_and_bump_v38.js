const fs = require('fs');
const path = require('path');

// 1. Clean css/components.css: remove obsolete block starting at /* ===================================================\n   ENVÍO A PROVINCIA: AGENCIA SELECTOR, FORM & METODOLOGÍA
const cssPath = path.join(__dirname, '../css/components.css');
let css = fs.readFileSync(cssPath, 'utf8');

const obsoleteMarker = "/* ===================================================\n   ENVÍO A PROVINCIA: AGENCIA SELECTOR, FORM & METODOLOGÍA";
const obsIdx = css.indexOf(obsoleteMarker);
if (obsIdx !== -1) {
  css = css.slice(0, obsIdx).trim() + '\n';
  console.log('Removed obsolete duplicate modal block from end of components.css');
} else {
  console.log('Obsolete marker not found by exact string, checking alternate...');
}

fs.writeFileSync(cssPath, css, 'utf8');

// 2. Add inline styles to logo in js/checkout-modal.js to guarantee 44x44
const modalPath = path.join(__dirname, '../js/checkout-modal.js');
let modalJs = fs.readFileSync(modalPath, 'utf8');

modalJs = modalJs.replace(
  `class="dispatch-brand-logo-img">`,
  `class="dispatch-brand-logo-img" style="width: 44px; height: 44px; min-width: 44px; max-width: 44px; max-height: 44px; border-radius: 10px; object-fit: cover; border: 1px solid #e2e8f0; display: block;">`
);

fs.writeFileSync(modalPath, modalJs, 'utf8');
console.log('Updated logo inline style in js/checkout-modal.js');

// 3. Bump components.css and all scripts to v38 in all HTML files
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
    // Bump components.css
    content = content.replace(/components\.css(\?v=[a-zA-Z0-9_-]+)?/g, 'components.css?v=20261023-v38');
    // Bump all v37 to v38
    content = content.replace(/20261023-v37/g, '20261023-v38');
    // Bump checkout-modal.js if missing query
    content = content.replace(/checkout-modal\.js(\?v=[a-zA-Z0-9_-]+)?/g, 'checkout-modal.js?v=20261023-v38');
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated cache versions in ${f}`);
  }
});

// 4. Update main.js
const mainPath = path.join(__dirname, '../js/main.js');
let mainJs = fs.readFileSync(mainPath, 'utf8');
mainJs = mainJs.replace(/20261023-v37/g, '20261023-v38');
fs.writeFileSync(mainPath, mainJs, 'utf8');
console.log('Updated cache version in js/main.js');

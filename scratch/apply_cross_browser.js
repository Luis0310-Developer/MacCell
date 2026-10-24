const fs = require('fs');
const path = require('path');

const stylesPath = path.resolve(__dirname, '../css/styles.css');
const compsPath = path.resolve(__dirname, '../css/components.css');

// 1. Process css/styles.css
let styles = fs.readFileSync(stylesPath, 'utf8');

const engineHeader = `/* ==========================================================================
   CROSS-BROWSER & MULTI-PLATFORM ENGINE (Safari, Chrome, Brave, Opera, Edge, Firefox)
   Garantiza compatibilidad total en WebKit (iOS/macOS), Blink (Chromium) y Gecko
   ========================================================================== */

/* 1. Normalización de viewport y tipografía */
html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

*, *::before, *::after {
  box-sizing: inherit;
  -webkit-tap-highlight-color: transparent;
}

/* 2. Suavizado de fuentes y aceleración de hardware */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  -webkit-overflow-scrolling: touch;
}

/* 3. Soporte universal de scrollbars (Firefox + WebKit / Blink) */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.4) transparent;
}

/* 4. Normalización de controles de formulario para Safari, Brave, Chrome y Firefox */
input, button, select, textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
}

button {
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  touch-action: manipulation;
}

/* Fix para Safari en inputs de búsqueda (remover estilo nativo de lupa y botón cancelar) */
input[type="search"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  outline-offset: -2px;
  box-sizing: border-box;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  display: none;
}

/* Evitar auto-zoom molesto en inputs en Safari iOS (hace zoom si font-size < 16px) */
@media (max-width: 768px) {
  input[type="text"],
  input[type="search"],
  input[type="tel"],
  input[type="email"],
  input[type="number"],
  select,
  textarea {
    font-size: 16px !important;
  }
}

/* 5. Fluid images & media sin distorsiones en WebKit */
img, picture, video, canvas, svg {
  max-width: 100%;
}

img {
  image-rendering: -webkit-optimize-contrast;
}

/* 6. Scroll inercial táctil nativo en contenedores con scroll para Safari iOS */
.products-grid,
.accesorios-motion-wrapper,
.brand-chips-strip,
.product-thumbnails-strip,
.casu-carousel-track,
.cart-items-container,
.compare-modal-body,
.dispatch-items-list,
.live-search-results-list,
.modal-content {
  -webkit-overflow-scrolling: touch;
}

/* 7. Variables de Safe Area (iOS Notch / Home Indicator) */
:root {
  --safe-area-top: env(safe-area-inset-top, 0px);
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-left: env(safe-area-inset-left, 0px);
  --safe-area-right: env(safe-area-inset-right, 0px);
}
`;

if (!styles.includes('CROSS-BROWSER & MULTI-PLATFORM ENGINE')) {
  styles = styles.replace("@import url('components.css');", "@import url('components.css');\n\n" + engineHeader);
}

// Prefix all backdrop-filters
styles = styles.replace(/(?<!-webkit-)backdrop-filter:\s*([^;]+);/g, '-webkit-backdrop-filter: $1;\n  backdrop-filter: $1;');
styles = styles.replace(/-webkit-backdrop-filter:\s*([^;]+);\s*-webkit-backdrop-filter:\s*\1;/g, '-webkit-backdrop-filter: $1;');

// Prefix all user-selects
styles = styles.replace(/(?<!-webkit-|-moz-|-ms-)user-select:\s*([^;]+);/g, '-webkit-user-select: $1;\n  -moz-user-select: $1;\n  -ms-user-select: $1;\n  user-select: $1;');
styles = styles.replace(/(-webkit-user-select:[^;]+;\s*)+-webkit-user-select:/g, '-webkit-user-select:');

// Update mobile-bottom-nav for iOS safe-area
styles = styles.replace(/(\.mobile-bottom-nav\s*\{[^}]*height:\s*)64px;/g, '$1calc(64px + env(safe-area-inset-bottom, 0px));\n  padding-bottom: env(safe-area-inset-bottom, 0px);');

fs.writeFileSync(stylesPath, styles, 'utf8');
console.log('Successfully updated css/styles.css for cross-browser support!');

// 2. Process css/components.css
let comps = fs.readFileSync(compsPath, 'utf8');

// Prefix all backdrop-filters
comps = comps.replace(/(?<!-webkit-)backdrop-filter:\s*([^;]+);/g, '-webkit-backdrop-filter: $1;\n  backdrop-filter: $1;');
comps = comps.replace(/-webkit-backdrop-filter:\s*([^;]+);\s*-webkit-backdrop-filter:\s*\1;/g, '-webkit-backdrop-filter: $1;');

// Prefix all user-selects
comps = comps.replace(/(?<!-webkit-|-moz-|-ms-)user-select:\s*([^;]+);/g, '-webkit-user-select: $1;\n  -moz-user-select: $1;\n  -ms-user-select: $1;\n  user-select: $1;');
comps = comps.replace(/(-webkit-user-select:[^;]+;\s*)+-webkit-user-select:/g, '-webkit-user-select:');

// Support dvh & iOS touch scrolling on modal-content
comps = comps.replace(/height:\s*min\(92vh,\s*880px\);/g, 'height: min(92vh, 880px);\n  height: min(92dvh, 880px);\n  -webkit-overflow-scrolling: touch;');
comps = comps.replace(/max-height:\s*92vh;/g, 'max-height: 92vh;\n  max-height: 92dvh;');

// Mobile sticky product bar safe-area
comps = comps.replace(/padding:\s*10px 14px;/g, 'padding: 10px 14px max(10px, env(safe-area-inset-bottom, 10px));');

fs.writeFileSync(compsPath, comps, 'utf8');
console.log('Successfully updated css/components.css for cross-browser support!');

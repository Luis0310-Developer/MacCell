const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../css/components.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Update .dispatch-item-name to clamp 2 lines nicely
css = css.replace(
`.dispatch-item-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.28;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
`.dispatch-item-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`
);

// 2. Refine mobile media query to eliminate nested scroll clipping
const oldMediaQuery = `/* RESPONSIVE DESIGN */
@media (max-width: 720px) {
  .dispatch-modal-card {
    flex-direction: column;
    max-height: 94vh;
    border-radius: 20px;
    overflow-y: auto;
  }

  .dispatch-left-col {
    width: 100%;
    min-width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    padding: 18px 16px;
  }

  .dispatch-items-list {
    max-height: 180px;
  }

  .dispatch-right-col {
    padding: 18px 16px;
  }

  .dispatch-cards-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .payment-methods-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .store-pickup-details-grid {
    grid-template-columns: 1fr;
  }
}`;

const newMediaQuery = `/* RESPONSIVE DESIGN */
@media (max-width: 720px) {
  .dispatch-modal-card {
    flex-direction: column;
    max-height: 92vh;
    border-radius: 18px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .dispatch-left-col {
    width: 100%;
    min-width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px;
    overflow: visible;
    max-height: none;
    flex-shrink: 0;
  }

  .dispatch-items-list {
    max-height: none;
    overflow: visible;
  }

  .dispatch-right-col {
    padding: 16px;
    overflow: visible;
  }

  .dispatch-cards-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .payment-methods-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .store-pickup-details-grid {
    grid-template-columns: 1fr;
  }
}`;

css = css.replace(oldMediaQuery, newMediaQuery);

// 3. Add light styles for shipping-methodology modal if needed
if (!css.includes('.shipping-methodology-dialog {')) {
  css += `
/* MODAL METODOLOGÍA (LIGHT THEME) */
.shipping-methodology-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.22s ease, visibility 0.22s;
}

.shipping-methodology-overlay.active {
  opacity: 1;
  visibility: visible;
}

.shipping-methodology-dialog {
  width: 100%;
  max-width: 620px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 25px 65px rgba(15, 23, 42, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  position: relative;
  color: #0f172a;
}

.shipping-methodology-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.shipping-methodology-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.shipping-methodology-close {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #64748b;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.shipping-methodology-close:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}

.shipping-methodology-body {
  padding: 18px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.methodology-step-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
}

.methodology-step-num {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.methodology-step-content h4 {
  margin: 0 0 3px;
  font-size: 0.88rem;
  font-weight: 800;
  color: #0f172a;
}

.methodology-step-content p {
  margin: 0;
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.4;
}

.shipping-methodology-footer {
  padding: 14px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.btn-close-methodology-action {
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
}
`;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Updated components.css with final refinements!');

// Bump to v39 across all files
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
    content = content.replace(/20261023-v38/g, '20261023-v39');
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated cache versions in ${f}`);
  }
});

const mainPath = path.join(__dirname, '../js/main.js');
let mainJs = fs.readFileSync(mainPath, 'utf8');
mainJs = mainJs.replace(/20261023-v38/g, '20261023-v39');
fs.writeFileSync(mainPath, mainJs, 'utf8');
console.log('Updated cache version in js/main.js');

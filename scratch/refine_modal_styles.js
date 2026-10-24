const fs = require('fs');
const path = require('path');

// 1. Refine css/components.css
const cssPath = path.join(__dirname, '../css/components.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace left column neon cyan with executive royal blue / slate
css = css.replace(
`  scrollbar-color: rgba(0, 210, 255, 0.2) transparent;\n}\n\n.dispatch-store-brand {`,
`  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;\n}\n\n.dispatch-store-brand {`
);

css = css.replace(
`.dispatch-brand-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.18), rgba(0, 112, 243, 0.18));
  border: 1px solid rgba(0, 210, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d2ff;
  box-shadow: 0 0 16px rgba(0, 210, 255, 0.25);
}`,
`.dispatch-brand-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(15, 23, 42, 0.85));
  border: 1.5px solid rgba(59, 130, 246, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
}`
);

css = css.replace(
`.dispatch-brand-tag {
  font-size: 0.68rem;
  font-weight: 700;
  color: #00d2ff;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}`,
`.dispatch-brand-tag {
  font-size: 0.68rem;
  font-weight: 700;
  color: #60a5fa;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}`
);

css = css.replace(
`.dispatch-order-title {
  font-size: 0.72rem;
  font-weight: 800;
  color: #00d2ff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 18px 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}`,
`.dispatch-order-title {
  font-size: 0.72rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 18px 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dispatch-order-title svg {
  color: #60a5fa;
}`
);

css = css.replace(
`.dispatch-item-price {
  font-size: 0.94rem;
  font-weight: 800;
  color: #00d2ff;
  white-space: nowrap;
  margin-left: auto;
  text-shadow: 0 0 12px rgba(0, 210, 255, 0.25);
}`,
`.dispatch-item-price {
  font-size: 0.94rem;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  margin-left: auto;
}`
);

css = css.replace(
`.dispatch-calc-total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 1px solid rgba(0, 210, 255, 0.25);
  padding-top: 14px;
  margin-top: 10px;
}

.dispatch-calc-total-label {
  font-size: 1.1rem;
  font-weight: 800;
  color: #ffffff;
}

.dispatch-calc-total-num {
  font-size: 1.5rem;
  font-weight: 900;
  color: #00d2ff;
  letter-spacing: -0.01em;
  text-shadow: 0 0 20px rgba(0, 210, 255, 0.4);
}`,
`.dispatch-calc-total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 14px;
  margin-top: 10px;
}

.dispatch-calc-total-label {
  font-size: 1.05rem;
  font-weight: 800;
  color: #ffffff;
}

.dispatch-calc-total-num {
  font-size: 1.45rem;
  font-weight: 900;
  color: #60a5fa;
  letter-spacing: -0.01em;
}`
);

css = css.replace(
`.dispatch-guarantee-box {
  margin-top: 16px;
  background: rgba(0, 210, 255, 0.05);
  border: 1px solid rgba(0, 210, 255, 0.18);
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dispatch-guarantee-box .guarantee-icon {
  font-size: 1.15rem;
  flex-shrink: 0;
}

.dispatch-guarantee-box .guarantee-text {
  font-size: 0.72rem;
  line-height: 1.3;
}

.dispatch-guarantee-box .guarantee-text strong {
  display: block;
  color: #00d2ff;
  font-weight: 800;
}

.dispatch-guarantee-box .guarantee-text span {
  display: block;
  color: #94a3b8;
}`,
`.dispatch-guarantee-box {
  margin-top: 16px;
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.22);
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dispatch-guarantee-box .guarantee-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #34d399;
  flex-shrink: 0;
}

.dispatch-guarantee-box .guarantee-text {
  font-size: 0.72rem;
  line-height: 1.3;
}

.dispatch-guarantee-box .guarantee-text strong {
  display: block;
  color: #34d399;
  font-weight: 800;
}

.dispatch-guarantee-box .guarantee-text span {
  display: block;
  color: #94a3b8;
}`
);

// Update .dispatch-section-subtitle
css = css.replace(
`.dispatch-section-subtitle {
  font-size: 0.74rem;
  font-weight: 800;
  color: #00d2ff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}`,
`.dispatch-section-subtitle {
  font-size: 0.74rem;
  font-weight: 800;
  color: #cbd5e1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.dispatch-section-subtitle svg {
  color: #60a5fa;
}

.step-num-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}`
);

// Update .dispatch-agency-card active
css = css.replace(
`.dispatch-agency-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 210, 255, 0.3);
}

.dispatch-agency-card.active {
  border-color: #00d2ff;
  background: linear-gradient(145deg, rgba(0, 210, 255, 0.1) 0%, rgba(0, 112, 243, 0.05) 100%);
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.25);
}

.dispatch-agency-card.active .agency-card-name {
  color: #00d2ff;
}`,
`.dispatch-agency-card:hover {
  background: #141b2a;
  border-color: rgba(255, 255, 255, 0.16);
}

.dispatch-agency-card.active {
  border-color: #2563eb;
  background: linear-gradient(155deg, rgba(37, 99, 235, 0.14) 0%, rgba(13, 18, 28, 0.95) 100%);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.22);
}

.dispatch-agency-card.active .agency-card-name {
  color: #ffffff;
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/components.css!');

// 2. Refine inline svg colors in js/checkout-modal.js
const modalPath = path.join(__dirname, '../js/checkout-modal.js');
let modalJs = fs.readFileSync(modalPath, 'utf8');

// Replace #22d3ee in modalJs with #60a5fa or #34d399 where appropriate
modalJs = modalJs.replaceAll('stroke="#22d3ee"', 'stroke="#60a5fa"');
modalJs = modalJs.replaceAll('color: #22d3ee;', 'color: #60a5fa;');

fs.writeFileSync(modalPath, modalJs, 'utf8');
console.log('Successfully updated js/checkout-modal.js svg colors!');

const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../css/components.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Target block: from "/* TARJETAS DE MÉTODO DE DESPACHO */" up to right before "/* RESPONSIVE DESIGN */"
const startMarker = "/* TARJETAS DE MÉTODO DE DESPACHO */";
const endMarker = "/* RESPONSIVE DESIGN */";

const startIndex = css.indexOf(startMarker);
const endIndex = css.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end marker in components.css!");
  process.exit(1);
}

const newCssBlock = `/* TARJETAS DE MÉTODO DE DESPACHO (PROFESIONAL SLATE & ROYAL BLUE) */
.dispatch-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.dispatch-method-card {
  background: #0d121c;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 13px;
  padding: 12px 13px;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dispatch-method-card:hover {
  background: #131926;
  border-color: rgba(255, 255, 255, 0.16);
  transform: translateY(-1px);
}

.dispatch-method-card.active {
  border-color: #2563eb;
  background: linear-gradient(155deg, rgba(37, 99, 235, 0.14) 0%, rgba(13, 18, 28, 0.95) 100%);
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.22), inset 0 0 0 1px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

.dispatch-card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.dispatch-card-icon {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  transition: all 0.2s ease;
}

.dispatch-card-icon.store {
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
}

.dispatch-card-icon.motor {
  background: rgba(245, 158, 11, 0.12);
  color: #fbbf24;
}

.dispatch-card-icon.truck {
  background: rgba(59, 130, 246, 0.12);
  color: #60a5fa;
}

.dispatch-method-card.active .dispatch-card-icon.store {
  background: #10b981;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.4);
}

.dispatch-method-card.active .dispatch-card-icon.motor {
  background: #f59e0b;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
}

.dispatch-method-card.active .dispatch-card-icon.truck {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.4);
}

.dispatch-card-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.badge-store-free {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-delivery-price {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge-provincia-price {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.dispatch-card-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 3px;
  line-height: 1.25;
}

.dispatch-method-card.active .dispatch-card-title {
  color: #ffffff;
}

.dispatch-card-sub {
  font-size: 0.72rem;
  color: #94a3b8;
  line-height: 1.35;
}

.dispatch-method-card.active .dispatch-card-sub {
  color: #cbd5e1;
}

/* =========================================================
   APARTADO ESPECÍFICO: RECOJO EN TIENDA FÍSICA (PLAZA TEC)
   ========================================================= */
.dispatch-tienda-box {
  margin-bottom: 12px;
  animation: fadeInDispatchBox 0.25s ease;
}

.store-pickup-card {
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 18, 28, 0.85) 100%);
  border: 1px solid rgba(16, 185, 129, 0.24);
  border-radius: 14px;
  padding: 13px 15px;
}

.store-pickup-header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.store-pickup-badge {
  font-size: 0.65rem;
  font-weight: 800;
  color: #34d399;
  background: rgba(16, 185, 129, 0.14);
  border: 1px solid rgba(16, 185, 129, 0.28);
  padding: 2.5px 8px;
  border-radius: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.store-free-pill {
  font-size: 0.74rem;
  font-weight: 700;
  color: #34d399;
}

.store-pickup-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  margin: 4px 0 2px;
}

.store-pickup-addr {
  font-size: 0.79rem;
  color: #94a3b8;
  margin: 0 0 10px;
  line-height: 1.35;
}

.store-pickup-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 9px;
}

.store-detail-pill {
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 7px 9px;
  font-size: 0.72rem;
  color: #cbd5e1;
}

.store-detail-pill.highlight {
  background: rgba(16, 185, 129, 0.09);
  border-color: rgba(16, 185, 129, 0.22);
  color: #6ee7b7;
}

.store-detail-pill svg {
  flex-shrink: 0;
}

.store-pickup-perks {
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  padding: 8px 11px;
  font-size: 0.73rem;
  color: #93c5fd;
  line-height: 1.38;
}

.tienda-form-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

/* BLOQUE DE DIRECCIÓN REGISTRADA (DELIVERY) */
.dispatch-address-box {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 10px;
  transition: border-color 0.2s;
  animation: fadeInDispatchBox 0.25s ease;
}

.dispatch-address-box:focus-within {
  border-color: rgba(37, 99, 235, 0.5);
}

.dispatch-address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.dispatch-address-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #60a5fa;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dispatch-address-edit-btn {
  background: none;
  border: none;
  color: #60a5fa;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.dispatch-address-edit-btn:hover {
  color: #93c5fd;
}

.dispatch-address-line1 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 3px;
}

.dispatch-address-line2 {
  font-size: 0.82rem;
  color: #94a3b8;
  margin-bottom: 2px;
}

.dispatch-address-line3 {
  font-size: 0.82rem;
  color: #94a3b8;
}

/* FORMULARIO DE EDICIÓN DE DIRECCIÓN */
.dispatch-address-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.dispatch-input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.dispatch-input-field {
  background: #080c14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px 12px;
  color: #ffffff;
  font-size: 0.83rem;
  width: 100%;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.dispatch-input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  background: #0c101a;
}

.btn-save-addr {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 4px;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
}

/* REFERENCIAS DE ENTREGA */
.dispatch-ref-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
  display: block;
}

.dispatch-ref-input {
  width: 100%;
  background: #080c14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 14px max(10px, env(safe-area-inset-bottom, 10px));
  color: #ffffff;
  font-size: 0.85rem;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.dispatch-ref-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  background: #0c101a;
}

/* BOTÓN CONTINUAR AL PAGO */
.btn-dispatch-confirm {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.95rem;
  border: none;
  border-radius: 12px;
  padding: 13px 18px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.32);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-dispatch-confirm:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.45);
}

.btn-dispatch-confirm:active {
  transform: translateY(0);
}

/* =========================================================
   PASO 2: MÉTODOS DE PAGO DISPONIBLES (BRANDED CHIPS ELEGANTE)
   ========================================================= */
.dispatch-payment-step {
  display: none;
  flex-direction: column;
  animation: fadeInDispatchBox 0.25s ease;
}

.dispatch-payment-step.active {
  display: flex;
}

.dispatch-back-link {
  background: none;
  border: none;
  color: #60a5fa;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  padding: 0;
  text-decoration: none;
}

.dispatch-back-link:hover {
  color: #93c5fd;
}

.payment-methods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.payment-method-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: #0d121c;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 13px;
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.payment-method-card:hover {
  background: #131926;
  border-color: rgba(255, 255, 255, 0.16);
  transform: translateY(-1px);
}

.payment-method-card.active {
  border-color: #2563eb;
  background: linear-gradient(155deg, rgba(37, 99, 235, 0.14) 0%, rgba(13, 18, 28, 0.95) 100%);
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.22), inset 0 0 0 1px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

.pay-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.pay-brand-badges {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.pay-chip {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2.5px 7px;
  border-radius: 5px;
  letter-spacing: 0.02em;
  line-height: 1.1;
}

.pay-chip-yape {
  background: #742284;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(116, 34, 132, 0.35);
}

.pay-chip-plin {
  background: #00d1b2;
  color: #042f2c;
  font-weight: 900;
  box-shadow: 0 2px 6px rgba(0, 209, 178, 0.3);
}

.pay-chip-bcp {
  background: #002a8f;
  color: #ffffff;
}

.pay-chip-bbva {
  background: #004481;
  color: #ffffff;
}

.pay-chip-cash {
  background: #059669;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(5, 150, 105, 0.3);
}

.pay-chip-pos {
  background: #334155;
  color: #f1f5f9;
}

.pay-chip-visa {
  background: #1e3a8a;
  color: #ffffff;
}

.payment-method-check {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.payment-method-card.active .payment-method-check {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.45);
}

.payment-method-title {
  font-size: 0.86rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
  line-height: 1.25;
}

.payment-method-desc {
  font-size: 0.72rem;
  color: #94a3b8;
  line-height: 1.32;
}

.payment-method-card.active .payment-method-desc {
  color: #cbd5e1;
}

.payment-details-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 14px;
}

.btn-finalize-order-wa {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.96rem;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 18px rgba(22, 163, 74, 0.35);
  transition: all 0.2s ease;
}

.btn-finalize-order-wa:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 6px 24px rgba(22, 163, 74, 0.45);
}

@keyframes fadeInDispatchBox {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

`;

css = css.slice(0, startIndex) + newCssBlock + css.slice(endIndex);

// Also add styles for .prov-step-num if not present
if (!css.includes('.prov-step-num {')) {
  css = css.replace('.prov-step-item {', `.prov-step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.prov-step-item {`);
}

// In media query for max-width 720px:
css = css.replace(
  `.dispatch-cards-grid {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n\n  .payment-methods-grid {\n    grid-template-columns: 1fr 1fr 1fr;\n  }`,
  `.dispatch-cards-grid {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n\n  .payment-methods-grid {\n    grid-template-columns: 1fr 1fr;\n    gap: 8px;\n  }\n\n  .store-pickup-details-grid {\n    grid-template-columns: 1fr;\n  }`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/components.css with executive slate & royal blue styling!');

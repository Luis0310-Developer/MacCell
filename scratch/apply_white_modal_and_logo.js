const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../css/components.css');
let css = fs.readFileSync(cssPath, 'utf8');

const startMarker = "/* ===================================================\n   MODAL DE DESPACHO Y CHECKOUT (ESTILO LLAMALA/MINT)\n   =================================================== */";
const endMarker = "/* ===================================================\n   VISTA DE DETALLES DE PRODUCTO & CELULARES SIMILARES";

const startIdx = css.indexOf(startMarker);
const endIdx = css.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find start or end index for modal CSS in components.css", { startIdx, endIdx });
  process.exit(1);
}

const lightThemeModalCss = `/* ========================================================
   MODAL DE MÉTODO DE DESPACHO & PAGO (WHITE / LIGHT LUXURY THEME)
   ======================================================== */
.dispatch-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}

.dispatch-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.dispatch-modal-card {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  display: flex;
  box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transform: scale(0.96) translateY(12px);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  max-height: 90vh;
  color: #0f172a;
}

.dispatch-modal-overlay.active .dispatch-modal-card {
  transform: scale(1) translateY(0);
}

/* COLUMNA IZQUIERDA: RESUMEN DEL PEDIDO (LIGHT LUXURY) */
.dispatch-left-col {
  width: 330px;
  min-width: 310px;
  flex-shrink: 0;
  background: #f8fafc;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.dispatch-store-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dispatch-brand-logo-img {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.dispatch-brand-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
  display: block;
  line-height: 1.15;
}

.dispatch-brand-badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
}

.dispatch-brand-tag {
  font-size: 0.68rem;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 2px 7px;
  border-radius: 5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.dispatch-brand-verified {
  font-size: 0.66rem;
  font-weight: 700;
  color: #16a34a;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 2px 6px;
  border-radius: 5px;
}

.dispatch-order-title {
  font-size: 0.73rem;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 18px 0 12px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.dispatch-order-title svg {
  color: #2563eb;
}

/* LISTA DE ITEMS DEL PEDIDO (TARJETAS ULTRA PROFESIONALES) */
.dispatch-items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: auto;
}

.dispatch-items-list::-webkit-scrollbar {
  width: 4px;
}

.dispatch-items-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dispatch-item-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dispatch-item-row:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.dispatch-item-thumb {
  width: 52px;
  height: 52px;
  min-width: 52px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.dispatch-item-thumb img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.dispatch-item-info {
  flex: 1;
  min-width: 0;
}

.dispatch-item-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.28;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dispatch-item-chips {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.dispatch-item-chip {
  font-size: 0.67rem;
  font-weight: 600;
  padding: 1.5px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  line-height: 1.2;
}

.dispatch-item-chip.color {
  background: #eff6ff;
  color: #1e40af;
  border-color: #dbeafe;
}

.dispatch-item-chip.seal {
  background: #f0fdf4;
  color: #166534;
  border-color: #bbf7d0;
}

.dispatch-item-price-col {
  text-align: right;
  margin-left: auto;
  flex-shrink: 0;
}

.dispatch-item-price {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  white-space: nowrap;
}

.dispatch-item-unit-price {
  font-size: 0.70rem;
  color: #64748b;
  margin-top: 2px;
}

/* TOTALES Y RESUMEN NUMÉRICO */
.dispatch-divider {
  border-top: 1px solid #e2e8f0;
  margin: 16px 0 12px;
}

.dispatch-calc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.84rem;
  color: #64748b;
  margin-bottom: 8px;
}

.dispatch-calc-val {
  color: #0f172a;
  font-weight: 700;
}

.dispatch-calc-total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 2px solid #e2e8f0;
  padding-top: 14px;
  margin-top: 10px;
}

.dispatch-calc-total-label {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
}

.dispatch-calc-total-num {
  font-size: 1.55rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.01em;
}

/* CAJA DE GARANTÍA OFICIAL */
.dispatch-guarantee-box {
  margin-top: 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dispatch-guarantee-box .guarantee-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #dcfce7;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dispatch-guarantee-box .guarantee-text {
  font-size: 0.72rem;
  line-height: 1.35;
}

.dispatch-guarantee-box .guarantee-text strong {
  display: block;
  color: #166534;
  font-weight: 800;
  font-size: 0.78rem;
}

.dispatch-guarantee-box .guarantee-text span {
  display: block;
  color: #15803d;
}

/* =========================================================
   COLUMNA DERECHA: MÉTODO DE DESPACHO & PAGO (WHITE CLEAN)
   ========================================================= */
.dispatch-right-col {
  flex: 1;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  background: #ffffff;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.dispatch-right-col::-webkit-scrollbar {
  width: 4px;
}

.dispatch-right-col::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dispatch-close-btn {
  position: absolute;
  top: 16px;
  right: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 5;
}

.dispatch-close-btn:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
  transform: rotate(90deg);
}

.dispatch-main-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 3px;
  letter-spacing: -0.01em;
}

.dispatch-main-sub {
  font-size: 0.82rem;
  color: #64748b;
  margin: 0 0 14px;
  line-height: 1.4;
}

/* =========================================================
   TARJETAS PRINCIPALES DE MÉTODO DE DESPACHO (3 OPCIONES)
   ========================================================= */
.dispatch-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.dispatch-method-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 13px;
  padding: 12px 13px;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.dispatch-method-card:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.dispatch-method-card.active {
  border-color: #2563eb;
  background: #eff6ff;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12);
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
  background: #f1f5f9;
  color: #64748b;
  transition: all 0.2s ease;
}

.dispatch-card-icon.store {
  background: #dcfce7;
  color: #16a34a;
}

.dispatch-card-icon.motor {
  background: #fef3c7;
  color: #d97706;
}

.dispatch-card-icon.truck {
  background: #dbeafe;
  color: #2563eb;
}

.dispatch-method-card.active .dispatch-card-icon.store {
  background: #16a34a;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.35);
}

.dispatch-method-card.active .dispatch-card-icon.motor {
  background: #f59e0b;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
}

.dispatch-method-card.active .dispatch-card-icon.truck {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
}

.dispatch-card-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.badge-store-free {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #86efac;
}

.badge-delivery-price {
  background: #fef3c7;
  color: #b45309;
  border: 1px solid #fde68a;
}

.badge-provincia-price {
  background: #dbeafe;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.dispatch-card-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 3px;
  line-height: 1.25;
}

.dispatch-card-sub {
  font-size: 0.73rem;
  color: #64748b;
  line-height: 1.35;
}

.dispatch-method-card.active .dispatch-card-sub {
  color: #334155;
}

/* =========================================================
   APARTADO 0: RECOJO EN TIENDA FÍSICA (PLAZA TEC)
   ========================================================= */
.dispatch-tienda-box {
  margin-bottom: 12px;
  animation: fadeInDispatchBox 0.25s ease;
}

.store-pickup-card {
  background: #f0fdf4;
  border: 1.5px solid #bbf7d0;
  border-radius: 14px;
  padding: 14px 16px;
}

.store-pickup-header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.store-pickup-badge {
  font-size: 0.66rem;
  font-weight: 800;
  color: #15803d;
  background: #dcfce7;
  border: 1px solid #86efac;
  padding: 2.5px 8px;
  border-radius: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.store-free-pill {
  font-size: 0.75rem;
  font-weight: 700;
  color: #16a34a;
}

.store-pickup-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  margin: 4px 0 2px;
}

.store-pickup-addr {
  font-size: 0.80rem;
  color: #475569;
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
  background: #ffffff;
  border: 1px solid #d1fae5;
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 0.73rem;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.store-detail-pill.highlight {
  background: #ffffff;
  border-color: #86efac;
  color: #166534;
}

.store-detail-pill svg {
  flex-shrink: 0;
  color: #16a34a;
}

.store-pickup-perks {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.74rem;
  color: #1e40af;
  line-height: 1.4;
}

.tienda-form-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

/* =========================================================
   APARTADO 1: PROVINCIA (BANNER Y PASOS)
   ========================================================= */
.dispatch-provincia-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 12px;
}

.provincia-guide-banner {
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 14px;
}

.provincia-guide-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.provincia-guide-tag {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2.5px 8px;
  border-radius: 6px;
  background: #dbeafe;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  letter-spacing: 0.04em;
}

.provincia-guide-title {
  font-size: 0.78rem;
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: 0.05em;
}

.provincia-guide-steps {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.prov-step-item {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.74rem;
  line-height: 1.4;
  color: #334155;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.prov-step-num {
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

.prov-step-content strong {
  color: #1d4ed8;
  display: inline;
}

/* Selector de Agencias */
.dispatch-agencies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.dispatch-agency-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.dispatch-agency-card:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.dispatch-agency-card.active {
  border-color: #2563eb;
  background: #eff6ff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.12);
}

.dispatch-agency-card.active .agency-card-name {
  color: #1d4ed8;
}

.agency-card-name {
  font-size: 0.86rem;
  font-weight: 800;
  color: #0f172a;
}

.agency-card-badge {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 9999px;
  background: #dbeafe;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  margin-top: 2px;
}

.agency-card-info {
  font-size: 0.70rem;
  color: #64748b;
  margin-top: 1px;
}

/* =========================================================
   APARTADO 2: DELIVERY EN LIMA
   ========================================================= */
.delivery-quote-card {
  background: #fffbeb;
  border: 1.5px solid #fde68a;
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 14px;
}

.delivery-quote-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.delivery-quote-tag {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2.5px 8px;
  border-radius: 6px;
  background: #fef3c7;
  color: #b45309;
  border: 1px solid #fde68a;
  letter-spacing: 0.04em;
}

.delivery-quote-title {
  font-size: 0.78rem;
  font-weight: 800;
  color: #92400e;
  letter-spacing: 0.05em;
}

.delivery-quote-body {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.delivery-quote-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #fef3c7;
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 0.74rem;
  line-height: 1.4;
  color: #78350f;
}

.delivery-quote-row.alert {
  background: #fef2f2;
  border-color: #fecaca;
  color: #991b1b;
}

.delivery-quote-footer {
  text-align: center;
  font-size: 0.75rem;
  color: #15803d;
  font-weight: 700;
  padding-top: 3px;
}

.dispatch-address-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 10px;
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
  color: #2563eb;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dispatch-address-edit-btn {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.dispatch-address-line1 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 3px;
}

.dispatch-address-line2,
.dispatch-address-line3 {
  font-size: 0.82rem;
  color: #64748b;
  margin-bottom: 2px;
}

/* =========================================================
   FORMULARIOS E INPUTS (LIGHT THEME LIMPIO Y NÍTIDO)
   ========================================================= */
.dispatch-input-row,
.provincia-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.dispatch-input-field,
.dispatch-select-field,
.dispatch-ref-input {
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  padding: 10px 12px;
  color: #0f172a;
  font-size: 0.84rem;
  width: 100%;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.dispatch-input-field:focus,
.dispatch-select-field:focus,
.dispatch-ref-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  background: #ffffff;
}

.dispatch-input-field::placeholder,
.dispatch-ref-input::placeholder {
  color: #94a3b8;
}

.dispatch-select-field option {
  background: #ffffff;
  color: #0f172a;
}

.dispatch-section-subtitle {
  font-size: 0.74rem;
  font-weight: 800;
  color: #334155;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.dispatch-section-subtitle svg {
  color: #2563eb;
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
}

.dispatch-ref-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
  display: block;
}

/* =========================================================
   MÉTODOS DE PAGO (BRANDED CHIPS SOBRE FONDO BLANCO)
   ========================================================= */
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
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 13px;
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.payment-method-card:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.payment-method-card.active {
  border-color: #2563eb;
  background: #eff6ff;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12);
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
  box-shadow: 0 2px 6px rgba(116, 34, 132, 0.25);
}

.pay-chip-plin {
  background: #00d1b2;
  color: #042f2c;
  font-weight: 900;
  box-shadow: 0 2px 6px rgba(0, 209, 178, 0.25);
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
  box-shadow: 0 2px 6px rgba(5, 150, 105, 0.25);
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1.5px solid #cbd5e1;
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
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
}

.payment-method-title {
  font-size: 0.86rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2px;
  line-height: 1.25;
}

.payment-method-desc {
  font-size: 0.72rem;
  color: #64748b;
  line-height: 1.32;
}

.payment-method-card.active .payment-method-desc {
  color: #334155;
}

/* BOTÓN DE ACCIÓN PRINCIPAL */
.btn-dispatch-confirm {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.96rem;
  border: none;
  border-radius: 12px;
  padding: 14px 18px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.35);
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

/* BOTÓN METODOLOGÍA PROVINCIA */
.btn-view-shipping-methodology {
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: 12px;
  padding: 11px 14px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.2s ease;
  text-align: left;
}

.btn-view-shipping-methodology:hover {
  background: #dbeafe;
}

.methodology-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #bfdbfe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  flex-shrink: 0;
}

.methodology-text strong {
  display: block;
  font-size: 0.82rem;
  color: #1e3a8a;
  font-weight: 800;
}

.methodology-text span {
  display: block;
  font-size: 0.72rem;
  color: #475569;
}

.methodology-arrow {
  margin-left: auto;
  font-size: 0.82rem;
  font-weight: 800;
  color: #2563eb;
}

@keyframes fadeInDispatchBox {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* RESPONSIVE DESIGN */
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
}

`;

css = css.slice(0, startIdx) + lightThemeModalCss + css.slice(endIdx);
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/components.css with White / Light Theme!');

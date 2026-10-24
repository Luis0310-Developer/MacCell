const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/checkout-modal.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update checkoutState default
code = code.replace(
  `selectedMethod: 'provincia', // 'provincia', 'delivery', 'tienda'\n    shippingCost: 20, // Envío a provincia: S/ 20.00 fijo\n    selectedPayment: 'yape',`,
  `selectedMethod: 'tienda', // 'tienda', 'delivery', 'provincia'\n    shippingCost: 0,\n    selectedPayment: 'efectivo',`
);

// 2. Replace dispatch-cards-grid and dispatch-tienda-quick-pill
const oldCardsSection = `            <!-- OPCIONES PRINCIPALES DE DESPACHO (TARJETAS) -->
            <div class="dispatch-cards-grid">
              
              <!-- TARJETA 1: ENVÍO A PROVINCIA (NACIONAL) -->
              <div class="dispatch-method-card active" id="cardMethodProvincia" onclick="selectDispatchMethod('provincia')">
                <div class="dispatch-card-top-row">
                  <div class="dispatch-card-icon truck">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V5.25a1.125 1.125 0 0 0-1.125-1.125h-9A1.125 1.125 0 0 0 3 5.25v9m13.5-6.75H12"/>
                    </svg>
                  </div>
                  <span class="dispatch-card-badge badge-provincia-price">S/ 20.00</span>
                </div>
                <div class="dispatch-card-title">Envío a Provincia</div>
                <div class="dispatch-card-sub">Nacional • Shalom, Olva o Marvisur (Tarifa S/ 20)</div>
              </div>

              <!-- TARJETA 2: DELIVERY A DOMICILIO (LIMA) -->
              <div class="dispatch-method-card" id="cardMethodDelivery" onclick="selectDispatchMethod('delivery')">
                <div class="dispatch-card-top-row">
                  <div class="dispatch-card-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                    </svg>
                  </div>
                  <span class="dispatch-card-badge badge-delivery-price">A Cotizar</span>
                </div>
                <div class="dispatch-card-title">Delivery en Lima</div>
                <div class="dispatch-card-sub">Costo según distancia y kilometraje.</div>
              </div>

            </div>

            <!-- OPCIÓN EXTRA: RECOJO EN TIENDA PLAZA TEC -->
            <div class="dispatch-tienda-quick-pill" id="cardMethodTienda" onclick="selectDispatchMethod('tienda')">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: flex; align-items: center; color: #22d3ee;">
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                </span>
                <span><strong>Recojo en Tienda Física:</strong> C.C. Plaza Tec Tienda 303, Lima</span>
              </div>
              <span class="dispatch-card-badge badge-store-free">Gratis</span>
            </div>`;

const newCardsSection = `            <!-- OPCIONES PRINCIPALES DE DESPACHO (3 OPCIONES EJECUTIVAS EQUITATIVAS) -->
            <div class="dispatch-cards-grid dispatch-cards-grid-3">
              
              <!-- TARJETA 1: RECOJO EN TIENDA FÍSICA (PROMINENTE) -->
              <div class="dispatch-method-card active" id="cardMethodTienda" onclick="selectDispatchMethod('tienda')">
                <div class="dispatch-card-top-row">
                  <div class="dispatch-card-icon store">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.614A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 0 0 2.25 1.015c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614M3.75 9.349h16.5"/>
                    </svg>
                  </div>
                  <span class="dispatch-card-badge badge-store-free">Gratis • Inmediato</span>
                </div>
                <div class="dispatch-card-title">Recojo en Tienda</div>
                <div class="dispatch-card-sub">C.C. Plaza Tec 303 • Lima (Paga al retirar)</div>
              </div>

              <!-- TARJETA 2: DELIVERY A DOMICILIO (LIMA) -->
              <div class="dispatch-method-card" id="cardMethodDelivery" onclick="selectDispatchMethod('delivery')">
                <div class="dispatch-card-top-row">
                  <div class="dispatch-card-icon motor">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                    </svg>
                  </div>
                  <span class="dispatch-card-badge badge-delivery-price">A Cotizar</span>
                </div>
                <div class="dispatch-card-title">Delivery en Lima</div>
                <div class="dispatch-card-sub">Motorizado express • Según distancia</div>
              </div>

              <!-- TARJETA 3: ENVÍO A PROVINCIA (NACIONAL) -->
              <div class="dispatch-method-card" id="cardMethodProvincia" onclick="selectDispatchMethod('provincia')">
                <div class="dispatch-card-top-row">
                  <div class="dispatch-card-icon truck">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V5.25a1.125 1.125 0 0 0-1.125-1.125h-9A1.125 1.125 0 0 0 3 5.25v9m13.5-6.75H12"/>
                    </svg>
                  </div>
                  <span class="dispatch-card-badge badge-provincia-price">S/ 20.00</span>
                </div>
                <div class="dispatch-card-title">Envío a Provincia</div>
                <div class="dispatch-card-sub">Nacional • Shalom, Olva o Marvisur</div>
              </div>

            </div>

            <!-- ==============================================
                 APARTADO 0: RECOJO EN TIENDA FÍSICA (PLAZA TEC)
                 ============================================== -->
            <div class="dispatch-tienda-box" id="dispatchTiendaBox">
              <div class="store-pickup-card">
                <div class="store-pickup-header-line">
                  <span class="store-pickup-badge">Punto de Entrega Oficial</span>
                  <span class="store-free-pill">✓ Sin Costo de Envío</span>
                </div>
                <h3 class="store-pickup-title">C.C. Plaza Tec — Tienda 303 (3er Piso)</h3>
                <p class="store-pickup-addr">Av. Garcilaso de la Vega 1358 (ex Wilson), Cercado de Lima</p>

                <div class="store-pickup-details-grid">
                  <div class="store-detail-pill">
                    <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    <span><strong>Horario:</strong> Lun a Sáb 10:00 AM – 8:00 PM</span>
                  </div>
                  <div class="store-detail-pill highlight">
                    <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    <span><strong>Disponibilidad:</strong> Retiro inmediato hoy</span>
                  </div>
                </div>

                <div class="store-pickup-perks">
                  <span>💡 <strong>Garantía Presencial:</strong> Puedes abrir la caja sellada, encender el smartphone y probarlo en la tienda física antes de realizar tu pago.</span>
                </div>
              </div>

              <div class="dispatch-section-subtitle" style="margin-top: 14px;">
                <span class="step-num-circle">1</span>
                <span>Datos de quien retira en Tienda:</span>
              </div>
              <div class="tienda-form-grid">
                <input type="text" id="inpTiendaFullName" class="dispatch-input-field" 
                       placeholder="Nombre y Apellidos completos de quien retira *"
                       oninput="checkoutState.address.name = this.value; saveAddress({name: this.value});">
                <div class="provincia-form-row">
                  <input type="text" id="inpTiendaDni" class="dispatch-input-field" 
                         placeholder="DNI o Carnet de Extranjería (CE)" maxlength="15">
                  <input type="tel" id="inpTiendaPhone" class="dispatch-input-field" 
                         placeholder="Celular / WhatsApp *" maxlength="15"
                         oninput="checkoutState.address.phone = this.value; saveAddress({phone: this.value});">
                </div>
                <input type="text" id="inpTiendaSchedule" class="dispatch-input-field" 
                       placeholder="Horario aproximado de visita (opcional, ej: Hoy a las 5:00 PM)"
                       oninput="checkoutState.referenceText = this.value">
              </div>
            </div>`;

code = code.replace(oldCardsSection, newCardsSection);

// 3. Make dispatchProvinciaBox default to hidden (since tienda is default)
code = code.replace(
  '<div class="dispatch-provincia-box" id="dispatchProvinciaBox">',
  '<div class="dispatch-provincia-box" id="dispatchProvinciaBox" style="display: none;">'
);

// 4. Update the Provincia Guide steps to numbered modern steps (1 to 5)
const oldProvSteps = `                <div class="provincia-guide-steps">
                  <div class="prov-step-item">
                    <span class="prov-step-arrow">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                    </span>
                    <div class="prov-step-content">
                      <strong>CONFIRMA TU PEDIDO:</strong> Elige tu equipo y realiza el pago del producto + S/20 de envío mediante depósito o transferencia a nuestras cuentas oficiales.
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-arrow">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                    </span>
                    <div class="prov-step-content">
                      <strong>ENVÍANOS TUS DATOS:</strong> Envíanos la captura del pago junto con tus datos completos para realizar el despacho.
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-arrow">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                    </span>
                    <div class="prov-step-content">
                      <strong>PREPARAMOS TU EQUIPO:</strong> Emitimos tu comprobante y, antes de embalarlo, te enviamos evidencia de tu equipo. Se despacha con su caja y accesorios completos.
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-arrow">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                    </span>
                    <div class="prov-step-content">
                      <strong>DESPACHAMOS TU PEDIDO:</strong> Enviamos tu compra mediante la agencia previamente coordinada.
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-arrow">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                    </span>
                    <div class="prov-step-content">
                      <strong>CONFIRMACIÓN Y SEGUIMIENTO:</strong> Te enviamos la constancia de envío, número de guía y la información de llegada para que puedas recoger tu pedido en tu ciudad.
                    </div>
                  </div>
                </div>`;

const newProvSteps = `                <div class="provincia-guide-steps">
                  <div class="prov-step-item">
                    <span class="prov-step-num">1</span>
                    <div class="prov-step-content">
                      <strong>CONFIRMA TU PEDIDO:</strong> Pago del producto + S/ 20 de envío mediante depósito o transferencia oficial.
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-num">2</span>
                    <div class="prov-step-content">
                      <strong>ENVÍANOS TUS DATOS:</strong> Envíanos la captura del pago y tus datos para emitir la guía de remisión.
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-num">3</span>
                    <div class="prov-step-content">
                      <strong>PREPARAMOS TU EQUIPO:</strong> Emitimos tu comprobante y enviamos evidencia en video con caja y accesorios.
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-num">4</span>
                    <div class="prov-step-content">
                      <strong>DESPACHAMOS TU PEDIDO:</strong> Entrega directa a la agencia coordinada (Shalom, Olva Courier o Marvisur).
                    </div>
                  </div>
                  <div class="prov-step-item">
                    <span class="prov-step-num">5</span>
                    <div class="prov-step-content">
                      <strong>SEGUIMIENTO EN LÍNEA:</strong> Te enviamos la foto de la guía y clave de retiro para recoger en tu ciudad.
                    </div>
                  </div>
                </div>`;

code = code.replace(oldProvSteps, newProvSteps);

// 5. Update payment-methods-grid with enhanced visual design (chips & subtitles)
const oldPaymentGrid = `              <div class="payment-methods-grid" id="paymentMethodsGrid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                <div class="payment-method-card active" id="payMethodYape" onclick="selectPaymentMethod('yape')">
                  <span class="payment-method-check">✓</span>
                  <div class="payment-method-icon">
                    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>
                  </div>
                  <div class="payment-method-title">Yape / Plin</div>
                </div>
                <div class="payment-method-card" id="payMethodTransfer" onclick="selectPaymentMethod('transferencia')">
                  <span class="payment-method-check">✓</span>
                  <div class="payment-method-icon">
                    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5m-15 10.5V10.5M1.5 21h21"/></svg>
                  </div>
                  <div class="payment-method-title">BCP / BBVA</div>
                </div>
                <div class="payment-method-card" id="payMethodContra" onclick="selectPaymentMethod('contraentrega')" style="display: none;">
                  <span class="payment-method-check">✓</span>
                  <div class="payment-method-icon">
                    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6H2.25m0 0v8.25m0 0H3a.75.75 0 0 1 .75.75v.75m16.5-9.75V4.5a.75.75 0 0 0-.75-.75h-.75m0 0H6.75m14.25 0v.75a.75.75 0 0 1-.75.75H19.5m0 0v8.25m0 0h.75a.75.75 0 0 1 .75.75v.75m0 0a60.07 60.07 0 0 1-15.797-2.101c-.727-.198-1.453.342-1.453 1.096V18.75m16.5 0v-8.25"/></svg>
                  </div>
                  <div class="payment-method-title" id="payMethodContraTitle">Contraentrega</div>
                </div>
              </div>`;

const newPaymentGrid = `              <div class="payment-methods-grid" id="paymentMethodsGrid">
                
                <!-- YAPE / PLIN -->
                <div class="payment-method-card" id="payMethodYape" onclick="selectPaymentMethod('yape')">
                  <div class="pay-card-header">
                    <div class="pay-brand-badges">
                      <span class="pay-chip pay-chip-yape">Yape</span>
                      <span class="pay-chip pay-chip-plin">Plin</span>
                    </div>
                    <div class="payment-method-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                  </div>
                  <div class="payment-method-title">Yape / Plin</div>
                  <div class="payment-method-desc">Billeteras digitales inmediatas</div>
                </div>

                <!-- TRANSFERENCIA BANCARIA -->
                <div class="payment-method-card" id="payMethodTransfer" onclick="selectPaymentMethod('transferencia')">
                  <div class="pay-card-header">
                    <div class="pay-brand-badges">
                      <span class="pay-chip pay-chip-bcp">BCP</span>
                      <span class="pay-chip pay-chip-bbva">BBVA</span>
                    </div>
                    <div class="payment-method-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                  </div>
                  <div class="payment-method-title">Transferencia Bancaria</div>
                  <div class="payment-method-desc">Cuentas corrientes BCP / BBVA</div>
                </div>

                <!-- EFECTIVO EN TIENDA / CONTRAENTREGA -->
                <div class="payment-method-card active" id="payMethodContra" onclick="selectPaymentMethod('contraentrega')">
                  <div class="pay-card-header">
                    <div class="pay-brand-badges">
                      <span class="pay-chip pay-chip-cash" id="payMethodContraBadge">Efectivo</span>
                    </div>
                    <div class="payment-method-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                  </div>
                  <div class="payment-method-title" id="payMethodContraTitle">Efectivo en Tienda</div>
                  <div class="payment-method-desc" id="payMethodContraDesc">Paga al retirar y verificar tu equipo</div>
                </div>

                <!-- TARJETA POS (EN TIENDA) -->
                <div class="payment-method-card" id="payMethodCard" onclick="selectPaymentMethod('tarjeta')">
                  <div class="pay-card-header">
                    <div class="pay-brand-badges">
                      <span class="pay-chip pay-chip-pos">POS</span>
                      <span class="pay-chip pay-chip-visa">Visa/MC</span>
                    </div>
                    <div class="payment-method-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                  </div>
                  <div class="payment-method-title">Tarjeta con POS</div>
                  <div class="payment-method-desc">Débito y Crédito en tienda física</div>
                </div>

              </div>`;

code = code.replace(oldPaymentGrid, newPaymentGrid);

// 6. Update selectDispatchMethod logic
const oldSelectDispatchMethod = `  // Seleccionar método de despacho (Provincia / Delivery / Tienda)
  function selectDispatchMethod(method) {
    checkoutState.selectedMethod = method;
    if (method === 'provincia') {
      checkoutState.shippingCost = 20; // S/ 20 soles fijos
    } else {
      checkoutState.shippingCost = 0; // Delivery a cotizar / Tienda gratis
    }

    // Toggle active class en tarjetas principales
    const cardPro = document.getElementById('cardMethodProvincia');
    const cardDel = document.getElementById('cardMethodDelivery');
    const cardTie = document.getElementById('cardMethodTienda');

    if (cardPro) cardPro.classList.toggle('active', method === 'provincia');
    if (cardDel) cardDel.classList.toggle('active', method === 'delivery');
    if (cardTie) cardTie.classList.toggle('active', method === 'tienda');

    // Alternar visibilidad de cajas de formulario y métodos de pago permitidos
    const boxProv = document.getElementById('dispatchProvinciaBox');
    const boxLima = document.getElementById('dispatchAddressBoxLima');
    const payContra = document.getElementById('payMethodContra');
    const payNotice = document.getElementById('paymentAgencyNotice');
    const payGrid = document.getElementById('paymentMethodsGrid');
    const payTitle = document.getElementById('lblPaymentSectionTitle');

    if (method === 'provincia') {
      if (boxProv) boxProv.style.display = 'block';
      if (boxLima) boxLima.style.display = 'none';
      if (payContra) payContra.style.display = 'none'; // NO HAY CONTRAENTREGA EN AGENCIA
      if (payNotice) payNotice.style.display = 'flex';
      if (payGrid) payGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      if (payTitle) payTitle.textContent = 'Medio de Pago Previo al Despacho:';

      // Si estaba en contraentrega o efectivo, cambiar inmediatamente a Yape
      if (checkoutState.selectedPayment === 'contraentrega' || checkoutState.selectedPayment === 'efectivo') {
        selectPaymentMethod('yape');
      } else {
        selectPaymentMethod(checkoutState.selectedPayment || 'yape');
      }
      syncProvinciaInputs();
    } else if (method === 'delivery') {
      if (boxProv) boxProv.style.display = 'none';
      if (boxLima) boxLima.style.display = 'block';
      if (payContra) {
        payContra.style.display = 'flex'; // Contraentrega permitido en Lima Metropolitana
        const titleEl = document.getElementById('payMethodContraTitle');
        if (titleEl) titleEl.textContent = 'Contraentrega';
      }
      if (payNotice) payNotice.style.display = 'none';
      if (payGrid) payGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      if (payTitle) payTitle.textContent = 'Medio de Pago en Lima Metropolitana:';
      if (checkoutState.selectedPayment === 'efectivo') {
        selectPaymentMethod('contraentrega');
      } else {
        selectPaymentMethod(checkoutState.selectedPayment || 'yape');
      }
      updateAddressDisplay();
    } else if (method === 'tienda') {
      if (boxProv) boxProv.style.display = 'none';
      if (boxLima) boxLima.style.display = 'block';
      if (payContra) {
        payContra.style.display = 'flex'; // PERMITIDO: Pago en Efectivo al recoger en Tienda Física Plaza TEC
        const titleEl = document.getElementById('payMethodContraTitle');
        if (titleEl) titleEl.textContent = 'Efectivo en Tienda';
      }
      if (payNotice) payNotice.style.display = 'none';
      if (payGrid) payGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      if (payTitle) payTitle.textContent = 'Medio de Pago para Recojo en Tienda:';
      if (checkoutState.selectedPayment === 'contraentrega') {
        selectPaymentMethod('efectivo');
      } else {
        selectPaymentMethod(checkoutState.selectedPayment || 'yape');
      }
      updateAddressDisplay();
    }

    renderOrderItems();
  }`;

const newSelectDispatchMethod = `  // Seleccionar método de despacho (Tienda / Delivery / Provincia)
  function selectDispatchMethod(method) {
    checkoutState.selectedMethod = method;
    if (method === 'provincia') {
      checkoutState.shippingCost = 20; // S/ 20 soles fijos
    } else {
      checkoutState.shippingCost = 0; // Tienda gratis / Delivery a cotizar
    }

    // Toggle active class en las 3 tarjetas principales
    const cardTie = document.getElementById('cardMethodTienda');
    const cardDel = document.getElementById('cardMethodDelivery');
    const cardPro = document.getElementById('cardMethodProvincia');

    if (cardTie) cardTie.classList.toggle('active', method === 'tienda');
    if (cardDel) cardDel.classList.toggle('active', method === 'delivery');
    if (cardPro) cardPro.classList.toggle('active', method === 'provincia');

    // Cajas de información según el método
    const boxTienda = document.getElementById('dispatchTiendaBox');
    const boxLima = document.getElementById('dispatchAddressBoxLima');
    const boxProv = document.getElementById('dispatchProvinciaBox');

    const payContra = document.getElementById('payMethodContra');
    const payCard = document.getElementById('payMethodCard');
    const payNotice = document.getElementById('paymentAgencyNotice');
    const payGrid = document.getElementById('paymentMethodsGrid');
    const payTitle = document.getElementById('lblPaymentSectionTitle');

    if (method === 'tienda') {
      if (boxTienda) boxTienda.style.display = 'block';
      if (boxLima) boxLima.style.display = 'none';
      if (boxProv) boxProv.style.display = 'none';

      // En tienda física: Mostrar Efectivo, Yape, Transferencia y Tarjeta POS
      if (payContra) {
        payContra.style.display = 'flex';
        const titleEl = document.getElementById('payMethodContraTitle');
        if (titleEl) titleEl.textContent = 'Efectivo en Tienda';
        const descEl = document.getElementById('payMethodContraDesc');
        if (descEl) descEl.textContent = 'Paga al retirar y verificar tu equipo';
        const badgeEl = document.getElementById('payMethodContraBadge');
        if (badgeEl) badgeEl.textContent = 'Efectivo';
      }
      if (payCard) payCard.style.display = 'flex';
      if (payNotice) payNotice.style.display = 'none';
      if (payTitle) payTitle.textContent = 'Medio de Pago para Recojo en Tienda:';

      // Sincronizar inputs de tienda
      const tName = document.getElementById('inpTiendaFullName');
      const tPhone = document.getElementById('inpTiendaPhone');
      if (tName && !tName.value && checkoutState.address.name) tName.value = checkoutState.address.name;
      if (tPhone && !tPhone.value && checkoutState.address.phone) tPhone.value = checkoutState.address.phone;

      selectPaymentMethod(checkoutState.selectedPayment || 'efectivo');

    } else if (method === 'delivery') {
      if (boxTienda) boxTienda.style.display = 'none';
      if (boxLima) boxLima.style.display = 'block';
      if (boxProv) boxProv.style.display = 'none';

      // En Delivery: Permitir Yape, Transferencia y Contraentrega con motorizado
      if (payContra) {
        payContra.style.display = 'flex';
        const titleEl = document.getElementById('payMethodContraTitle');
        if (titleEl) titleEl.textContent = 'Pago Contra Entrega';
        const descEl = document.getElementById('payMethodContraDesc');
        if (descEl) descEl.textContent = 'Paga al recibir en tu domicilio';
        const badgeEl = document.getElementById('payMethodContraBadge');
        if (badgeEl) badgeEl.textContent = 'Contraentrega';
      }
      if (payCard) payCard.style.display = 'none';
      if (payNotice) payNotice.style.display = 'none';
      if (payTitle) payTitle.textContent = 'Medio de Pago en Lima Metropolitana:';

      if (checkoutState.selectedPayment === 'tarjeta' || checkoutState.selectedPayment === 'efectivo') {
        selectPaymentMethod('contraentrega');
      } else {
        selectPaymentMethod(checkoutState.selectedPayment || 'yape');
      }
      updateAddressDisplay();

    } else if (method === 'provincia') {
      if (boxTienda) boxTienda.style.display = 'none';
      if (boxLima) boxLima.style.display = 'none';
      if (boxProv) boxProv.style.display = 'block';

      // En Provincia: Solo previo pago a cuentas oficiales (Shalom/Olva no aceptan contraentrega)
      if (payContra) payContra.style.display = 'none';
      if (payCard) payCard.style.display = 'none';
      if (payNotice) payNotice.style.display = 'flex';
      if (payTitle) payTitle.textContent = 'Medio de Pago Previo al Despacho:';

      if (checkoutState.selectedPayment === 'contraentrega' || checkoutState.selectedPayment === 'efectivo' || checkoutState.selectedPayment === 'tarjeta') {
        selectPaymentMethod('yape');
      } else {
        selectPaymentMethod(checkoutState.selectedPayment || 'yape');
      }
      syncProvinciaInputs();
    }

    renderOrderItems();
  }`;

code = code.replace(oldSelectDispatchMethod, newSelectDispatchMethod);

// 7. Update selectPaymentMethod to support 'tarjeta'
const oldSelectPaymentMethod = `  // Seleccionar método de pago rápido
  function selectPaymentMethod(payMethod) {
    // Si es provincia, nunca permitir contraentrega ni efectivo presencial
    if (checkoutState.selectedMethod === 'provincia' && (payMethod === 'contraentrega' || payMethod === 'efectivo')) {
      payMethod = 'yape';
    }
    // Normalizar según el método de despacho seleccionado
    if (checkoutState.selectedMethod === 'tienda' && payMethod === 'contraentrega') {
      payMethod = 'efectivo';
    } else if (checkoutState.selectedMethod === 'delivery' && payMethod === 'efectivo') {
      payMethod = 'contraentrega';
    }

    checkoutState.selectedPayment = payMethod;
    document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));

    let targetId = 'payMethodYape';
    if (payMethod === 'transferencia') {
      targetId = 'payMethodTransfer';
    } else if (payMethod === 'contraentrega' || payMethod === 'efectivo') {
      targetId = 'payMethodContra';
    }
    const activeEl = document.getElementById(targetId);
    if (activeEl) {
      void activeEl.offsetWidth; // Forzar reflow para reiniciar la animación CSS al hacer click
      activeEl.classList.add('active');
    }
  }`;

const newSelectPaymentMethod = `  // Seleccionar método de pago rápido
  function selectPaymentMethod(payMethod) {
    // Si es provincia, solo transferencias o billeteras previas
    if (checkoutState.selectedMethod === 'provincia' && (payMethod === 'contraentrega' || payMethod === 'efectivo' || payMethod === 'tarjeta')) {
      payMethod = 'yape';
    }
    // Normalizar según el método de despacho seleccionado
    if (checkoutState.selectedMethod === 'tienda' && payMethod === 'contraentrega') {
      payMethod = 'efectivo';
    } else if (checkoutState.selectedMethod === 'delivery' && (payMethod === 'efectivo' || payMethod === 'tarjeta')) {
      payMethod = 'contraentrega';
    }

    checkoutState.selectedPayment = payMethod;
    document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));

    let targetId = 'payMethodYape';
    if (payMethod === 'transferencia') {
      targetId = 'payMethodTransfer';
    } else if (payMethod === 'contraentrega' || payMethod === 'efectivo') {
      targetId = 'payMethodContra';
    } else if (payMethod === 'tarjeta') {
      targetId = 'payMethodCard';
    }
    const activeEl = document.getElementById(targetId);
    if (activeEl) {
      activeEl.classList.add('active');
    }
  }`;

code = code.replace(oldSelectPaymentMethod, newSelectPaymentMethod);

// 8. Update continueWithPayment() for tienda
const oldContinuePaymentTienda = `    } else if (checkoutState.selectedMethod === 'tienda') {
      const ref = checkoutState.referenceText ? \`\\n• *Indicaciones / Horario:* \${checkoutState.referenceText}\` : '';
      message = \`¡Hola MacCell Perú! 👋📱\\n\` +
        \`Deseo confirmar mi pedido para *RECOJO EN TIENDA FÍSICA (PLAZA TEC)*:\\n\\n\` +
        \`📦 *PRODUCTOS SELECCIONADOS:*\\n\${itemsText}\` +
        \`--------------------------------------\\n\` +
        \`💰 *TOTAL A PAGAR:* S/ \${Number(total).toLocaleString('es-PE', { minimumFractionDigits: 2 })}\\n\\n\` +
        \`📍 *PUNTO DE RECOJO:*\\nC.C. Plaza TEC - Tienda 303 (3er Piso), Cercado de Lima\\n\` +
        \`• *Cliente:* \${checkoutState.address.name || 'Cliente'}\\n\` +
        \`• *Celular:* \${checkoutState.address.phone}\${ref}\\n\\n\` +
        \`💳 *MÉTODO DE PAGO PREFERIDO:*\\n\${payStr}\\n\\n\` +
        \`Por favor, confirmar que mi pedido está listo para recoger hoy mismo.\`;
    } else {`;

const newContinuePaymentTienda = `    } else if (checkoutState.selectedMethod === 'tienda') {
      const tName = document.getElementById('inpTiendaFullName');
      const tDni = document.getElementById('inpTiendaDni');
      const tPhone = document.getElementById('inpTiendaPhone');
      const tSched = document.getElementById('inpTiendaSchedule');

      const clientName = (tName ? tName.value.trim() : '') || checkoutState.address.name || 'Cliente';
      const clientDni = tDni ? tDni.value.trim() : '';
      const clientPhone = (tPhone ? tPhone.value.trim() : '') || checkoutState.address.phone || '';
      const clientSched = (tSched ? tSched.value.trim() : '') || checkoutState.referenceText;

      message = \`¡Hola MacCell Perú! 👋📱\\n\` +
        \`Deseo confirmar mi pedido para *RECOJO EN TIENDA FÍSICA (PLAZA TEC)*:\\n\\n\` +
        \`📦 *PRODUCTOS SELECCIONADOS:*\\n\${itemsText}\` +
        \`--------------------------------------\\n\` +
        \`💰 *TOTAL A PAGAR:* S/ \${Number(total).toLocaleString('es-PE', { minimumFractionDigits: 2 })} (Sin recargo de envío)\\n\\n\` +
        \`📍 *PUNTO DE RECOJO EN TIENDA:*\\n\` +
        \`• C.C. Plaza TEC — Tienda 303 (Piso 3)\\n\` +
        \`• Av. Garcilaso de la Vega 1358 (ex Wilson), Cercado de Lima\\n\` +
        \`• Horario: Lun a Sáb 10:00 AM – 8:00 PM\\n\\n\` +
        \`👤 *DATOS DE QUIEN RETIRA:*\\n\` +
        \`• *Nombre:* \${clientName}\\n\` +
        (clientDni ? \`• *DNI / CE:* \${clientDni}\\n\` : '') +
        \`• *Celular / WhatsApp:* \${clientPhone}\\n\` +
        (clientSched ? \`• *Horario estimado de visita:* \${clientSched}\\n\` : '') +
        \`\\n💳 *MÉTODO DE PAGO EN TIENDA:*\\n\${payStr}\\n\\n\` +
        \`Por favor, confirmar que mi equipo sellado está reservado para acercarme a retirarlo hoy. ¡Muchas gracias!\`;
    } else {`;

code = code.replace(oldContinuePaymentTienda, newContinuePaymentTienda);

// Add tarjeta to payStr options
code = code.replace(
  `if (checkoutState.selectedPayment === 'efectivo') {\n      payStr = "Pago en Efectivo al recoger en Tienda (Plaza TEC Tienda 303)";\n    }`,
  `if (checkoutState.selectedPayment === 'efectivo') {\n      payStr = "Pago en Efectivo al recoger en Tienda (Plaza TEC Tienda 303)";\n    }\n    if (checkoutState.selectedPayment === 'tarjeta') {\n      payStr = "Tarjeta de Débito / Crédito (POS en Tienda Física)";\n    }`
);

// Add payMethodCard listener
code = code.replace(
  `const pContra = overlay.querySelector('#payMethodContra');`,
  `const pContra = overlay.querySelector('#payMethodContra');\n    const pCard = overlay.querySelector('#payMethodCard');`
);
code = code.replace(
  `if (pContra) pContra.addEventListener('click', () => selectPaymentMethod('contraentrega'));`,
  `if (pContra) pContra.addEventListener('click', () => selectPaymentMethod('contraentrega'));\n    if (pCard) pCard.addEventListener('click', () => selectPaymentMethod('tarjeta'));`
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated js/checkout-modal.js!');

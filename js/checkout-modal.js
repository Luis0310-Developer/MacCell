/* ===================================================
   MACCELL - CHECKOUT DISPATCH MODAL (ESTILO MINT / LLAMALA)
   Modal interactivo de Método de Despacho (Provincia con Shalom/Olva/Marvisur),
   Metodología de Envíos Seguros, Formulario Completo y Envío Directo a WhatsApp
   =================================================== */

(function () {
  // Estado interno del checkout
  const checkoutState = {
    selectedMethod: 'provincia', // 'provincia', 'delivery', 'tienda'
    shippingCost: 20, // Envío a provincia: S/ 20.00 fijo
    selectedPayment: 'yape', // 'yape', 'transferencia', 'contraentrega'
    referenceText: '',
    // Datos específicos para Envío a Provincia
    provincia: {
      agency: 'shalom', // 'shalom', 'olva', 'marvisur'
      fullName: '',
      dni: '',
      phone: '',
      department: 'La Libertad',
      provinceCity: '',
      agencyAddress: '',
      notes: ''
    },
    // Datos para Delivery Lima / Tienda
    address: {
      line1: 'Mz F12 Lt19 Mariscal Caceres',
      line2: 'San Juan De Lurigancho, Lima',
      phone: '977507037',
      name: 'Cliente MacCell'
    },
    isEditingAddress: false
  };

  // Exponer checkoutState globalmente para acceso seguro desde handlers inline
  window.checkoutState = checkoutState;

  const PERU_DEPARTMENTS = [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho",
    "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco",
    "Ica", "Junín", "La Libertad", "Lambayeque", "Lima Provincias",
    "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura",
    "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ];

  // Cargar datos guardados en localStorage si existen
  function loadSavedData() {
    try {
      const savedAddr = localStorage.getItem('maccell_customer_address');
      if (savedAddr) {
        checkoutState.address = Object.assign(checkoutState.address, JSON.parse(savedAddr));
      }
      const savedProv = localStorage.getItem('maccell_customer_provincia');
      if (savedProv) {
        checkoutState.provincia = Object.assign(checkoutState.provincia, JSON.parse(savedProv));
      }
    } catch (e) {
      console.warn("No se pudo cargar datos de localStorage", e);
    }
  }

  // Guardar datos en localStorage
  function saveProvinciaData() {
    try {
      localStorage.setItem('maccell_customer_provincia', JSON.stringify(checkoutState.provincia));
    } catch (e) {}
  }

  function saveAddress(data) {
    checkoutState.address = Object.assign(checkoutState.address, data);
    try {
      localStorage.setItem('maccell_customer_address', JSON.stringify(checkoutState.address));
    } catch (e) {}
  }

  // Inyectar HTML del modal principal y del modal de metodología si no existen en el DOM
  function ensureModalElement() {
    // 1. Modal de Metodología de Envíos Seguros a Provincia
    let methodologyModal = document.getElementById('shippingMethodologyModal');
    if (!methodologyModal) {
      methodologyModal = document.createElement('div');
      methodologyModal.id = 'shippingMethodologyModal';
      methodologyModal.className = 'shipping-methodology-overlay';
      methodologyModal.onclick = function (e) {
        if (e.target === methodologyModal) closeShippingMethodologyModal();
      };
      methodologyModal.innerHTML = `
        <div class="shipping-methodology-dialog" onclick="event.stopPropagation()">
          <div class="shipping-methodology-header">
            <div class="shipping-methodology-title">
              <svg width="20" height="20" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
              <span>FORMA DE COMPRA PARA PROVINCIA (S/ 20 ENVÍO)</span>
            </div>
            <button type="button" class="shipping-methodology-close" onclick="closeShippingMethodologyModal()" title="Cerrar" aria-label="Cerrar">✕</button>
          </div>
          
          <div class="shipping-methodology-body">
            <div class="methodology-step-card">
              <div class="methodology-step-num">1</div>
              <div class="methodology-step-content">
                <h4>CONFIRMA TU PEDIDO</h4>
                <p>Elige tu equipo y realiza el pago del producto + <strong>S/ 20 de envío</strong> mediante depósito o transferencia a nuestras cuentas oficiales.</p>
              </div>
            </div>

            <div class="methodology-step-card">
              <div class="methodology-step-num">2</div>
              <div class="methodology-step-content">
                <h4>ENVÍANOS TUS DATOS</h4>
                <p>Envíanos la captura del pago junto con tus datos completos para realizar el despacho.</p>
              </div>
            </div>

            <div class="methodology-step-card">
              <div class="methodology-step-num">3</div>
              <div class="methodology-step-content">
                <h4>PREPARAMOS TU EQUIPO</h4>
                <p>Emitimos tu comprobante y, antes de embalarlo, te enviamos evidencia de tu equipo. Se despacha con su caja y accesorios completos.</p>
              </div>
            </div>

            <div class="methodology-step-card">
              <div class="methodology-step-num">4</div>
              <div class="methodology-step-content">
                <h4>DESPACHAMOS TU PEDIDO</h4>
                <p>Enviamos tu compra mediante la agencia previamente coordinada (Shalom, Olva Courier o Marvisur).</p>
              </div>
            </div>

            <div class="methodology-step-card">
              <div class="methodology-step-num">5</div>
              <div class="methodology-step-content">
                <h4>CONFIRMACIÓN Y SEGUIMIENTO</h4>
                <p>Te enviamos la constancia de envío, número de guía y la información de llegada para que puedas recoger tu pedido en tu ciudad.</p>
              </div>
            </div>
          </div>

          <div class="shipping-methodology-footer">
            <button type="button" class="btn-close-methodology-action" onclick="closeShippingMethodologyModal()">
              Entendido, volver a mi pedido
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(methodologyModal);
    }

    // 2. Modal de Despacho y Checkout Principal
    let overlay = document.getElementById('dispatchCheckoutModal');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'dispatchCheckoutModal';
    overlay.className = 'dispatch-modal-overlay';
    overlay.onclick = function (e) {
      if (e.target === overlay) closeCheckoutDispatchModal();
    };

    overlay.innerHTML = `
      <div class="dispatch-modal-card" onclick="event.stopPropagation()">
        
        <!-- COLUMNA IZQUIERDA: RESUMEN DEL PEDIDO -->
        <div class="dispatch-left-col">
          <div class="dispatch-store-brand">
            <div class="dispatch-brand-icon-box">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
              </svg>
            </div>
            <div>
              <span class="dispatch-brand-name">MacCell Perú</span>
              <span class="dispatch-brand-tag">Tienda Oficial</span>
            </div>
          </div>

          <div class="dispatch-order-title">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
            </svg>
            <span>Resumen del Pedido</span>
          </div>

          <!-- LISTA DINÁMICA DE ITEMS -->
          <div class="dispatch-items-list" id="dispatchItemsList">
            <!-- Rellenado dinámicamente con JS -->
          </div>

          <!-- SECCIÓN DE CÁLCULO DE TOTALES -->
          <div class="dispatch-divider"></div>

          <div class="dispatch-calc-row">
            <span>Subtotal</span>
            <span class="dispatch-calc-val" id="dispatchSubtotal">S/ 0.00</span>
          </div>

          <div class="dispatch-calc-row">
            <span>Flete / Envío</span>
            <span class="dispatch-calc-val" id="dispatchShippingCost">Flete en Destino</span>
          </div>

          <div class="dispatch-calc-total-row">
            <span class="dispatch-calc-total-label">Total Productos</span>
            <span class="dispatch-calc-total-num" id="dispatchTotalAmount">S/ 0.00</span>
          </div>

          <!-- SELLO DE CONFIANZA Y GARANTÍA -->
          <div class="dispatch-guarantee-box">
            <span class="guarantee-icon">
              <svg width="22" height="22" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
            </span>
            <div class="guarantee-text">
              <strong>Garantía Oficial de 1 Año</strong>
              <span>Equipos 100% nuevos sellados • Boleta o Factura</span>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA: MÉTODO DE DESPACHO & PAGO -->
        <div class="dispatch-right-col">
          <!-- BOTÓN CERRAR -->
          <button class="dispatch-close-btn" onclick="closeCheckoutDispatchModal()" title="Cerrar ventana" aria-label="Cerrar">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- PASO 1: MÉTODO DE DESPACHO & FORMULARIO -->
          <div id="dispatchStep1">
            <h2 class="dispatch-main-title">Método de Despacho</h2>
            <p class="dispatch-main-sub">Selecciona cómo deseas recibir tu smartphone o accesorios.</p>

            <!-- OPCIONES PRINCIPALES DE DESPACHO (TARJETAS) -->
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
            </div>

            <!-- ==============================================
                 APARTADO 1: ENVÍO A PROVINCIA (SHALOM / OLVA / MARVISUR)
                 ============================================== -->
            <div class="dispatch-provincia-box" id="dispatchProvinciaBox">
              
              <!-- BANNER VISUAL: FORMA DE COMPRA PARA PROVINCIA -->
              <div class="provincia-guide-banner">
                <div class="provincia-guide-header">
                  <span class="provincia-guide-tag">TARIFA PLANA S/ 20.00</span>
                  <div class="provincia-guide-title">FORMA DE COMPRA PARA PROVINCIA</div>
                </div>
                <div class="provincia-guide-steps">
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
                </div>
              </div>

              <div class="dispatch-section-subtitle">
                <span style="display: inline-flex; align-items: center; color: #22d3ee;">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21"/></svg>
                </span>
                <span>1. Elige la Agencia para tu Encomienda:</span>
              </div>

              <!-- SELECTOR DE AGENCIA: SHALOM / OLVA / MARVISUR -->
              <div class="dispatch-agencies-grid">
                <!-- SHALOM -->
                <div class="dispatch-agency-card active" id="agencyCardShalom" onclick="selectProvinciaAgency('shalom')">
                  <div class="agency-card-icon">
                    <svg width="22" height="22" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/></svg>
                  </div>
                  <div class="agency-card-name">Shalom</div>
                  <span class="agency-card-badge" style="background: rgba(34, 197, 94, 0.15); color: #4ade80; border-color: rgba(34, 197, 94, 0.3);">Recojo en Agencia</span>
                  <div class="agency-card-info">Retiro con DNI y Clave</div>
                </div>

                <!-- OLVA COURIER -->
                <div class="dispatch-agency-card" id="agencyCardOlva" onclick="selectProvinciaAgency('olva')">
                  <div class="agency-card-icon">
                    <svg width="22" height="22" fill="none" stroke="#facc15" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V5.25a1.125 1.125 0 0 0-1.125-1.125h-9A1.125 1.125 0 0 0 3 5.25v9m13.5-6.75H12"/></svg>
                  </div>
                  <div class="agency-card-name">Olva Courier</div>
                  <span class="agency-card-badge" style="background: rgba(234, 179, 8, 0.15); color: #facc15; border-color: rgba(234, 179, 8, 0.3);">Domicilio / Agencia</span>
                  <div class="agency-card-info">A nivel nacional</div>
                </div>

                <!-- MARVISUR -->
                <div class="dispatch-agency-card" id="agencyCardMarvisur" onclick="selectProvinciaAgency('marvisur')">
                  <div class="agency-card-icon">
                    <svg width="22" height="22" fill="none" stroke="#34d399" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3h16.5v13.5h-16.5zm0 13.5v3.75h16.5V16.5M6 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm12 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>
                  </div>
                  <div class="agency-card-name">Marvisur</div>
                  <span class="agency-card-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3);">Terminal Terrestre</span>
                  <div class="agency-card-info">Cargas y Encomiendas</div>
                </div>
              </div>

              <!-- 2. DATOS DEL DESTINATARIO PARA LA GUÍA -->
              <div class="dispatch-section-subtitle" style="margin-top: 14px;">
                <span style="display: inline-flex; align-items: center; color: #22d3ee;">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg>
                </span>
                <span>2. Datos del Destinatario (Para emisión de Guía de Remisión):</span>
              </div>

              <div class="provincia-form-grid">
                <input type="text" id="inpProvinciaFullName" class="dispatch-input-field" 
                       placeholder="Nombre y Apellidos completos (quien retira con DNI) *"
                       oninput="checkoutState.provincia.fullName = this.value; saveProvinciaData();">

                <div class="provincia-form-row">
                  <input type="text" id="inpProvinciaDni" class="dispatch-input-field" 
                         placeholder="DNI o Carnet de Extranjería (CE) *" maxlength="15"
                         oninput="checkoutState.provincia.dni = this.value; saveProvinciaData();">
                  
                  <input type="tel" id="inpProvinciaPhone" class="dispatch-input-field" 
                         placeholder="Celular / WhatsApp de contacto *" maxlength="15"
                         oninput="checkoutState.provincia.phone = this.value; saveProvinciaData();">
                </div>

                <div class="provincia-form-row">
                  <select id="inpProvinciaDept" class="dispatch-select-field" 
                          onchange="checkoutState.provincia.department = this.value; saveProvinciaData();">
                    ${PERU_DEPARTMENTS.map(d => `<option value="${d}" ${d === 'La Libertad' ? 'selected' : ''}>${d}</option>`).join('')}
                  </select>

                  <input type="text" id="inpProvinciaCity" class="dispatch-input-field" 
                         placeholder="Provincia / Ciudad (ej: Trujillo, Arequipa) *"
                         oninput="checkoutState.provincia.provinceCity = this.value; saveProvinciaData();">
                </div>

                <input type="text" id="inpProvinciaAgencyAddress" class="dispatch-input-field" 
                       placeholder="Agencia de destino o Dirección exacta de entrega *"
                       oninput="checkoutState.provincia.agencyAddress = this.value; saveProvinciaData();">

                <input type="text" id="inpProvinciaNotes" class="dispatch-input-field" 
                       placeholder="Referencias o indicaciones adicionales (opcional)"
                       oninput="checkoutState.provincia.notes = this.value; saveProvinciaData();">
              </div>

              <!-- BOTÓN VER METODOLOGÍA DE ENVÍOS A PROVINCIA -->
              <button type="button" class="btn-view-shipping-methodology" onclick="openShippingMethodologyModal()">
                <div class="methodology-icon">
                  <svg width="22" height="22" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
                </div>
                <div class="methodology-text">
                  <strong>Forma de Compra para Provincia (5 Pasos Oficiales)</strong>
                  <span>Ver detalles del pago + S/20, emisión de boleta, video de prueba y guía</span>
                </div>
                <div class="methodology-arrow">Ver →</div>
              </button>

            </div>

            <!-- ==============================================
                 APARTADO 2: DIRECCIÓN DELIVERY LIMA / RECOJO TIENDA
                 ============================================== -->
            <div class="dispatch-address-box" id="dispatchAddressBoxLima" style="display: none;">
              
              <!-- BANNER VISUAL: COTIZA TU DELIVERY -->
              <div class="delivery-quote-card" id="deliveryQuoteNotice">
                <div class="delivery-quote-header">
                  <span class="delivery-quote-tag">A Cotizar</span>
                  <div class="delivery-quote-title">COTIZA TU DELIVERY EN LIMA</div>
                </div>
                <div class="delivery-quote-body">
                  <div class="delivery-quote-row">
                    <span class="dq-icon" style="color: #22d3ee;">
                      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                    </span>
                    <p><strong>Envíanos tu ubicación en tiempo real</strong> para calcular el costo del envío. El delivery tiene costo según la distancia y kilometraje del motorizado.</p>
                  </div>
                  <div class="delivery-quote-row">
                    <span class="dq-icon" style="color: #4ade80;">
                      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                    </span>
                    <p>Puedes cotizar <strong>sin compromiso</strong>.</p>
                  </div>
                  <div class="delivery-quote-row alert">
                    <span class="dq-icon" style="color: #facc15;">
                      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>
                    </span>
                    <p><strong>(Recuerda que el delivery se paga por adelantado</strong> para confirmar el servicio y garantizar la seriedad y responsabilidad del pedido).</p>
                  </div>
                  <div class="delivery-quote-footer">
                    <span>Una vez confirmado, coordinamos tu entrega express.</span>
                  </div>
                </div>
              </div>

              <div class="dispatch-address-header">
                <span class="dispatch-address-label" id="dispatchAddressLabelTitle">DIRECCIÓN DE ENTREGA EN LIMA</span>
                <button type="button" class="dispatch-address-edit-btn" id="btnToggleEditAddr" onclick="toggleEditAddress()">
                  Editar
                </button>
              </div>

              <div id="dispatchAddressDisplayView">
                <div class="dispatch-address-line1" id="lblAddressLine1">Mz F12 Lt19 Mariscal Caceres</div>
                <div class="dispatch-address-line2" id="lblAddressLine2">San Juan De Lurigancho, Lima</div>
                <div class="dispatch-address-line3" id="lblAddressLine3">977507037</div>
              </div>

              <div class="dispatch-address-form" id="dispatchAddressEditForm" style="display: none;">
                <input type="text" id="inpAddressStreet" class="dispatch-input-field" placeholder="Dirección (Calle, Av, Mz, Lote)">
                <div class="dispatch-input-row">
                  <input type="text" id="inpAddressDistrict" class="dispatch-input-field" placeholder="Distrito y Ciudad">
                  <input type="tel" id="inpAddressPhone" class="dispatch-input-field" placeholder="WhatsApp / Teléfono">
                </div>
                <input type="text" id="inpAddressName" class="dispatch-input-field" placeholder="Nombre de quien recibe">
                <button type="button" class="btn-save-addr" onclick="saveAddressFromInputs()">Guardar Dirección</button>
              </div>

              <div style="margin-top: 10px;">
                <label class="dispatch-ref-label" id="lblDeliveryReferenceTitle" for="inpDeliveryReference">REFERENCIAS DE ENTREGA (OPCIONAL)</label>
                <input type="text" id="inpDeliveryReference" class="dispatch-ref-input"
                       placeholder="Ej: Portón negro, frente al parque, timbre de bronce"
                       oninput="checkoutState.referenceText = this.value">
              </div>
            </div>

            <!-- MÉTODO DE PAGO PREFERIDO RÁPIDO -->
            <div style="margin-top: 14px;" id="dispatchPaymentContainer">
              <div class="dispatch-section-subtitle">
                <span style="display: inline-flex; align-items: center; color: #22d3ee;">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-6-10.5h16.5c.621 0 1.125.504 1.125 1.125v10.5c0 .621-.504 1.125-1.125 1.125H3.75c-.621 0-1.125-.504-1.125-1.125V6.75c0-.621.504-1.125 1.125-1.125Z"/></svg>
                </span>
                <span id="lblPaymentSectionTitle">Medio de Pago Previo al Despacho:</span>
              </div>
              <div class="payment-methods-grid" id="paymentMethodsGrid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
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
              </div>

              <!-- NOTIFICACIÓN ACLARATORIA DE CONDICIÓN: FORMA DE PAGO EN PROVINCIA -->
              <div class="payment-agency-notice" id="paymentAgencyNotice">
                <span class="notice-icon" style="color: #22d3ee;">
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
                </span>
                <div class="notice-text">
                  <strong>Forma de Compra para Envíos a Provincia:</strong> Elige tu equipo y realiza el pago del producto + <strong>S/ 20 de envío</strong> mediante depósito o transferencia a nuestras cuentas oficiales. <strong>No existe pago contraentrega en agencias de encomienda.</strong> Antes de embalarlo emitimos tu comprobante y te enviamos evidencia en video con su caja y accesorios completos.
                </div>
              </div>
            </div>

            <!-- BOTÓN PRINCIPAL: CONTINUAR CON EL PAGO Y ENVIAR AL WHATSAPP -->
            <button type="button" class="btn-dispatch-confirm" id="btnContinuePaymentAction" onclick="continueWithPayment()">
              <span>Continuar con el Pago</span>
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
              </svg>
            </button>
          </div>

        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    // Enlazar listeners directos para máxima compatibilidad
    const pYape = overlay.querySelector('#payMethodYape');
    const pTransfer = overlay.querySelector('#payMethodTransfer');
    const pContra = overlay.querySelector('#payMethodContra');
    if (pYape) pYape.addEventListener('click', () => selectPaymentMethod('yape'));
    if (pTransfer) pTransfer.addEventListener('click', () => selectPaymentMethod('transferencia'));
    if (pContra) pContra.addEventListener('click', () => selectPaymentMethod('contraentrega'));

    return overlay;
  }

  // Renderizar items del pedido en la columna izquierda
  function renderOrderItems() {
    const list = document.getElementById('dispatchItemsList');
    const subtotalEl = document.getElementById('dispatchSubtotal');
    const shippingEl = document.getElementById('dispatchShippingCost');
    const totalEl = document.getElementById('dispatchTotalAmount');
    if (!list) return;

    const cart = (typeof appState !== 'undefined' && Array.isArray(appState.cart)) ? appState.cart : [];

    if (cart.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: #94a3b8; font-size: 0.85rem;">
          Tu carrito está vacío. Agrega algún celular o accesorio.
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = 'S/ 0.00';
      if (totalEl) totalEl.textContent = 'S/ 0.00';
      return;
    }

    const resolve = typeof window.resolveAssetPath === 'function' ? window.resolveAssetPath : function (p) {
      if (!p) return '';
      if (p.startsWith('http') || p.startsWith('data:') || p.startsWith('/')) return p;
      const isPages = typeof window !== 'undefined' && window.location.pathname.includes('/pages/');
      return isPages ? (p.startsWith('../') ? p : '../' + p) : (p.startsWith('../') ? p.replace(/^\.\.\//, '') : p);
    };

    let subtotal = 0;
    list.innerHTML = cart.map(item => {
      const itemPrice = item.price || 0;
      const qty = item.qty || 1;
      const itemSub = itemPrice * qty;
      subtotal += itemSub;

      const imgSrc = resolve(item.image);
      const fallback = resolve('assets/img/ui/Logo.jpeg');
      const detail = `${item.selectedColor ? item.selectedColor + ' • ' : ''}Cant: ${qty}`;

      return `
        <div class="dispatch-item-row">
          <div class="dispatch-item-thumb">
            <img src="${imgSrc}" alt="${item.name}" onerror="this.onerror=null; this.src='${fallback}'">
          </div>
          <div class="dispatch-item-info">
            <div class="dispatch-item-name" title="${item.name}">${item.name}</div>
            <div class="dispatch-item-detail">${detail}</div>
          </div>
          <div class="dispatch-item-price">S/ ${Number(itemSub).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      `;
    }).join('');

    const shipping = checkoutState.shippingCost;
    const grandTotal = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = `S/ ${Number(subtotal).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (shippingEl) {
      if (checkoutState.selectedMethod === 'provincia') {
        const agencyName = getAgencyDisplayName(checkoutState.provincia.agency);
        shippingEl.textContent = `S/ 20.00 (${agencyName})`;
        shippingEl.style.color = '#38bdf8';
      } else if (checkoutState.selectedMethod === 'tienda') {
        shippingEl.textContent = 'Gratis (S/ 0.00)';
        shippingEl.style.color = '#34d399';
      } else {
        shippingEl.textContent = 'A Cotizar (Ubicación en tiempo real)';
        shippingEl.style.color = '#f59e0b';
      }
    }
    if (totalEl) {
      if (checkoutState.selectedMethod === 'delivery') {
        totalEl.innerHTML = `S/ ${Number(grandTotal).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size: 0.72rem; color: #f59e0b; font-weight: normal; display: block; margin-top: 2px;">+ Delivery a cotizar</span>`;
      } else {
        totalEl.textContent = `S/ ${Number(grandTotal).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }
  }

  function getAgencyDisplayName(agencyCode) {
    if (agencyCode === 'olva') return 'Olva Courier';
    if (agencyCode === 'marvisur') return 'Marvisur';
    return 'Shalom';
  }

  // Sincronizar inputs de provincia con checkoutState.provincia
  function syncProvinciaInputs() {
    const fn = document.getElementById('inpProvinciaFullName');
    const dni = document.getElementById('inpProvinciaDni');
    const ph = document.getElementById('inpProvinciaPhone');
    const dept = document.getElementById('inpProvinciaDept');
    const city = document.getElementById('inpProvinciaCity');
    const addr = document.getElementById('inpProvinciaAgencyAddress');
    const notes = document.getElementById('inpProvinciaNotes');

    if (fn && !fn.value) fn.value = checkoutState.provincia.fullName || '';
    if (dni && !dni.value) dni.value = checkoutState.provincia.dni || '';
    if (ph && !ph.value) ph.value = checkoutState.provincia.phone || '';
    if (dept && checkoutState.provincia.department) dept.value = checkoutState.provincia.department;
    if (city && !city.value) city.value = checkoutState.provincia.provinceCity || '';
    if (addr && !addr.value) addr.value = checkoutState.provincia.agencyAddress || '';
    if (notes && !notes.value) notes.value = checkoutState.provincia.notes || '';

    selectProvinciaAgency(checkoutState.provincia.agency || 'shalom');
  }

  // Seleccionar agencia de provincia (Shalom / Olva / Marvisur)
  function selectProvinciaAgency(agency) {
    checkoutState.provincia.agency = agency;
    saveProvinciaData();

    document.querySelectorAll('.dispatch-agency-card').forEach(c => c.classList.remove('active'));
    const target = document.getElementById('agencyCard' + (agency.charAt(0).toUpperCase() + agency.slice(1)));
    if (target) target.classList.add('active');

    // Sugerencia dinámica en el campo de dirección
    const addrInput = document.getElementById('inpProvinciaAgencyAddress');
    if (addrInput && !addrInput.value) {
      if (agency === 'shalom') addrInput.placeholder = "Ej: Agencia Shalom Av. América Sur / o Central";
      else if (agency === 'olva') addrInput.placeholder = "Ej: A Domicilio: Calle Las Begonias 123 o Agencia Olva";
      else if (agency === 'marvisur') addrInput.placeholder = "Ej: Agencia Marvisur Terminal Terrestre";
    }

    renderOrderItems();
  }

  // Seleccionar método de despacho (Provincia / Delivery / Tienda)
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
  }

  // Renderizar la información de dirección en pantalla para Lima / Tienda
  function updateAddressDisplay() {
    const l1 = document.getElementById('lblAddressLine1');
    const l2 = document.getElementById('lblAddressLine2');
    const l3 = document.getElementById('lblAddressLine3');
    const title = document.getElementById('dispatchAddressLabelTitle');
    const refLabel = document.getElementById('lblDeliveryReferenceTitle');
    const refInput = document.getElementById('inpDeliveryReference');

    if (checkoutState.selectedMethod === 'tienda') {
      if (title) title.textContent = 'PUNTO DE RECOJO EN TIENDA';
      if (l1) l1.textContent = 'C.C. Plaza TEC - Tienda 303 (3er Piso)';
      if (l2) l2.textContent = 'Av. Garcilaso de la Vega 1358, Cercado de Lima';
      if (l3) l3.textContent = `Recoge: ${checkoutState.address.name || 'Cliente MacCell'} • Tel: ${checkoutState.address.phone}`;
      if (refLabel) refLabel.textContent = 'INDICACIONES O HORARIO ESTIMADO (OPCIONAL)';
      if (refInput) refInput.placeholder = 'Ej: Paso hoy a las 5:00 PM / Recoge otra persona';
    } else {
      if (title) title.textContent = 'DIRECCIÓN DE ENTREGA EN LIMA';
      if (l1) l1.textContent = checkoutState.address.line1;
      if (l2) l2.textContent = checkoutState.address.line2;
      if (l3) l3.textContent = checkoutState.address.phone;
      if (refLabel) refLabel.textContent = 'REFERENCIAS DE ENTREGA (OPCIONAL)';
      if (refInput) refInput.placeholder = 'Ej: Portón negro, frente al parque, timbre de bronce';
    }
  }

  // Alternar edición de datos de recepción / contacto
  function toggleEditAddress() {
    const displayView = document.getElementById('dispatchAddressDisplayView');
    const editForm = document.getElementById('dispatchAddressEditForm');
    const btn = document.getElementById('btnToggleEditAddr');
    const streetInput = document.getElementById('inpAddressStreet');
    const distInput = document.getElementById('inpAddressDistrict');
    const nameInput = document.getElementById('inpAddressName');
    const phoneInput = document.getElementById('inpAddressPhone');
    const isTienda = checkoutState.selectedMethod === 'tienda';

    if (!editForm || !displayView) return;

    if (editForm.style.display === 'none') {
      if (streetInput) {
        streetInput.value = checkoutState.address.line1;
        streetInput.style.display = isTienda ? 'none' : 'block';
      }
      if (distInput) {
        distInput.value = checkoutState.address.line2;
        distInput.style.display = isTienda ? 'none' : 'block';
      }
      if (nameInput) {
        nameInput.value = checkoutState.address.name || 'Cliente MacCell';
        nameInput.placeholder = isTienda ? 'Nombre y Apellido de quien recoge *' : 'Nombre de quien recibe *';
      }
      if (phoneInput) {
        phoneInput.value = checkoutState.address.phone;
        phoneInput.placeholder = 'WhatsApp / Celular de contacto *';
      }

      displayView.style.display = 'none';
      editForm.style.display = 'flex';
      if (btn) btn.textContent = 'Cancelar';
    } else {
      displayView.style.display = 'block';
      editForm.style.display = 'none';
      if (btn) btn.textContent = 'Editar';
    }
  }

  // Guardar datos desde los inputs
  function saveAddressFromInputs() {
    const isTienda = checkoutState.selectedMethod === 'tienda';
    const street = isTienda ? 'C.C. Plaza TEC - Tienda 303' : document.getElementById('inpAddressStreet').value.trim();
    const dist = isTienda ? 'Cercado de Lima' : document.getElementById('inpAddressDistrict').value.trim();
    const phone = document.getElementById('inpAddressPhone').value.trim();
    const name = document.getElementById('inpAddressName').value.trim();

    if (!isTienda && !street) {
      if (typeof showToast === 'function') {
        showToast("Por favor ingresa tu dirección de entrega.");
      } else {
        alert("Por favor ingresa tu dirección de entrega.");
      }
      return;
    }

    if (!phone) {
      if (typeof showToast === 'function') {
        showToast("Por favor ingresa tu número de WhatsApp / teléfono de contacto.");
      } else {
        alert("Por favor ingresa tu número de WhatsApp / teléfono de contacto.");
      }
      return;
    }

    saveAddress({
      line1: isTienda ? checkoutState.address.line1 : street,
      line2: isTienda ? checkoutState.address.line2 : (dist || 'Lima Metropolitana'),
      phone: phone,
      name: name || 'Cliente MacCell'
    });

    updateAddressDisplay();
    toggleEditAddress();
    if (typeof showToast === 'function') {
      showToast(isTienda ? "¡Datos de quien recoge actualizados exitosamente!" : "¡Dirección guardada exitosamente!");
    }
  }

  // Seleccionar método de pago rápido
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
  }

  // Abrir Modal de Metodología de Envíos Seguros a Provincia
  function openShippingMethodologyModal() {
    ensureModalElement();
    const modal = document.getElementById('shippingMethodologyModal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  // Cerrar Modal de Metodología SIN BORRAR EL FORMULARIO
  function closeShippingMethodologyModal() {
    const modal = document.getElementById('shippingMethodologyModal');
    if (modal) {
      modal.classList.remove('active');
    }
    // El formulario de provincia permanece intacto
  }

  // Acción Principal: "Continuar con el Pago" -> Envía todo al WhatsApp de la tienda
  function continueWithPayment() {
    const cart = (typeof appState !== 'undefined' && Array.isArray(appState.cart)) ? appState.cart : [];
    if (cart.length === 0) {
      if (typeof showToast === 'function') showToast("El carrito está vacío.");
      return;
    }

    // Si es Envío a Provincia, validar campos obligatorios
    if (checkoutState.selectedMethod === 'provincia') {
      const fn = document.getElementById('inpProvinciaFullName');
      const dni = document.getElementById('inpProvinciaDni');
      const ph = document.getElementById('inpProvinciaPhone');
      const dept = document.getElementById('inpProvinciaDept');
      const city = document.getElementById('inpProvinciaCity');
      const addr = document.getElementById('inpProvinciaAgencyAddress');
      const notes = document.getElementById('inpProvinciaNotes');

      const fullName = (fn ? fn.value : checkoutState.provincia.fullName).trim();
      const dniVal = (dni ? dni.value : checkoutState.provincia.dni).trim();
      const phone = (ph ? ph.value : checkoutState.provincia.phone).trim();
      const department = dept ? dept.value : (checkoutState.provincia.department || 'La Libertad');
      const provinceCity = (city ? city.value : checkoutState.provincia.provinceCity).trim();
      const agencyAddress = (addr ? addr.value : checkoutState.provincia.agencyAddress).trim();
      const notesVal = notes ? notes.value.trim() : '';

      // Actualizar estado
      checkoutState.provincia = {
        agency: checkoutState.provincia.agency || 'shalom',
        fullName,
        dni: dniVal,
        phone,
        department,
        provinceCity,
        agencyAddress,
        notes: notesVal
      };
      saveProvinciaData();

      // Validar datos mínimos obligatorios para emitir guía de encomienda
      if (!fullName || fullName.length < 3) {
        if (fn) { fn.focus(); fn.style.borderColor = '#ef4444'; }
        if (typeof showToast === 'function') showToast("⚠️ Por favor ingresa el Nombre y Apellidos completos de quien retira.");
        return;
      }
      if (!dniVal || dniVal.length < 7) {
        if (dni) { dni.focus(); dni.style.borderColor = '#ef4444'; }
        if (typeof showToast === 'function') showToast("⚠️ Por favor ingresa el DNI o Carnet de Extranjería.");
        return;
      }
      if (!phone || phone.length < 8) {
        if (ph) { ph.focus(); ph.style.borderColor = '#ef4444'; }
        if (typeof showToast === 'function') showToast("⚠️ Por favor ingresa un Celular / WhatsApp de contacto.");
        return;
      }
      if (!provinceCity) {
        if (city) { city.focus(); city.style.borderColor = '#ef4444'; }
        if (typeof showToast === 'function') showToast("⚠️ Por favor ingresa la Provincia / Ciudad de destino.");
        return;
      }
      if (!agencyAddress) {
        if (addr) { addr.focus(); addr.style.borderColor = '#ef4444'; }
        if (typeof showToast === 'function') showToast("⚠️ Por favor ingresa la Agencia o Dirección de entrega.");
        return;
      }
    }

    // Armar resumen de productos seleccionados
    let subtotal = 0;
    let itemsText = "";
    cart.forEach((item, index) => {
      const price = item.price || 0;
      const qty = item.qty || 1;
      const sub = price * qty;
      subtotal += sub;
      const colorStr = item.selectedColor ? ` (${item.selectedColor})` : '';
      itemsText += `${index + 1}. *${item.name}*${colorStr} x${qty} — S/ ${Number(sub).toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n`;
    });

    const shipping = checkoutState.shippingCost;
    const total = subtotal + shipping;

    let payStr = "Yape / Plin";
    if (checkoutState.selectedPayment === 'transferencia') payStr = "Transferencia Bancaria (BCP / BBVA / Interbank)";
    if (checkoutState.selectedPayment === 'contraentrega') {
      payStr = "Pago Contraentrega en Lima (al recibir con motorizado)";
    }
    if (checkoutState.selectedPayment === 'efectivo') {
      payStr = "Pago en Efectivo al recoger en Tienda (Plaza TEC Tienda 303)";
    }

    let message = "";

    if (checkoutState.selectedMethod === 'provincia') {
      const p = checkoutState.provincia;
      const agencyName = getAgencyDisplayName(p.agency);

      message = `¡Hola MacCell Perú! 👋📱\n` +
        `Deseo realizar la compra del siguiente pedido con *ENVÍO A PROVINCIA*:\n\n` +
        `📦 *PRODUCTOS SELECCIONADOS:*\n${itemsText}` +
        `--------------------------------------\n` +
        `*Subtotal Productos:* S/ ${Number(subtotal).toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n` +
        `*Envío a Provincia:* S/ 20.00 (${agencyName})\n` +
        `💰 *TOTAL A TRANSFERIR:* S/ ${Number(total).toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n\n` +
        `🚚 *FORMA DE COMPRA PARA PROVINCIA (S/ 20 ENVÍO):*\n` +
        `1️⃣ CONFIRMA TU PEDIDO: Pago del producto + S/20 de envío a cuentas oficiales.\n` +
        `2️⃣ ENVÍANOS TUS DATOS: Captura del comprobante y datos de despacho.\n` +
        `3️⃣ PREPARAMOS TU EQUIPO: Emisión de boleta y evidencia en video con caja y accesorios.\n` +
        `4️⃣ DESPACHAMOS TU PEDIDO: Envío por ${agencyName}.\n` +
        `5️⃣ CONFIRMACIÓN Y SEGUIMIENTO: Constancia de envío, número de guía y seguimiento.\n\n` +
        `📋 *DATOS DEL DESTINATARIO PARA LA GUÍA DE REMISIÓN:*\n` +
        `• *Nombre y Apellidos:* ${p.fullName}\n` +
        `• *DNI / CE:* ${p.dni}\n` +
        `• *Celular:* ${p.phone}\n` +
        `• *Departamento:* ${p.department}\n` +
        `• *Provincia / Ciudad:* ${p.provinceCity}\n` +
        `• *Agencia o Dirección:* ${p.agencyAddress}\n` +
        (p.notes ? `• *Referencias:* ${p.notes}\n` : '') +
        `\n💳 *MÉTODO DE PAGO PREFERIDO:*\n${payStr}\n\n` +
        `Por favor, confirmar disponibilidad y cuentas oficiales para realizar la transferencia de S/ ${Number(total).toLocaleString('es-PE', { minimumFractionDigits: 2 })} y enviar la constancia. ¡Muchas gracias!`;
    } else if (checkoutState.selectedMethod === 'tienda') {
      const ref = checkoutState.referenceText ? `\n• *Indicaciones / Horario:* ${checkoutState.referenceText}` : '';
      message = `¡Hola MacCell Perú! 👋📱\n` +
        `Deseo confirmar mi pedido para *RECOJO EN TIENDA FÍSICA (PLAZA TEC)*:\n\n` +
        `📦 *PRODUCTOS SELECCIONADOS:*\n${itemsText}` +
        `--------------------------------------\n` +
        `💰 *TOTAL A PAGAR:* S/ ${Number(total).toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n\n` +
        `📍 *PUNTO DE RECOJO:*\nC.C. Plaza TEC - Tienda 303 (3er Piso), Cercado de Lima\n` +
        `• *Cliente:* ${checkoutState.address.name || 'Cliente'}\n` +
        `• *Celular:* ${checkoutState.address.phone}${ref}\n\n` +
        `💳 *MÉTODO DE PAGO PREFERIDO:*\n${payStr}\n\n` +
        `Por favor, confirmar que mi pedido está listo para recoger hoy mismo.`;
    } else {
      // Delivery Lima
      const ref = checkoutState.referenceText ? `\n• *Referencia:* ${checkoutState.referenceText}` : '';
      message = `¡Hola MacCell Perú! 👋📱\n` +
        `Deseo coordinar el siguiente pedido con *DELIVERY EN LIMA METROPOLITANA*:\n\n` +
        `📦 *PRODUCTOS SELECCIONADOS:*\n${itemsText}` +
        `--------------------------------------\n` +
        `*Subtotal Productos:* S/ ${Number(subtotal).toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n` +
        `*Costo de Delivery:* A COTIZAR (Según distancia y kilometraje del motorizado)\n` +
        `💰 *TOTAL PRODUCTOS:* S/ ${Number(subtotal).toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n\n` +
        `🛵 *CONDICIONES DE DELIVERY:*\n` +
        `📍 Enviaré mi ubicación en tiempo real para calcular el costo del envío.\n` +
        `✅ Cotización sin compromiso.\n` +
        `⚠️ Recuerda que el delivery se paga por adelantado para confirmar el servicio y garantizar la seriedad y responsabilidad del pedido.\n` +
        `✨ Una vez confirmado, coordinamos la entrega.\n\n` +
        `🛵 *DATOS DE ENTREGA EN LIMA:*\n` +
        `• *Dirección:* ${checkoutState.address.line1}\n` +
        `• *Distrito:* ${checkoutState.address.line2}\n` +
        `• *Cliente:* ${checkoutState.address.name || 'Cliente'}\n` +
        `• *Celular:* ${checkoutState.address.phone}${ref}\n\n` +
        `💳 *MÉTODO DE PAGO PREFERIDO:*\n${payStr}\n\n` +
        `Por favor, confirmar para enviar mi ubicación en tiempo real y cotizar el envío del motorizado. ¡Muchas gracias!`;
    }

    const phone = (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.whatsappNumber) ? STORE_CONFIG.whatsappNumber : '51924678780';
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    closeCheckoutDispatchModal();
    if (typeof showToast === 'function') {
      showToast("¡Pedido y formulario enviados a WhatsApp con éxito!");
    }
  }

  // Abrir modal de despacho
  function openCheckoutDispatchModal() {
    loadSavedData();
    const modal = ensureModalElement();

    // Cerrar el drawer del carrito si está abierto
    if (typeof closeCart === 'function') {
      closeCart();
    }

    renderOrderItems();
    selectDispatchMethod(checkoutState.selectedMethod || 'provincia');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Cerrar modal de despacho
  function closeCheckoutDispatchModal() {
    const modal = document.getElementById('dispatchCheckoutModal');
    if (modal) {
      modal.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  // Delegación de eventos para selección infalible de métodos de pago
  document.addEventListener('click', function(e) {
    const card = e.target.closest('.payment-method-card');
    if (!card) return;
    const id = card.id;
    if (id === 'payMethodYape') {
      selectPaymentMethod('yape');
    } else if (id === 'payMethodTransfer') {
      selectPaymentMethod('transferencia');
    } else if (id === 'payMethodContra') {
      selectPaymentMethod('contraentrega');
    }
  });

  // Exponer funciones globales
  window.checkoutState = checkoutState;
  window.saveProvinciaData = saveProvinciaData;
  window.openCheckoutDispatchModal = openCheckoutDispatchModal;
  window.closeCheckoutDispatchModal = closeCheckoutDispatchModal;
  window.selectDispatchMethod = selectDispatchMethod;
  window.selectProvinciaAgency = selectProvinciaAgency;
  window.toggleEditAddress = toggleEditAddress;
  window.saveAddressFromInputs = saveAddressFromInputs;
  window.selectPaymentMethod = selectPaymentMethod;
  window.openShippingMethodologyModal = openShippingMethodologyModal;
  window.closeShippingMethodologyModal = closeShippingMethodologyModal;
  window.continueWithPayment = continueWithPayment;
  window.finalizeOrderViaWhatsApp = continueWithPayment;

  // Interceptar checkoutViaWhatsApp para abrir el modal automáticamente
  window.checkoutViaWhatsApp = function () {
    const cart = (typeof appState !== 'undefined' && Array.isArray(appState.cart)) ? appState.cart : [];
    if (cart.length === 0) {
      if (typeof showToast === 'function') {
        showToast("Tu carrito está vacío. Agrega algún celular o accesorio.");
      } else {
        alert("Tu carrito está vacío.");
      }
      return;
    }
    openCheckoutDispatchModal();
  };

})();

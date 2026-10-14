/* ===================================================
   MACCELL - GTA 5 RADAR MAP INTERACTIVE ENGINE
   Mapa estilo GTA V nítido, oscuro y completamente legible:
   - Capa de mosaicos CartoDB Dark Matter HD (calles, avenidas y nombres nítidos)
   - Blip Waypoint con halo pulsante concéntrico estilo radar militar / GTA V
   - HUD superior con coordenadas y badge táctico
   - Botón de recentrado interactivo
   - Popup oscuro táctico con datos de tienda y enlace GPS
   - Responsive total con ResizeObserver y auto-ajuste de tamaño
   =================================================== */

// Función global para calcular el horario de atención en tiempo real (Zona Horaria Lima UTC-5)
function calcularEstadoAtencionTienda() {
  const now = new Date();
  let fechaLima;
  try {
    const limaStr = now.toLocaleString('en-US', { timeZone: 'America/Lima' });
    fechaLima = new Date(limaStr);
  } catch (e) {
    fechaLima = now;
  }

  const dia = fechaLima.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const horas = fechaLima.getHours();
  const minutos = fechaLima.getMinutes();
  const tiempo = horas + (minutos / 60);

  let abierto = false;
  let horarioTexto = '';
  let proxApertura = '';

  if (dia >= 1 && dia <= 6) {
    // Lunes a Sábado: 9:00 AM a 8:00 PM (9.0 a 20.0)
    abierto = (tiempo >= 9 && tiempo < 20);
    horarioTexto = 'Lun – Sáb: 9am – 8pm';
    if (!abierto) {
      if (tiempo < 9) {
        proxApertura = 'Abre hoy 9:00 AM';
      } else {
        proxApertura = dia === 6 ? 'Abre mañana 10:00 AM' : 'Abre mañana 9:00 AM';
      }
    }
  } else {
    // Domingo: 10:00 AM a 4:00 PM (10.0 a 16.0)
    abierto = (tiempo >= 10 && tiempo < 16);
    horarioTexto = 'Dom: 10am – 4pm';
    if (!abierto) {
      if (tiempo < 10) {
        proxApertura = 'Abre hoy 10:00 AM';
      } else {
        proxApertura = 'Abre mañana 9:00 AM';
      }
    }
  }

  return {
    abierto,
    badgeText: abierto ? 'ABIERTO' : 'CERRADO',
    statusClass: abierto ? 'status-open' : 'status-closed',
    horarioTexto,
    proxApertura
  };
}

// Actualiza los badges de horario en el DOM de la página
function actualizarBadgeHorarioDom(estado) {
  const badgeLive = document.getElementById('badgeHorarioLive');
  if (badgeLive) {
    const statusLabel = estado.abierto ? 'Abierto Ahora' : 'Cerrado Ahora';
    badgeLive.innerHTML = `<span class="status-pulse-dot ${estado.abierto ? '' : 'closed'}"></span> ${statusLabel}`;
    badgeLive.className = `badge-horario-live ${estado.statusClass}`;
  }
}

function initGtaStoreMap(containerId = 'gtaStoreMap') {
  const mapElement = document.getElementById(containerId);
  if (!mapElement) return;

  // Si Leaflet aún no cargó por CDN, reintentar
  if (typeof L === 'undefined') {
    setTimeout(() => initGtaStoreMap(containerId), 150);
    return;
  }

  // Evitar inicializar dos veces sobre el mismo contenedor
  if (mapElement._leaflet_id) {
    if (mapElement._gtaMapInstance) {
      setTimeout(() => mapElement._gtaMapInstance.invalidateSize(), 100);
    }
    return;
  }

  // Coordenadas oficiales de MacCell Perú (C.C. Plaza TEC / Galería Centro Lima)
  const STORE_LAT = -12.05608;
  const STORE_LNG = -77.03698;
  const STORE_COORDS = [STORE_LAT, STORE_LNG];

  // 1. Inicializar mapa Leaflet centrado
  const map = L.map(containerId, {
    center: STORE_COORDS,
    zoom: 16.2,
    zoomSnap: 0.2,
    minZoom: 12,
    maxZoom: 19,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false
  });

  mapElement._gtaMapInstance = map;

  // Control de zoom estilizado abajo a la derecha
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // 2. Capa de mosaicos estilo GTA V: Esri World Dark Gray (Base + Etiquetas HD)
  // Fondo oscuro mate de alta definición, con carreteras en tonos claros y etiquetas 100% legibles
  const esriBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    minZoom: 12,
    attribution: 'Esri, OpenStreetMap'
  });

  const esriLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    minZoom: 12,
    attribution: ''
  });

  esriBase.addTo(map);
  esriLabels.addTo(map);

  // 3. Marcador Blip Waypoint estilo GTA V
  const gtaIcon = L.divIcon({
    className: 'gta-blip-wrapper',
    html: `
      <div class="gta-radar-anchor">
        <div class="gta-radar-halo halo-pulse-1"></div>
        <div class="gta-radar-halo halo-pulse-2"></div>
        <div class="gta-radar-blip">
          <span class="gta-blip-core"></span>
        </div>
        <div class="gta-radar-pin-label">MacCell • Plaza TEC 303</div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -28]
  });

  const marker = L.marker(STORE_COORDS, { icon: gtaIcon }).addTo(map);

  const estado = calcularEstadoAtencionTienda();

  // Actualizar también badge en la tarjeta de información si existe en el DOM
  actualizarBadgeHorarioDom(estado);

  // Popup táctico con Logo Oficial MacCell y Estado de Atención Dinámico
  const popupHtml = `
    <div class="gta-popup-card">
      <div class="gta-popup-header-row">
        <div class="dispatch-store-brand">
          <div class="dispatch-brand-icon-box">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
            </svg>
          </div>
          <div>
            <span class="dispatch-brand-name">MacCell Perú</span>
            <span class="dispatch-brand-tag">TIENDA OFICIAL</span>
          </div>
        </div>
        <span class="gta-popup-status ${estado.statusClass}">
          <span class="status-pulse-dot ${estado.abierto ? '' : 'closed'}"></span>
          ${estado.badgeText}
        </span>
      </div>

      <p class="gta-popup-address">
        <strong>C.C. Plaza TEC – Tienda 303 (3er Piso)</strong><br>
        Av. Inca Garcilaso de la Vega 1358, Cercado de Lima
      </p>

      <div class="gta-popup-info-grid">
        <div class="gta-popup-info-item">
          <span>🕒 Horario:</span>
          <strong>${estado.horarioTexto} ${estado.abierto ? '<span style="color: #34d399; font-weight:800;">(Abierto)</span>' : '<span style="color: #f87171; font-weight:800;">(Cerrado)</span>'}</strong>
        </div>
        <div class="gta-popup-info-item">
          <span>📱 Asesor WhatsApp:</span>
          <strong>924 678 780</strong>
        </div>
      </div>

      <div class="gta-popup-actions">
        <a href="https://maps.google.com/?q=Plaza+TEC+Lima" target="_blank" rel="noopener noreferrer" class="gta-popup-btn-gps">
          <span>Abrir en Google Maps</span>
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
          </svg>
        </a>
      </div>
    </div>
  `;

  marker.bindPopup(popupHtml, {
    className: 'gta-custom-popup',
    closeButton: true,
    autoClose: false,
    closeOnClick: false,
    maxWidth: 310
  });

  // 5. Inyectar botón de recentrado sobre el mapa si no existe
  const parentCol = mapElement.closest('.ubicanos-map-col') || mapElement.parentElement;
  if (parentCol && !parentCol.querySelector('.gta-map-hud-recenter')) {
    const btnRecenter = document.createElement('button');
    btnRecenter.type = 'button';
    btnRecenter.className = 'gta-map-hud-recenter';
    btnRecenter.title = 'Recentrar mapa en Plaza TEC Tienda 303';
    btnRecenter.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="6"/>
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
      </svg>
      <span>Recentrar Tienda</span>
    `;
    btnRecenter.onclick = (e) => {
      e.stopPropagation();
      flyToStore();
    };
    parentCol.appendChild(btnRecenter);
  }

  function flyToStore() {
    map.flyTo(STORE_COORDS, 16.2, {
      animate: true,
      duration: 0.8
    });
    setTimeout(() => {
      marker.openPopup();
    }, 450);
  }

  // 6. Al hacer click en el mapa, reenfocar hacia la tienda
  map.on('click', () => {
    flyToStore();
  });

  // Abrir popup tras cargar los tiles
  setTimeout(() => {
    map.invalidateSize();
    marker.openPopup();
  }, 400);

  // 7. Responsive: ResizeObserver para recalcular tamaño dinámicamente
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(mapElement);
  }

  window.addEventListener('resize', () => {
    map.invalidateSize();
  });
}

function initAllGtaMaps() {
  if (document.getElementById('gtaStoreMap')) initGtaStoreMap('gtaStoreMap');
  if (document.getElementById('gtaStoreMapHome')) initGtaStoreMap('gtaStoreMapHome');
  
  const estado = calcularEstadoAtencionTienda();
  actualizarBadgeHorarioDom(estado);

  // Actualizar periódicamente cada minuto si la página se mantiene abierta
  if (!window._gtaHorarioInterval) {
    window._gtaHorarioInterval = setInterval(() => {
      const e = calcularEstadoAtencionTienda();
      actualizarBadgeHorarioDom(e);
    }, 60000);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllGtaMaps);
} else {
  initAllGtaMaps();
}

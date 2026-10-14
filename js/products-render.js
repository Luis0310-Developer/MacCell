/* ===================================================
   MACCELL - PRODUCTS RENDER (DYNAMIC ENGINE)
   Renderizado dinámico de celulares y accesorios
   =================================================== */

// Helper para obtener la lista de productos
function getProductsList() {
  if (typeof window !== 'undefined' && Array.isArray(window.productos) && window.productos.length > 0) {
    return window.productos;
  }
  if (typeof window !== 'undefined' && Array.isArray(window.PRODUCTS_DATA) && window.PRODUCTS_DATA.length > 0) {
    return window.PRODUCTS_DATA;
  }
  if (typeof productos !== 'undefined' && Array.isArray(productos)) {
    return productos;
  }
  return [];
}

// Helper para obtener la lista de accesorios
function getAccessoriesList() {
  if (typeof window !== 'undefined' && Array.isArray(window.accesorios) && window.accesorios.length > 0) {
    return window.accesorios;
  }
  if (typeof accesorios !== 'undefined' && Array.isArray(accesorios)) {
    return accesorios;
  }
  return [];
}

// Helper para formato de moneda
function formatPrice(amount) {
  return "S/ " + Number(amount || 0).toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Helper para resolver rutas de imágenes según el directorio actual (/pages/ vs raíz)
function resolveAssetPath(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('/')) {
    return path;
  }
  const isPagesDir = typeof window !== 'undefined' && window.location.pathname.includes('/pages/');
  if (isPagesDir) {
    if (path.startsWith('../')) return path;
    return '../' + path;
  } else {
    if (path.startsWith('../')) return path.replace(/^\.\.\//, '');
    return path;
  }
}
if (typeof window !== 'undefined') {
  window.resolveAssetPath = resolveAssetPath;
}

// Estado global de comparación y vista
if (typeof window !== 'undefined') {
  if (typeof window.appState === 'undefined') {
    window.appState = {
      currentCategory: 'all',
      currentRange: 'all',
      searchQuery: '',
      compareList: [],
      isCompareMode: false,
      catalogViewMode: 'grid',
      highlightDiff: false
    };
  } else {
    if (!Array.isArray(window.appState.compareList)) window.appState.compareList = [];
    if (typeof window.appState.isCompareMode === 'undefined') window.appState.isCompareMode = false;
    if (!window.appState.catalogViewMode) window.appState.catalogViewMode = 'grid';
    if (typeof window.appState.highlightDiff === 'undefined') window.appState.highlightDiff = false;
  }
}

function isProductInCompare(id) {
  if (typeof appState === 'undefined' || !Array.isArray(appState.compareList)) return false;
  return appState.compareList.includes(String(id));
}

// ==========================================
// RENDERIZADO DEL CATÁLOGO DE CELULARES
// ==========================================
function renderProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  const allProducts = getProductsList();
  const currentCategory = (typeof appState !== 'undefined' && appState.currentCategory) ? appState.currentCategory : 'all';
  const currentRange = (typeof appState !== 'undefined' && appState.currentRange) ? appState.currentRange : 'all';
  const searchQuery = (typeof appState !== 'undefined' && appState.searchQuery) ? appState.searchQuery.toLowerCase().trim() : '';
  const viewMode = (typeof appState !== 'undefined' && appState.catalogViewMode) ? appState.catalogViewMode : 'grid';

  // Aplicar clase de vista (grid o lista)
  if (viewMode === 'list') {
    container.classList.add('list-view');
  } else {
    container.classList.remove('list-view');
  }

  // Filtrado de productos
  let filtered = allProducts.filter(prod => {
    const brandName = (prod.brand || prod.marca || '').toLowerCase();
    const categoryName = (prod.category || '').toLowerCase();
    const matchCategory = currentCategory === 'all' || 
      categoryName === currentCategory.toLowerCase() ||
      brandName === currentCategory.toLowerCase();

    const prodRange = (prod.range || '').toLowerCase();
    const matchRange = currentRange === 'all' || prodRange === currentRange.toLowerCase();

    const prodName = (prod.name || prod.nombre || '').toLowerCase();
    const proc = (prod.specsObj && prod.specsObj.processor ? prod.specsObj.processor : (Array.isArray(prod.specs) ? prod.specs.join(' ') : '')).toLowerCase();
    const matchSearch = searchQuery === '' || 
      prodName.includes(searchQuery) ||
      brandName.includes(searchQuery) ||
      proc.includes(searchQuery);

    return matchCategory && matchRange && matchSearch;
  });

  // Actualizar contador en la barra de controles
  const countEl = document.getElementById('catalogProductsCount');
  if (countEl) {
    countEl.innerHTML = `Mostrando <strong>${filtered.length}</strong> smartphone${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted, #94a3b8);">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin: 0 auto 12px; display: block; color: var(--text-dim, #64748b);">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
        </svg>
        <h3 style="font-size: 1.2rem; color: #ffffff; margin-bottom: 6px;">No encontramos celulares con esos criterios</h3>
        <p style="font-size: 0.9rem; color: #94a3b8;">Prueba buscando otra marca o limpiando los filtros.</p>
        <button class="pill-btn" onclick="resetFilters()" style="margin-top: 14px; background: var(--accent-cyan, #00d2ff); color: #0b0f19; font-weight: 700; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;">Ver todos los equipos</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => buildProductCardHtml(prod)).join('');
}

// Renderizado de celulares destacados en la vista de Inicio
function renderFeaturedProducts() {
  const container = document.getElementById('featuredProductsContainer');
  if (!container) return;

  const allProducts = getProductsList();
  const featured = allProducts.slice(0, 4);
  container.innerHTML = featured.map(prod => buildProductCardHtml(prod)).join('');
}

// Plantilla HTML de cada Tarjeta de Celular (con opción de Comparar)
function buildProductCardHtml(prod) {
  const price = prod.price || prod.precio || 0;
  const originalPrice = prod.originalPrice || price;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const brand = prod.brand || prod.marca || '';
  const name = prod.name || prod.nombre || '';
  const rawImage = prod.image || prod.imagen || '';
  const image = resolveAssetPath(rawImage);
  const fallbackLogo = resolveAssetPath('assets/img/ui/Logo.jpeg');
  const id = prod.id;
  const inCompare = isProductInCompare(id);
  const isCompareMode = (typeof appState !== 'undefined' && appState.isCompareMode);
  const viewMode = (typeof appState !== 'undefined' && appState.catalogViewMode) ? appState.catalogViewMode : 'grid';

  // Key specs display
  let specsHtml = '';
  if (Array.isArray(prod.specs)) {
    specsHtml = prod.specs.slice(0, 4).map(s => `<span class="spec-pill">${s}</span>`).join('');
  } else if (prod.specsObj) {
    specsHtml = `
      <span class="spec-pill">${prod.specsObj.storage || ''}</span>
      <span class="spec-pill">${prod.specsObj.ram || ''}</span>
      <span class="spec-pill">${(prod.specsObj.screen || '').split(' ')[0]}</span>
      <span class="spec-pill">${(prod.specsObj.processor || '').split(' ')[0]}</span>
    `;
  }

  return `
    <div class="product-card ${inCompare ? 'in-compare-active' : ''} ${viewMode === 'list' ? 'list-view-card' : ''}" data-id="${id}">
      <!-- Badges -->
      <div class="product-badge-stack">
        ${prod.badge ? `<span class="product-badge badge-${prod.badgeType || 'new'}">${prod.badge} ${discount > 0 ? `-${discount}%` : ''}</span>` : ''}
        <span class="product-badge badge-garantia">Garantía 1 Año</span>
      </div>

      <!-- Control de Comparar en Tarjeta -->
      <div class="product-compare-checkbox-wrap ${isCompareMode ? 'visible' : ''}" onclick="event.stopPropagation()">
        <label class="compare-checkbox-label" title="Comparar ${name}">
          <input type="checkbox" class="compare-checkbox-input" value="${id}" ${inCompare ? 'checked' : ''} onchange="toggleProductInCompare('${id}', this.checked)">
          <span class="compare-checkbox-custom">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span class="compare-checkbox-text">Comparar</span>
        </label>
      </div>

      <!-- Quick View Button -->
      <button class="product-quick-view-btn" onclick="openQuickView('${id}')" title="Vista Rápida y Detalles">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
      </button>

      <!-- Product Image -->
      <div class="product-image-wrap" onclick="openQuickView('${id}')" style="cursor: pointer;">
        <img src="${image}" alt="${name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='${fallbackLogo}'">
      </div>

      <div class="product-card-body-content">
        <!-- Brand & Title -->
        <span class="product-brand">${brand}</span>
        <h3 class="product-title" onclick="openQuickView('${id}')" style="cursor: pointer;" title="${name}">${name}</h3>

        <!-- Key Specs -->
        <div class="product-specs-list">
          ${specsHtml}
        </div>

        <!-- Price -->
        <div class="product-price-box">
          <div>
            <span class="price-main">${formatPrice(price)}</span>
            ${originalPrice > price ? `<span class="price-old">${formatPrice(originalPrice)}</span>` : ''}
          </div>
        </div>

        <!-- Action Button -->
        <div class="product-actions">
          <button class="btn-card-cart" onclick="addToCart('${id}')" title="Agregar ${name} al Carrito">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
            </svg>
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// MÓDULO DE COMPARACIÓN DE CELULARES
// ==========================================

function toggleCompareMode(enable) {
  if (typeof appState !== 'undefined') {
    appState.isCompareMode = Boolean(enable);
  }
  
  const sw = document.getElementById('compareToggleSwitch');
  if (sw) sw.checked = Boolean(enable);

  const container = document.getElementById('productsContainer');
  if (container) {
    if (enable) {
      container.classList.add('compare-mode-active');
    } else {
      container.classList.remove('compare-mode-active');
    }
  }

  // Mostrar u ocultar casillas de comparar en tarjetas
  document.querySelectorAll('.product-compare-checkbox-wrap').forEach(el => {
    if (enable) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });

  if (enable && typeof showToast === 'function') {
    showToast("Modo Comparar activado: marca de 2 a 4 celulares.");
  }

  updateFloatingCompareBar();
}

function toggleProductInCompare(productId, isChecked) {
  if (typeof appState === 'undefined') return;
  if (!Array.isArray(appState.compareList)) appState.compareList = [];

  const idStr = String(productId);

  if (isChecked) {
    if (appState.compareList.length >= 4) {
      if (typeof showToast === 'function') {
        showToast("⚠️ Máximo 4 celulares para comparar a la vez.");
      }
      document.querySelectorAll(`.compare-checkbox-input[value="${idStr}"]`).forEach(cb => cb.checked = false);
      return;
    }
    if (!appState.compareList.includes(idStr)) {
      appState.compareList.push(idStr);
    }
    if (!appState.isCompareMode) {
      toggleCompareMode(true);
    }
  } else {
    appState.compareList = appState.compareList.filter(id => id !== idStr);
  }

  // Resaltar tarjeta seleccionada
  document.querySelectorAll(`.product-card[data-id="${idStr}"]`).forEach(card => {
    if (isChecked) card.classList.add('in-compare-active');
    else card.classList.remove('in-compare-active');
  });

  updateFloatingCompareBar();
}

function removeFromCompare(productId) {
  toggleProductInCompare(productId, false);
  document.querySelectorAll(`.compare-checkbox-input[value="${productId}"]`).forEach(cb => {
    cb.checked = false;
  });
  const modal = document.getElementById('compareModal');
  if (modal && modal.classList.contains('active')) {
    if (appState.compareList.length === 0) {
      closeCompareModal();
    } else {
      renderCompareModalContent();
    }
  }
}

function clearCompare() {
  if (typeof appState !== 'undefined') {
    appState.compareList = [];
  }
  document.querySelectorAll('.compare-checkbox-input').forEach(cb => cb.checked = false);
  document.querySelectorAll('.product-card').forEach(card => card.classList.remove('in-compare-active'));
  updateFloatingCompareBar();
  closeCompareModal();
  if (typeof showToast === 'function') {
    showToast("Comparación limpiada");
  }
}

function updateFloatingCompareBar() {
  const bar = document.getElementById('floatingCompareBar');
  const countEl = document.getElementById('compareCountNum');
  const itemsContainer = document.getElementById('floatingCompareItems');
  const btnCompareNow = document.getElementById('btnCompareNow');
  if (!bar) return;

  const count = (appState && Array.isArray(appState.compareList)) ? appState.compareList.length : 0;
  if (countEl) countEl.textContent = count;

  if (count === 0 && (!appState || !appState.isCompareMode)) {
    bar.classList.remove('active');
    return;
  }

  if (count === 0 && appState && appState.isCompareMode) {
    bar.classList.add('active');
    if (itemsContainer) {
      itemsContainer.innerHTML = `
        <div class="floating-compare-empty-prompt">
          Selecciona de 2 a 4 celulares para iniciar la comparativa
        </div>
      `;
    }
    if (btnCompareNow) {
      btnCompareNow.disabled = true;
      btnCompareNow.classList.add('disabled');
      btnCompareNow.title = "Selecciona al menos 2 celulares";
    }
    return;
  }

  bar.classList.add('active');

  const allProducts = getProductsList();
  const selectedProducts = appState.compareList.map(id => allProducts.find(p => String(p.id) === String(id))).filter(Boolean);

  if (itemsContainer) {
    let itemsHtml = selectedProducts.map(p => {
      const img = resolveAssetPath(p.image || p.imagen || '');
      const name = p.name || p.nombre || '';
      return `
        <div class="floating-compare-thumb-slot filled" title="${name}">
          <img src="${img}" alt="${name}">
          <button class="btn-remove-thumb" onclick="removeFromCompare('${p.id}')" title="Quitar">✕</button>
        </div>
      `;
    }).join('');

    for (let i = selectedProducts.length; i < 4; i++) {
      itemsHtml += `
        <div class="floating-compare-thumb-slot empty" title="Espacio disponible (+)">
          <span>+</span>
        </div>
      `;
    }

    itemsContainer.innerHTML = itemsHtml;
  }

  if (btnCompareNow) {
    if (count >= 2) {
      btnCompareNow.disabled = false;
      btnCompareNow.classList.remove('disabled');
      btnCompareNow.innerHTML = `
        <span>Comparar Equipos (${count})</span>
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
        </svg>
      `;
      btnCompareNow.title = `Comparar ${count} celulares`;
    } else {
      btnCompareNow.disabled = true;
      btnCompareNow.classList.add('disabled');
      btnCompareNow.innerHTML = `
        <span>Comparar Equipos</span>
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
        </svg>
      `;
      btnCompareNow.title = "Selecciona al menos 2 celulares para comparar";
    }
  }
}

function openCompareModal() {
  if (!appState || !Array.isArray(appState.compareList) || appState.compareList.length < 2) {
    if (typeof showToast === 'function') {
      showToast("Selecciona al menos 2 celulares para ver la comparativa.");
    }
    return;
  }

  const modal = document.getElementById('compareModal');
  if (!modal) return;

  renderCompareModalContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
  const modal = document.getElementById('compareModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function toggleHighlightDifferences() {
  if (typeof appState === 'undefined') return;
  appState.highlightDiff = !appState.highlightDiff;
  const btn = document.getElementById('btnToggleHighlightDiff');
  if (btn) {
    if (appState.highlightDiff) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
  renderCompareModalContent();
}

function setCatalogViewMode(mode) {
  if (typeof appState !== 'undefined') {
    appState.catalogViewMode = mode;
  }

  const btnGrid = document.getElementById('btnViewGrid');
  const btnList = document.getElementById('btnViewList');
  const container = document.getElementById('productsContainer');

  if (btnGrid && btnList) {
    if (mode === 'list') {
      btnList.classList.add('active');
      btnGrid.classList.remove('active');
    } else {
      btnGrid.classList.add('active');
      btnList.classList.remove('active');
    }
  }

  if (container) {
    if (mode === 'list') {
      container.classList.add('list-view');
    } else {
      container.classList.remove('list-view');
    }
  }

  renderProducts();
}

function renderCompareModalContent() {
  const body = document.getElementById('compareModalBody');
  if (!body) return;

  const allProducts = getProductsList();
  const selected = appState.compareList.map(id => allProducts.find(p => String(p.id) === String(id))).filter(Boolean);

  if (selected.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: #94a3b8;">
        <h3>No hay celulares seleccionados para comparar</h3>
        <p>Regresa al catálogo y marca los celulares que deseas comparar.</p>
      </div>
    `;
    return;
  }

  const fallbackLogo = resolveAssetPath('assets/img/ui/Logo.jpeg');

  const specRows = [
    { title: "Marca & Gama", icon: "🏷️", get: p => `${p.brand || p.marca} • Gama ${(p.range || 'alta').toUpperCase()}` },
    { title: "Precio Oferta", icon: "💰", get: p => `<strong style="color: #4f46e5; font-size: 1.1rem;">${formatPrice(p.price || p.precio)}</strong>` },
    { title: "Precio Regular", icon: "🏷️", get: p => (p.originalPrice > (p.price || p.precio)) ? `<span style="text-decoration: line-through; color: #94a3b8;">${formatPrice(p.originalPrice)}</span>` : 'Mismo precio' },
    { title: "Calificación", icon: "⭐", get: p => `${p.rating || 4.9} / 5 (${p.reviewsCount || 40} opiniones)` },
    { title: "Pantalla", icon: "📱", get: p => (p.specsObj && p.specsObj.screen) ? p.specsObj.screen : (p.specs ? p.specs[3] : '-') },
    { title: "Procesador", icon: "⚡", get: p => (p.specsObj && p.specsObj.processor) ? p.specsObj.processor : (p.specs ? p.specs[0] : '-') },
    { title: "Memoria RAM", icon: "💾", get: p => (p.specsObj && p.specsObj.ram) ? p.specsObj.ram : (p.specs ? p.specs[1] : '-') },
    { title: "Almacenamiento", icon: "🗄️", get: p => (p.specsObj && p.specsObj.storage) ? p.specsObj.storage : '-' },
    { title: "Cámaras", icon: "📸", get: p => (p.specsObj && p.specsObj.cameras) ? p.specsObj.cameras : (p.specs ? p.specs[2] : '-') },
    { title: "Batería y Carga", icon: "🔋", get: p => (p.specsObj && p.specsObj.battery) ? p.specsObj.battery : '-' },
    { title: "Colores Disponibles", icon: "🎨", get: p => (p.colors && p.colors.length > 0) ? p.colors.map(c => `<span class="compare-color-chip">${c}</span>`).join(' ') : 'Original' },
    { title: "Garantía & Estado", icon: "🛡️", get: p => `1 Año Oficial • Caja Sellada • Libre de Fábrica` }
  ];

  const highlight = appState.highlightDiff;

  body.innerHTML = `
    <div class="compare-mobile-scroll-hint">👈 Desliza horizontalmente para comparar todos los equipos 👉</div>
    <div class="compare-table-responsive-wrapper">
      <table class="compare-table">
        <thead>
          <tr>
            <th class="compare-spec-col-header">
              <span class="compare-header-label">Modelos</span>
              <span class="compare-header-count">${selected.length} seleccionados</span>
            </th>
            ${selected.map(p => {
              const img = resolveAssetPath(p.image || p.imagen || '');
              const price = p.price || p.precio || 0;
              const origPrice = p.originalPrice || price;
              const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
              return `
                <th class="compare-product-col-header">
                  <button class="btn-remove-col" onclick="removeFromCompare('${p.id}')" title="Quitar de la comparativa">
                    ✕ Quitar
                  </button>
                  <div class="compare-header-img-wrap" onclick="openQuickView('${p.id}'); closeCompareModal();">
                    <img src="${img}" alt="${p.name}" onerror="this.onerror=null; this.src='${fallbackLogo}'">
                  </div>
                  <span class="compare-header-brand">${p.brand || p.marca}</span>
                  <h4 class="compare-header-name" onclick="openQuickView('${p.id}'); closeCompareModal();" title="${p.name}">${p.name || p.nombre}</h4>
                  <div class="compare-header-price">
                    <span class="price-current">${formatPrice(price)}</span>
                    ${discount > 0 ? `<span class="discount-pill">-${discount}%</span>` : ''}
                  </div>
                </th>
              `;
            }).join('')}
          </tr>
        </thead>
        <tbody>
          ${specRows.map(row => {
            const values = selected.map(p => row.get(p));
            const isDifferent = new Set(values).size > 1;
            const rowClass = (highlight && isDifferent) ? 'diff-highlight' : '';

            return `
              <tr class="${rowClass}">
                <td class="compare-spec-name">
                  <span class="spec-row-icon">${row.icon}</span>
                  <span>${row.title}</span>
                  ${(isDifferent && highlight) ? `<span class="diff-tag">Difiere</span>` : ''}
                </td>
                ${values.map(val => `
                  <td class="compare-cell">
                    ${val}
                  </td>
                `).join('')}
              </tr>
            `;
          }).join('')}

          <!-- FILA DE ACCIONES Y COMPRA -->
          <tr class="compare-actions-row">
            <td class="compare-spec-name" style="font-weight: 800;">
              🛒 Comprar / Despacho
            </td>
            ${selected.map(p => `
              <td class="compare-cell compare-action-cell">
                <button class="btn-compare-action-cart" onclick="addToCart('${p.id}')">
                  🛒 Agregar al Carrito
                </button>
                <button class="btn-compare-action-wa" onclick="buyViaWhatsApp('${p.id}')">
                  💬 Pedir por WhatsApp
                </button>
                <button class="btn-compare-action-detail" onclick="openQuickView('${p.id}'); closeCompareModal();">
                  🔍 Ver Detalle Completo
                </button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ==========================================
// RENDERIZADO DINÁMICO DE ACCESORIOS (BORDES NEGROS Y MOVIMIENTO CONTINUO)
// ==========================================
function renderAccessories() {
  const track = document.getElementById('accesoriosTrack');
  if (!track) return;

  const items = getAccessoriesList();
  if (items.length === 0) return;

  // Renderizar las tarjetas con el formato visual de recuadros negros elegantes
  track.innerHTML = items.map(acc => buildAccessoryCardHtml(acc)).join('');

  // Inicializar el movimiento continuo infinito si la función existe
  if (typeof initAccessoriesMotion === 'function') {
    initAccessoriesMotion();
  }
}

function buildAccessoryCardHtml(acc) {
  const price = acc.price || acc.precio || 0;
  const originalPrice = acc.originalPrice || price;
  const name = acc.name || acc.nombre || '';
  const rawImage = acc.image || acc.imagen || '';
  const image = resolveAssetPath(rawImage);
  const brand = acc.brand || acc.marca || (name.toUpperCase().includes('APPLE') ? 'Apple' : name.toUpperCase().includes('SAMSUNG') ? 'Samsung' : name.toUpperCase().includes('HONOR') ? 'Honor' : name.toUpperCase().includes('BUDS 6') ? 'Xiaomi' : 'Accesorio');
  const badge = acc.badge || '100% ORIGINAL';
  const id = acc.id;

  return `
    <div class="accesorio-card-box" data-acc-id="${id}">
      <span class="accesorio-pill-tag">${badge}</span>
      <div class="accesorio-img-wrap">
        <img src="${image}" alt="${name}" class="accesorio-img" loading="lazy" onerror="this.onerror=null; this.src='${image.startsWith('../') ? '../' : ''}assets/img/ui/Logo.jpeg'">
      </div>
      <div class="accesorio-card-body">
        <span class="accesorio-brand">${brand}</span>
        <h4 class="accesorio-name" title="${name}">${name}</h4>
        <div class="accesorio-price-row">
          <span class="accesorio-price">${formatPrice(price)}</span>
          ${originalPrice > price ? `<span class="accesorio-old-price">${formatPrice(originalPrice)}</span>` : ''}
        </div>
        <div class="accesorio-actions-row">
          <button class="btn-accesorio-cart" onclick="addToCart('${id}', true)" title="Agregar al carrito">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            <span>Agregar</span>
          </button>
          <button class="btn-accesorio-ws" onclick="pedirAccesorioWhatsApp('${name.replace(/'/g, "\\'")}', '${price}')" title="Pedir por WhatsApp">
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.7c.96.523 1.874.801 2.79.8 3.183 0 5.768-2.587 5.77-5.766.001-3.182-2.585-5.769-5.768-5.785m3.411 8.163c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.18-.538-1.503-.623-2.464-2.148-2.538-2.247-.074-.099-.607-.808-.607-1.542s.385-1.096.522-1.246c.137-.15.299-.187.4-.187.1 0 .201.002.289.006.092.004.215-.035.336.257.126.302.43 1.049.467 1.125.037.075.062.164.013.264-.05.099-.074.163-.148.251-.074.088-.157.197-.224.264-.075.074-.153.155-.066.305.087.15.385.636.827 1.03.568.506 1.048.663 1.198.738.15.075.237.062.324-.038.087-.1.374-.435.474-.585.1-.15.2-.125.337-.075.137.05.87.41 1.02.485.15.075.25.112.287.175.037.062.037.362-.107.767"/></svg>
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// CONTROL DE FILTROS & BÚSQUEDA
// ==========================================
function filterByBrand(brand, element) {
  const container = document.getElementById('productsContainer');
  if (!container) {
    // Si no estamos en la página del catálogo, redirigir al catálogo con el parámetro de marca
    const isPagesDir = window.location.pathname.includes('/pages/');
    const targetUrl = (isPagesDir ? 'catalogo.html' : 'pages/catalogo.html') + (brand && brand !== 'all' ? `?marca=${encodeURIComponent(brand)}` : '');
    window.location.href = targetUrl;
    return;
  }

  if (typeof appState !== 'undefined') {
    appState.currentCategory = brand;
  }

  document.querySelectorAll('.brand-chip').forEach(el => el.classList.remove('active'));
  if (element) {
    element.classList.add('active');
  } else {
    document.querySelectorAll('.brand-chip').forEach(el => {
      const brandData = el.dataset.brand || '';
      const txt = el.textContent.toLowerCase();
      if ((brand === 'all' && (brandData === 'all' || txt.includes('todos'))) ||
          (brand === 'apple' && (brandData === 'apple' || txt.includes('apple') || txt.includes('iphone'))) ||
          (brand !== 'all' && (brandData === brand.toLowerCase() || txt.includes(brand.toLowerCase())))) {
        el.classList.add('active');
      }
    });
  }

  renderProducts();

  // Scroll suave al catálogo si estamos lejos
  const catEl = document.getElementById('catalogo') || document.getElementById('productsContainer');
  if (catEl && window.scrollY > catEl.offsetTop + 400) {
    catEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Inicializar filtros basados en parámetros de URL (?marca=apple, ?q=samsung, etc.)
function initUrlFilters() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const brandParam = params.get('marca') || params.get('brand');
  const queryParam = params.get('q') || params.get('search');
  const rangeParam = params.get('gama') || params.get('range');

  if (brandParam) {
    filterByBrand(brandParam);
  }
  if (rangeParam) {
    filterByRange(rangeParam);
  }
  if (queryParam) {
    if (typeof appState !== 'undefined') {
      appState.searchQuery = queryParam;
    }
    const searchInp = document.getElementById('mainSearchInput');
    if (searchInp) searchInp.value = queryParam;
    renderProducts();
  }
}


function filterByRange(range, element) {
  if (typeof appState !== 'undefined') {
    appState.currentRange = range;
  }
  
  document.querySelectorAll('.range-pills .pill-btn, .range-chip').forEach(el => el.classList.remove('active'));
  if (element) element.classList.add('active');

  renderProducts();
}

function resetFilters() {
  if (typeof appState !== 'undefined') {
    appState.currentCategory = 'all';
    appState.currentRange = 'all';
    appState.searchQuery = '';
  }

  const searchInp = document.getElementById('mainSearchInput');
  if (searchInp) searchInp.value = '';

  document.querySelectorAll('.brand-chip').forEach(el => {
    if ((el.dataset.brand && el.dataset.brand === 'all') || el.textContent.includes('Todos')) el.classList.add('active');
    else el.classList.remove('active');
  });

  document.querySelectorAll('.range-pills .pill-btn, .range-chip').forEach(el => {
    if (el.textContent.includes('Todas')) el.classList.add('active');
    else el.classList.remove('active');
  });

  renderProducts();
}

// Exponer en window para compatibilidad directa desde eventos inline HTML
if (typeof window !== 'undefined') {
  window.renderProducts = renderProducts;
  window.renderFeaturedProducts = renderFeaturedProducts;
  window.renderAccessories = renderAccessories;
  window.buildProductCardHtml = buildProductCardHtml;
  window.buildAccessoryCardHtml = buildAccessoryCardHtml;
  window.filterByBrand = filterByBrand;
  window.filterByRange = filterByRange;
  window.resetFilters = resetFilters;
  window.initUrlFilters = initUrlFilters;
  window.getProductsList = getProductsList;
  window.getAccessoriesList = getAccessoriesList;

  // Comparador de productos & Modos de vista
  window.toggleCompareMode = toggleCompareMode;
  window.toggleProductInCompare = toggleProductInCompare;
  window.removeFromCompare = removeFromCompare;
  window.clearCompare = clearCompare;
  window.updateFloatingCompareBar = updateFloatingCompareBar;
  window.openCompareModal = openCompareModal;
  window.closeCompareModal = closeCompareModal;
  window.toggleHighlightDifferences = toggleHighlightDifferences;
  window.setCatalogViewMode = setCatalogViewMode;
  window.renderCompareModalContent = renderCompareModalContent;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUrlFilters);
  } else {
    initUrlFilters();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderProducts,
    renderFeaturedProducts,
    renderAccessories,
    buildProductCardHtml,
    buildAccessoryCardHtml,
    filterByBrand,
    filterByRange,
    resetFilters,
    toggleCompareMode,
    toggleProductInCompare,
    removeFromCompare,
    clearCompare,
    updateFloatingCompareBar,
    openCompareModal,
    closeCompareModal,
    toggleHighlightDifferences,
    setCatalogViewMode,
    renderCompareModalContent
  };
}

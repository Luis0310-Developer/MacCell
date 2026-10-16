/* ===================================================
   MACCELL - MAIN JAVASCRIPT (MODULAR ARCHITECTURE)
   Lógica general, interactividad, carrito y WhatsApp
   =================================================== */

// CONFIGURACIÓN DE LA TIENDA
const STORE_CONFIG = {
  storeName: "MacCell Perú",
  whatsappNumber: "51924678780",
  address: "C.C. Plaza TEC - Av. Garcilaso de la Vega 1358, Cercado de Lima, Tienda 303",
  workingHours: "Lun - Sáb: 10:00 AM - 8:00 PM"
};

// ESTADO GLOBAL DE LA APLICACIÓN
const appState = {
  cart: [],
  currentCategory: 'all',
  currentRange: 'all',
  searchQuery: '',
  quickViewProduct: null
};

// Helper universal para resolver rutas de assets entre páginas raíz y subpáginas (/pages/)
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

// ==========================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Cargar carrito de localStorage
  loadCart();

  // Renderizar catálogo dinámico si el contenedor existe
  if (typeof renderProducts === 'function') {
    renderProducts();
  }
  if (typeof renderFeaturedProducts === 'function') {
    renderFeaturedProducts();
  }
  if (typeof renderAccessories === 'function') {
    renderAccessories();
  }

  // Inicializar slider hero si existe
  initHeroSlider();

  // Inicializar buscador en tiempo real
  initSearch();

  // Inicializar carrusel infinito de accesorios
  initAccessoriesMotion();

  // Inicializar animaciones Lottie
  initLottieIcons();

  // Inicializar accesos discretos al panel de administración
  initSecretAdminAccess();

  // Inicializar PWA y Service Worker
  initPwa();
});

// ==========================================
// CONTROL DEL CARRITO DE COMPRAS
// ==========================================
function loadCart() {
  try {
    const saved = localStorage.getItem('maccell_cart');
    if (saved) {
      appState.cart = JSON.parse(saved);
      updateCartBadge();
    }
  } catch (e) {
    console.error('Error al cargar carrito:', e);
    appState.cart = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem('maccell_cart', JSON.stringify(appState.cart));
  } catch (e) {
    console.error('Error al guardar carrito:', e);
  }
}

function addToCart(productId, isAccessory = false) {
  let product = null;

  if (isAccessory && typeof window.accesorios !== 'undefined') {
    product = window.accesorios.find(a => String(a.id) === String(productId));
  }

  if (!product && typeof window.productos !== 'undefined') {
    product = window.productos.find(p => String(p.id) === String(productId));
  }

  if (!product) return;

  // Obtener color seleccionado si fue marcado en la tarjeta o modal de detalle
  let selectedColor = (product.colors && product.colors.length > 0) ? product.colors[0] : 'Original';
  const activeCard = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (activeCard && activeCard.dataset.selectedColor) {
    selectedColor = activeCard.dataset.selectedColor;
  } else if (window._currentSelectedColor && String(window._currentSelectedProductId) === String(productId)) {
    selectedColor = window._currentSelectedColor;
  }

  const existing = appState.cart.find(item => String(item.id) === String(productId) && (item.selectedColor || '') === selectedColor);

  if (existing) {
    existing.qty += 1;
  } else {
    appState.cart.push({
      id: product.id,
      name: product.name || product.nombre,
      price: product.price || product.precio || 0,
      image: product.image || product.imagen || '',
      selectedColor: selectedColor,
      qty: 1
    });
  }

  saveCart();
  updateCartBadge();
  animateFlyToCart(productId);
  showToast(`¡${(product.name || product.nombre).split(' ').slice(0, 3).join(' ')} agregado al carrito!`);
  
  // Abrir carrito tras una breve pausa para permitir apreciar la trayectoria de vuelo
  setTimeout(() => {
    openCart();
  }, 420);
}

function animateFlyToCart(productId) {
  try {
    const card = document.querySelector(`.product-card[data-id="${productId}"], .accesorio-card[data-id="${productId}"]`);
    const targetCart = document.getElementById('lottieHeaderCart') || document.querySelector('.casu-cart-widget') || document.getElementById('bottomNavCartBtn');
    if (!card || !targetCart) return;

    const img = card.querySelector('img');
    if (!img) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = targetCart.getBoundingClientRect();

    const ghost = img.cloneNode(true);
    ghost.className = 'fly-cart-ghost';
    ghost.style.left = `${imgRect.left}px`;
    ghost.style.top = `${imgRect.top}px`;
    ghost.style.width = `${imgRect.width}px`;
    ghost.style.height = `${imgRect.height}px`;
    ghost.style.opacity = '1';
    ghost.style.transform = 'scale(1)';

    document.body.appendChild(ghost);

    requestAnimationFrame(() => {
      const targetX = cartRect.left + (cartRect.width / 2) - 16;
      const targetY = cartRect.top + (cartRect.height / 2) - 16;
      ghost.style.left = `${targetX}px`;
      ghost.style.top = `${targetY}px`;
      ghost.style.width = '32px';
      ghost.style.height = '32px';
      ghost.style.opacity = '0.2';
      ghost.style.transform = 'scale(0.2) rotate(15deg)';
    });

    setTimeout(() => {
      ghost.remove();
      const badge = document.getElementById('cartBadge') || document.getElementById('bottomCartBadge');
      if (badge) {
        badge.classList.remove('cart-badge-bounce');
        void badge.offsetWidth;
        badge.classList.add('cart-badge-bounce');
      }
    }, 650);
  } catch (e) {
    console.warn('[FlyToCart] anim notice:', e);
  }
}

function updateCartQty(productId, delta) {
  const item = appState.cart.find(i => String(i.id) === String(productId));
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    renderCartItems();
    updateCartBadge();
  }
}

function removeFromCart(productId) {
  appState.cart = appState.cart.filter(i => String(i.id) !== String(productId));
  saveCart();
  renderCartItems();
  updateCartBadge();
  showToast("Producto eliminado del carrito");
}

function updateCartBadge() {
  const count = appState.cart.reduce((acc, item) => acc + item.qty, 0);
  const total = appState.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // Badge en Header
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = count;

  // Badge en Barra Móvil Inferior
  const bottomBadge = document.getElementById('bottomCartBadge');
  if (bottomBadge) bottomBadge.textContent = count;

  // Monto en soles en Header
  const headerTotal = document.getElementById('headerCartTotal');
  if (headerTotal) headerTotal.textContent = `S/ ${total.toFixed(2)}`;
}

function openCart() {
  renderCartItems();
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  if (!container) return;

  // Si existía la barra previa de envío gratis, removerla
  const shippingBox = document.getElementById('cartShippingBox');
  if (shippingBox) {
    shippingBox.remove();
  }

  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 10px; color: var(--text-muted);">
        <svg width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin: 0 auto 10px; display: block; color: var(--text-dim);">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
        </svg>
        <p style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">Tu carrito está vacío</p>
        <p style="font-size: 0.85rem;">Explora los celulares originales con garantía oficial.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "S/ 0";
    if (totalEl) totalEl.textContent = "S/ 0";
    return;
  }

  let total = 0;
  container.innerHTML = appState.cart.map(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    const itemImage = resolveAssetPath(item.image);
    const fallbackLogo = resolveAssetPath('assets/img/ui/Logo.jpeg');

    return `
      <div class="cart-item">
        <img src="${itemImage}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='${fallbackLogo}'">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Color: ${item.selectedColor || 'Original'}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="btn-qty" onclick="updateCartQty('${item.id}', -1)">-</button>
              <span class="qty-num">${item.qty}</span>
              <button class="btn-qty" onclick="updateCartQty('${item.id}', 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart('${item.id}')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
              </svg>
              Quitar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = formatPrice(total);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

// ==========================================
// CHECKOUT DIRECTO: MODAL DE DESPACHO & PAGO
// ==========================================
function checkoutViaWhatsApp() {
  if (appState.cart.length === 0) {
    showToast("Tu carrito está vacío. Agrega algún celular o accesorio.");
    return;
  }

  // Si el modal de despacho ya está disponible, abrirlo directamente
  if (typeof openCheckoutDispatchModal === 'function') {
    openCheckoutDispatchModal();
    return;
  }

  // Carga asíncrona segura si el script aún no estuviera listo
  const isPagesDir = typeof window !== 'undefined' && window.location.pathname.includes('/pages/');
  const scriptPath = isPagesDir ? '../js/checkout-modal.js' : 'js/checkout-modal.js';
  const script = document.createElement('script');
  script.src = scriptPath;
  script.onload = function () {
    if (typeof openCheckoutDispatchModal === 'function') {
      openCheckoutDispatchModal();
    }
  };
  document.head.appendChild(script);
}

function buyViaWhatsApp(productId) {
  let prod = null;
  if (typeof window.productos !== 'undefined') {
    prod = window.productos.find(p => String(p.id) === String(productId));
  }
  if (!prod) return;

  const price = prod.price || prod.precio || 0;
  const name = prod.name || prod.nombre;

  const message = `¡Hola ${STORE_CONFIG.storeName}! 👋\n` +
    `Estoy interesado(a) en comprar este equipo visto en su catálogo web:\n\n` +
    `📱 *${name}*\n` +
    `💰 *Precio Especial:* ${formatPrice(price)}\n` +
    `🛡️ *Garantía:* 1 Año Oficial\n` +
    `📦 *Disponibilidad:* ¿Tienen stock disponible para entrega hoy en Lima o envío a provincia?\n\n` +
    `¡Muchas gracias!`;

  const url = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function pedirAccesorioWhatsApp(nombre, precio) {
  const message = `¡Hola ${STORE_CONFIG.storeName}! 👋\n` +
    `Deseo consultar la disponibilidad y comprar el siguiente accesorio original:\n\n` +
    `🎧 *Accesorio:* ${nombre}\n` +
    `💰 *Precio:* ${formatPrice(precio)}\n\n` +
    `¿Tienen stock disponible para entrega hoy?`;

  const url = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==========================================
// MODAL VISTA RÁPIDA / DETALLES DE PRODUCTO & CELULARES SIMILARES
// ==========================================

function renderProductStarsSvg(rating = 4.9) {
  const rounded = Math.round(Number(rating) || 5);
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= rounded;
    const opacity = isFilled ? '1' : '0.35';
    starsHtml += `
      <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#615fff" fill-opacity="${opacity}" />
      </svg>
    `;
  }
  return starsHtml;
}

function getProductGallery(prod) {
  if (Array.isArray(prod.gallery) && prod.gallery.length >= 4) {
    return prod.gallery.map(img => resolveAssetPath(img));
  }
  const main = resolveAssetPath(prod.image || prod.imagen || '');
  return [main, main, main, main];
}

function getSimilarPhones(currentProd, count = 3) {
  let all = [];
  if (typeof window !== 'undefined' && Array.isArray(window.productos) && window.productos.length > 0) {
    all = window.productos;
  } else if (typeof window !== 'undefined' && Array.isArray(window.PRODUCTS_DATA)) {
    all = window.PRODUCTS_DATA;
  }
  if (!all || all.length === 0) return [];

  const others = all.filter(p => String(p.id) !== String(currentProd.id));

  const scored = others.map(p => {
    let score = 0;
    const sameBrand = (p.brand || p.marca || '').toLowerCase() === (currentProd.brand || currentProd.marca || '').toLowerCase();
    const sameRange = (p.range || '').toLowerCase() === (currentProd.range || '').toLowerCase();
    const pPrice = p.price || p.precio || 0;
    const curPrice = currentProd.price || currentProd.precio || 0;
    const priceDiff = curPrice > 0 ? Math.abs(pPrice - curPrice) / curPrice : 1;

    if (sameBrand) score += 12;
    if (sameRange) score += 6;
    if (priceDiff < 0.35) score += 4;
    return { prod: p, score };
  });

  scored.sort((a, b) => b.score - a.score || (b.prod.rating || 0) - (a.prod.rating || 0));
  return scored.slice(0, count).map(s => s.prod);
}

function selectProductThumbnail(boxEl, newSrc) {
  if (!boxEl) return;
  const parent = boxEl.closest('.product-thumbnails-strip, .product-thumbnails-col');
  if (parent) {
    parent.querySelectorAll('.product-thumb-card, .product-thumb-box').forEach(b => {
      b.classList.remove('active-thumb');
    });
  }
  boxEl.classList.add('active-thumb');

  const mainImg = document.getElementById('mainProductSelectedImg');
  if (mainImg) {
    mainImg.style.opacity = '0.25';
    mainImg.style.transform = 'scale(0.96)';
    setTimeout(() => {
      mainImg.src = newSrc;
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 120);
  }
}

function selectProductColor(chipEl, colorName) {
  if (!chipEl) return;
  const parent = chipEl.closest('.product-colors-section, .product-colors-wrap');
  if (parent) {
    parent.querySelectorAll('.product-color-chip, .color-select-chip').forEach(c => c.classList.remove('active'));
  }
  chipEl.classList.add('active');
  window._currentSelectedColor = colorName;
  const nameLabel = document.getElementById('currentSelectedColorName');
  if (nameLabel) nameLabel.textContent = colorName;
}

function openQuickView(productId) {
  let prod = null;
  if (typeof window !== 'undefined' && Array.isArray(window.productos)) {
    prod = window.productos.find(p => String(p.id) === String(productId));
  }
  if (!prod && typeof window !== 'undefined' && Array.isArray(window.PRODUCTS_DATA)) {
    prod = window.PRODUCTS_DATA.find(p => String(p.id) === String(productId));
  }
  if (!prod) return;

  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('modalContentBody');
  if (!modal || !body) return;

  const price = prod.price || prod.precio || 0;
  const originalPrice = prod.originalPrice || price;
  const name = prod.name || prod.nombre || 'Smartphone';
  const brand = prod.brand || prod.marca || 'Marca';
  const rating = prod.rating || 4.9;
  const reviewsCount = prod.reviewsCount || 42;
  const fallbackLogo = resolveAssetPath('assets/img/ui/Logo.jpeg');
  const desc = prod.description || 'Equipo original en caja sellada con garantía oficial de 1 año.';
  const colors = prod.colors || ['Original'];
  const specsObj = prod.specsObj || {
    screen: 'Super AMOLED 120Hz',
    processor: 'Procesador de Alta Velocidad',
    ram: '8 GB RAM',
    storage: '256 GB',
    cameras: 'Cámara Principal Pro con Estabilización Óptica',
    battery: '5,000 mAh Carga Rápida'
  };

  const gallery = getProductGallery(prod);
  const similarProducts = getSimilarPhones(prod, 3);
  window._currentSelectedColor = colors[0];

  const starsHtml = renderProductStarsSvg(rating);
  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Renderizar la sección de celulares similares
  const similarHtml = similarProducts.map(sim => {
    const simPrice = sim.price || sim.precio || 0;
    const simOrigPrice = sim.originalPrice || simPrice;
    const simName = sim.name || sim.nombre || '';
    const simBrand = sim.brand || sim.marca || '';
    const simImg = resolveAssetPath(sim.image || sim.imagen || '');
    const simSpecs = sim.specsObj || {};

    return `
      <div class="similar-product-card" onclick="openQuickView('${sim.id}')">
        <div class="similar-card-top">
          <span class="similar-badge">${sim.badge || 'RECOMENDADO'}</span>
          <span class="similar-brand">${simBrand}</span>
        </div>
        
        <div class="similar-img-wrap">
          <img src="${simImg}" alt="${simName}" class="similar-card-img" loading="lazy" onerror="this.onerror=null; this.src='${fallbackLogo}'">
        </div>

        <h3 class="similar-card-title">${simName}</h3>

        <div class="similar-price-row">
          <span class="similar-price-current">${formatPrice(simPrice)}</span>
          ${simOrigPrice > simPrice ? `<span class="similar-price-old">${formatPrice(simOrigPrice)}</span>` : ''}
        </div>

        <!-- DETALLES Y CARACTERÍSTICAS PARA CADA CELULAR SIMILAR -->
        <div class="similar-specs-list">
          <div class="similar-spec-item" title="Pantalla">
            <span class="spec-icon">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>
            </span>
            <span class="spec-text"><b>Pantalla:</b> ${simSpecs.screen || 'AMOLED 120Hz'}</span>
          </div>
          <div class="similar-spec-item" title="Procesador">
            <span class="spec-icon">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
            </span>
            <span class="spec-text"><b>Procesador:</b> ${simSpecs.processor || 'Octa-Core'}</span>
          </div>
          <div class="similar-spec-item" title="Memoria y Almacenamiento">
            <span class="spec-icon">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75Z"/></svg>
            </span>
            <span class="spec-text"><b>Memoria:</b> ${simSpecs.ram || '8 GB'} • ${simSpecs.storage || '256 GB'}</span>
          </div>
          <div class="similar-spec-item" title="Cámaras">
            <span class="spec-icon">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"/></svg>
            </span>
            <span class="spec-text"><b>Cámaras:</b> ${simSpecs.cameras || 'Cámara Pro'}</span>
          </div>
          <div class="similar-spec-item" title="Batería">
            <span class="spec-icon">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 10.5h.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H21M3.75 6.75h14.25a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 15V9a2.25 2.25 0 0 1 2.25-2.25Z"/></svg>
            </span>
            <span class="spec-text"><b>Batería:</b> ${simSpecs.battery || '5,000 mAh'}</span>
          </div>
        </div>

        <div class="similar-card-actions" onclick="event.stopPropagation()">
          <button class="btn-similar-view" onclick="openQuickView('${sim.id}')" title="Ver detalles completos">
            Ver Detalles
          </button>
          <button class="btn-similar-cart" onclick="addToCart('${sim.id}')" title="Agregar al Carrito">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Carrito
          </button>
        </div>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    <div class="product-modal-wrapper">
      
      <!-- BARRA SUPERIOR FIJA DEL MODAL -->
      <div class="product-modal-header-bar">
        <div class="product-modal-breadcrumbs">
          <span class="crumb-home">Inicio</span>
          <span class="crumb-sep">/</span>
          <span class="crumb-cat">Catálogo</span>
          <span class="crumb-sep">/</span>
          <span class="crumb-brand">${brand}</span>
          <span class="crumb-sep">/</span>
          <span class="crumb-current" title="${name}">${name}</span>
        </div>
        <div class="product-modal-header-badges">
          <span class="badge-official-store">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 4px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
            Tienda Oficial MacCell • Garantía 1 Año
          </span>
        </div>
      </div>

      <!-- GRID PRINCIPAL DE 2 COLUMNAS (GALERÍA + INFO) -->
      <div class="product-modal-main-grid">

        <!-- COLUMNA 1: GALERÍA DE IMÁGENES -->
        <div class="product-gallery-area">
          <div class="product-thumbnails-strip">
            ${gallery.map((imgUrl, idx) => `
              <div class="product-thumb-card ${idx === 0 ? 'active-thumb' : ''}" 
                   onclick="selectProductThumbnail(this, '${imgUrl}')" 
                   title="Ver imagen ${idx + 1}">
                <img src="${imgUrl}" alt="${name} foto ${idx + 1}" class="product-thumb-img" onerror="this.onerror=null; this.src='${fallbackLogo}'">
              </div>
            `).join('')}
          </div>

          <div class="product-stage-box">
            <div class="product-stage-glow"></div>
            ${discountPercent > 0 ? `
              <div class="product-stage-discount-tag">
                -${discountPercent}% DCTO
              </div>
            ` : ''}
            <span class="product-stage-brand-pill">${brand}</span>
            <img id="mainProductSelectedImg" src="${gallery[0]}" alt="${name}" class="product-stage-img" onerror="this.onerror=null; this.src='${fallbackLogo}'">
            <div class="product-stage-hint">
              <span>
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 4px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
                Equipo Oficial MacCell Perú
              </span>
            </div>
          </div>
        </div>

        <!-- COLUMNA 2: INFORMACIÓN Y ACCIONES -->
        <div class="product-info-area">
          
          <div class="product-title-row">
            <span class="product-brand-chip">${brand}</span>
            <span class="product-condition-chip">Nuevo Sellado</span>
          </div>

          <h1 class="product-title-heading">${name}</h1>

          <div class="product-rating-row">
            <div class="product-stars-box">${starsHtml}</div>
            <span class="product-rating-num">${rating}</span>
            <span class="product-reviews-count">(${reviewsCount} opiniones verificadas)</span>
            <span class="product-badge-verified">✓ Compra Segura</span>
          </div>

          <!-- BLOQUE DE PRECIO -->
          <div class="product-price-block">
            ${originalPrice > price ? `
              <div class="product-price-old-row">
                <span class="price-old-label">Precio Regular:</span>
                <span class="price-old-val">${formatPrice(originalPrice)}</span>
              </div>
            ` : ''}
            <div class="product-price-main-row">
              <span class="price-currency-sign">S/</span>
              <span class="price-amount-val">${Number(price).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span class="price-igv-pill">Incluye IGV</span>
            </div>
            <div class="product-price-perks">
              <span style="display:inline-flex; align-items:center; gap:4px;"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg> Boleta o Factura</span>
              <span>•</span>
              <span style="display:inline-flex; align-items:center; gap:4px;"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg> Envío o Recojo Hoy</span>
              <span>•</span>
              <span style="display:inline-flex; align-items:center; gap:4px;"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg> 1 Año Garantía</span>
            </div>
          </div>

          <!-- SELECTOR DE COLORES DISPONIBLES -->
          ${colors && colors.length > 0 ? `
            <div class="product-colors-section">
              <div class="product-colors-header">
                <span class="colors-label">Color:</span>
                <span class="colors-selected-name" id="currentSelectedColorName">${colors[0]}</span>
              </div>
              <div class="product-colors-chips-grid">
                ${colors.map((c, i) => `
                  <button type="button" class="product-color-chip ${i === 0 ? 'active' : ''}" 
                          onclick="selectProductColor(this, '${c}')" 
                          title="Color ${c}">
                    <span class="color-dot-indicator"></span>
                    <span class="color-text-name">${c}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- BENEFICIOS Y DESCRIPCIÓN -->
          <div class="product-benefits-box">
            <div class="benefits-title">
              <svg width="16" height="16" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/></svg>
              <span>Descripción Oficial:</span>
            </div>
            <ul class="benefits-list">
              <li><strong>${desc}</strong></li>
              <li><span>✓</span> Equipo 100% original en caja sellada con código IMEI homologado ante OSIPTEL.</li>
              <li><span>✓</span> Liberado de fábrica para todas las redes 5G y 4G nacionales e internacionales.</li>
              <li><span>✓</span> Incluye 1 año de garantía legal oficial y comprobante electrónico (boleta/factura).</li>
            </ul>
          </div>

          <!-- FICHA TÉCNICA & ESPECIFICACIONES -->
          <div class="product-specs-container">
            <div class="specs-header">
              <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
              </svg>
              <span>Ficha Técnica & Especificaciones:</span>
            </div>
            <div class="specs-matrix">
              <div class="spec-card">
                <span class="spec-label"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg> Pantalla</span>
                <span class="spec-value">${specsObj.screen || 'AMOLED 120Hz'}</span>
              </div>
              <div class="spec-card">
                <span class="spec-label"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg> Procesador</span>
                <span class="spec-value">${specsObj.processor || 'Gama Alta'}</span>
              </div>
              <div class="spec-card">
                <span class="spec-label"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75Z"/></svg> Memoria RAM</span>
                <span class="spec-value">${specsObj.ram || '8 GB / 12 GB'}</span>
              </div>
              <div class="spec-card">
                <span class="spec-label"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/></svg> Almacenamiento</span>
                <span class="spec-value">${specsObj.storage || '256 GB / 512 GB'}</span>
              </div>
              <div class="spec-card">
                <span class="spec-label"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"/></svg> Cámaras</span>
                <span class="spec-value">${specsObj.cameras || 'Cámara Principal Pro'}</span>
              </div>
              <div class="spec-card">
                <span class="spec-label"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 10.5h.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H21M3.75 6.75h14.25a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 15V9a2.25 2.25 0 0 1 2.25-2.25Z"/></svg> Batería & Carga</span>
                <span class="spec-value">${specsObj.battery || '5,000 mAh Carga Rápida'}</span>
              </div>
            </div>
          </div>

          <!-- BOTONES DE COMPRA Y ACCIÓN (DESKTOP) -->
          <div class="product-actions-group">
            <button type="button" class="btn-detail-add-cart" onclick="addToCart('${prod.id}')">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
              </svg>
              <span>Agregar al Carrito</span>
            </button>
            <button type="button" class="btn-detail-buy-now" onclick="buyViaWhatsApp('${prod.id}')">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 1.637.525 3.16 1.442 4.437L3.75 20.25l4.086-.714A9.22 9.22 0 0 0 12 20.25Z"/>
              </svg>
              <span>Comprar por WhatsApp</span>
            </button>
          </div>

        </div>
      </div>

      <!-- SECCIÓN RECOMENDACIÓN DE CELULARES SIMILARES -->
      <div class="similar-products-section">
        <div class="similar-section-header">
          <div>
            <h2 class="similar-heading">
              <svg width="20" height="20" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 4px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"/></svg>
              Celulares Similares Recomendados
            </h2>
            <p class="similar-sub">Smartphones con características y gama comparables en catálogo</p>
          </div>
          <span class="similar-badge-pill">
            Gama ${prod.range === 'alta' ? 'Alta / Flagship' : 'Media / Avanzada'}
          </span>
        </div>

        <div class="similar-products-grid">
          ${similarHtml}
        </div>
      </div>

      <!-- BARRA DE ACCIÓN FLOTANTE / FIJA INFERIOR PARA MÓVILES -->
      <div class="mobile-sticky-product-bar">
        <div class="mobile-bar-price-info">
          <span class="mobile-bar-label">Total en Tienda:</span>
          <span class="mobile-bar-price">${formatPrice(price)}</span>
        </div>
        <div class="mobile-bar-buttons">
          <button type="button" class="mobile-btn-cart" onclick="addToCart('${prod.id}')" title="Agregar al Carrito" aria-label="Agregar al Carrito">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/></svg>
          </button>
          <button type="button" class="mobile-btn-buy" onclick="buyViaWhatsApp('${prod.id}')">
            <span>Pedir WhatsApp</span>
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const modalContainer = modal.querySelector('.modal-content');
  if (modalContainer) {
    modalContainer.scrollTop = 0;
  }
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Cerrar con tecla Escape
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeQuickView();
    }
  });
}

// Exponer en window para acceso global
if (typeof window !== 'undefined') {
  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
  window.selectProductThumbnail = selectProductThumbnail;
  window.selectProductColor = selectProductColor;
  window.getProductGallery = getProductGallery;
  window.getSimilarPhones = getSimilarPhones;
}

// ==========================================
// ==========================================
// MÓDULO: CLIENTES FELICES (ESTILO INSTAGRAM)
// ==========================================
const CLIENTES_DATA = [
  { id: 1, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_1.jpg", brand: "honor", device: "Honor X9b 5G", likes: 248, time: "Hace 2 horas" },
  { id: 2, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_2.jpg", brand: "otros", device: "Unnecto Bolt One", likes: 195, time: "Hace 4 horas" },
  { id: 3, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_3.jpg", brand: "samsung", device: "Samsung Galaxy A56 5G", likes: 312, time: "Hace 6 horas" },
  { id: 4, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_4.jpg", brand: "honor", device: "Honor X5b", likes: 174, time: "Ayer" },
  { id: 5, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_5.jpg", brand: "samsung", device: "Samsung Galaxy S26 Ultra", likes: 289, time: "Ayer" },
  { id: 6, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_6.jpg", brand: "poco", device: "POCO C71", likes: 452, time: "Hace 2 días" },
  { id: 7, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_7.jpg", brand: "poco", device: "POCO C71", likes: 163, time: "Hace 2 días" },
  { id: 8, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_8.jpg", brand: "otros", device: "ZTE Nubia Neo 5 GT (256GB)", likes: 278, time: "Hace 3 días" },
  { id: 9, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_9.jpg", brand: "otros", device: "Infinix Smart 10", likes: 219, time: "Hace 3 días" },
  { id: 10, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_10.jpg", brand: "xiaomi", device: "Redmi Note 13 Pro+ 5G & POCO X6 Pro", likes: 341, time: "Hace 4 días" },
  { id: 11, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_11.jpg", brand: "samsung", device: "Samsung Galaxy S24 Ultra", likes: 185, time: "Hace 4 días" },
  { id: 12, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_12.jpg", brand: "honor", device: "Honor X7b", likes: 147, time: "Hace 5 días" },
  { id: 13, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_13.jpg", brand: "xiaomi", device: "Xiaomi Redmi Note 13", likes: 260, time: "Hace 5 días" },
  { id: 14, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_14.jpg", brand: "apple", device: "iPhone 15 128GB Azul", likes: 198, time: "Hace 6 días" },
  { id: 15, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_15.jpg", brand: "samsung", device: "Samsung Galaxy A55 5G", likes: 230, time: "Hace 6 días" },
  { id: 16, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_16.jpg", brand: "poco", device: "POCO X6 Pro 5G", likes: 142, time: "Hace 1 semana" },
  { id: 17, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_17.jpg", brand: "otros", device: "Motorola Edge 50 Fusion", likes: 388, time: "Hace 1 semana" },
  { id: 18, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_18.jpg", brand: "otros", device: "Motorola Moto G14", likes: 215, time: "Hace 1 semana" },
  { id: 19, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_19.jpg", brand: "otros", device: "Unnecto Bolt One", likes: 128, time: "Hace 1 semana" },
  { id: 20, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_20.jpg", brand: "apple", device: "iPhone 15 128GB Azul", likes: 175, time: "Hace 2 semanas" },
  { id: 21, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_21.jpg", brand: "otros", device: "OPPO Reno11 5G", likes: 298, time: "Hace 2 semanas" },
  { id: 22, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_22.jpg", brand: "honor", device: "Honor X7b & Redmi A3", likes: 164, time: "Hace 2 semanas" },
  { id: 23, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_23.jpg", brand: "otros", device: "Unnecto Bolt One", likes: 334, time: "Hace 2 semanas" },
  { id: 24, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_24.jpg", brand: "apple", device: "iPhone 15 Plus Coral / Naranja", likes: 226, time: "Hace 3 semanas" },
  { id: 25, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_25.jpg", brand: "xiaomi", device: "Xiaomi 13T Leica 5G", likes: 250, time: "Hace 3 semanas" },
  { id: 26, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_26.jpg", brand: "xiaomi", device: "Xiaomi Redmi A3", likes: 189, time: "Hace 3 semanas" },
  { id: 27, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_27.jpg", brand: "poco", device: "POCO X6 5G", likes: 145, time: "Hace 3 semanas" },
  { id: 28, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_28.jpg", brand: "poco", device: "POCO X6 Pro 5G (x2 Unidades)", likes: 210, time: "Hace 1 mes" },
  { id: 29, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_29.jpg", brand: "otros", device: "Motorola Moto G14", likes: 315, time: "Hace 1 mes" }
];

let clienteLikedState = {};

function abrirModalClientes(filtro = 'todos') {
  const modal = document.getElementById('modalClientesOverlay') || document.getElementById('modalClientesFelices');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  filtrarFotosClientes(filtro);
}

function cerrarModalClientes(e) {
  if (e && e.target && e.target !== e.currentTarget && !e.target.closest('.ig-modal-close')) {
    return;
  }
  const modal = document.getElementById('modalClientesOverlay') || document.getElementById('modalClientesFelices');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function filtrarFotosClientes(filtro = 'todos', btn = null) {
  if (btn) {
    document.querySelectorAll('.ig-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  let fotos = CLIENTES_DATA;
  if (filtro && filtro !== 'todos') {
    const f = filtro.toLowerCase();
    fotos = CLIENTES_DATA.filter(c => {
      const b = (c.brand || '').toLowerCase();
      const dev = (c.device || '').toLowerCase();
      if (f === 'xiaomi') {
        return b === 'xiaomi' || b === 'poco' || dev.includes('redmi') || dev.includes('poco') || dev.includes('xiaomi');
      }
      if (f === 'honor') {
        return b === 'honor' || dev.includes('honor');
      }
      if (f === 'samsung') {
        return b === 'samsung' || dev.includes('samsung') || dev.includes('galaxy');
      }
      if (f === 'apple') {
        return b === 'apple' || dev.includes('iphone');
      }
      if (f === 'otros') {
        return b === 'otros' || ['motorola', 'oppo', 'infinix', 'unnecto', 'zte', 'nubia'].some(m => dev.includes(m));
      }
      return b === f || dev.includes(f);
    });
  }

  renderFotosClientes(fotos);
}

function renderFotosClientes(lista) {
  const grid = document.getElementById('igPostsGrid');
  if (!grid) return;

  grid.innerHTML = lista.map(c => {
    const isLiked = clienteLikedState[c.id];
    const currentLikes = c.likes + (isLiked ? 1 : 0);

    return `
      <div class="ig-post-card" id="igPost-${c.id}">
        <div class="ig-post-top">
          <div class="ig-post-user">
            <img src="${resolveAssetPath('assets/img/ui/Logo.jpeg')}" alt="MacCell" class="ig-post-avatar" onerror="this.onerror=null; this.src=resolveAssetPath('assets/img/ui/Logo.jpeg')">
            <div class="ig-post-meta">
              <span class="ig-post-username">maccell.pe</span>
              <span class="ig-post-location">CC Plaza TEC, Lima</span>
            </div>
          </div>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="color: #94a3b8;">
            <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
          </svg>
        </div>

        <div class="ig-post-img-wrap" ondblclick="doubleClickHeart(${c.id}, event)">
          <img src="${c.img}" alt="${c.device}" loading="lazy" onerror="this.src='${c.img.replace('assets/img/ui/clientes-satisfechos/', '')}'">
          <div class="ig-heart-pop" id="heartPop-${c.id}">
            <svg width="48" height="48" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
        </div>

        <div class="ig-post-actions">
          <div class="ig-action-left">
            <button class="ig-action-icon ${isLiked ? 'liked' : ''}" onclick="toggleLikeCliente(${c.id}, event)" title="Me gusta">
              <svg width="22" height="22" fill="${isLiked ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
              </svg>
            </button>
            <button class="ig-action-icon ig-action-whatsapp" onclick="consultarClienteWhatsApp('${c.device}')" title="Preguntar por WhatsApp sobre este celular">
              <svg width="22" height="22" fill="#25d366" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.7c.96.523 1.874.801 2.79.8 3.183 0 5.768-2.587 5.77-5.766.001-3.182-2.585-5.769-5.768-5.785m3.411 8.163c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.18-.538-1.503-.623-2.464-2.148-2.538-2.247-.074-.099-.607-.808-.607-1.542s.385-1.096.522-1.246c.137-.15.299-.187.4-.187.1 0 .201.002.289.006.092.004.215-.035.336.257.126.302.43 1.049.467 1.125.037.075.062.164.013.264-.05.099-.074.163-.148.251-.074.088-.157.197-.224.264-.075.074-.153.155-.066.305.087.15.385.636.827 1.03.568.506 1.048.663 1.198.738.15.075.237.062.324-.038.087-.1.374-.435.474-.585.1-.15.2-.125.337-.075.137.05.87.41 1.02.485.15.075.25.112.287.175.037.062.037.362-.107.767"/>
              </svg>
            </button>
            <button class="ig-action-icon" onclick="consultarClienteWhatsApp('${c.device}')" title="Compartir">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
              </svg>
            </button>
          </div>
          <button class="ig-action-icon" title="Guardar">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/>
            </svg>
          </button>
        </div>

        <div class="ig-post-info">
          <div class="ig-post-likes">${currentLikes.toLocaleString()} Me gusta</div>
          <div style="display: flex; align-items: center; gap: 5px; font-size: 0.8rem; font-weight: 700; color: #00b4d8; margin-bottom: 4px;">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>
            <span>${c.device} • Entrega Presencial</span>
          </div>
          <div class="ig-post-time">${c.time}</div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleLikeCliente(id, event) {
  if (event) event.stopPropagation();
  clienteLikedState[id] = !clienteLikedState[id];

  const card = document.getElementById(`igPost-${id}`);
  if (!card) return;

  const btn = card.querySelector('.ig-action-icon');
  const likesEl = card.querySelector('.ig-post-likes');
  const cliente = CLIENTES_DATA.find(c => c.id === id);
  if (!cliente) return;

  const isLiked = clienteLikedState[id];
  const newLikes = cliente.likes + (isLiked ? 1 : 0);

  if (likesEl) likesEl.textContent = `${newLikes.toLocaleString()} Me gusta`;
  if (btn) {
    if (isLiked) {
      btn.classList.add('liked');
      btn.innerHTML = `
        <svg width="22" height="22" fill="#ef4444" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>
      `;
    } else {
      btn.classList.remove('liked');
      btn.innerHTML = `
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>
      `;
    }
  }
}

function doubleClickHeart(id, event) {
  const heartPop = document.getElementById(`heartPop-${id}`);
  if (heartPop) {
    heartPop.classList.add('pop');
    setTimeout(() => heartPop.classList.remove('pop'), 700);
  }
  if (!clienteLikedState[id]) {
    toggleLikeCliente(id, event);
  }
}

function consultarClienteWhatsApp(device) {
  const phone = STORE_CONFIG.whatsappNumber;
  const text = encodeURIComponent(`¡Hola MacCell! 👋 Vi en su galería de clientes entregas del equipo: *${device}*.\n\n¿Tienen este modelo en stock disponible para entrega hoy y cuál es el precio actual? ¡Gracias!`);
  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
}

// ==========================================
// HERO SLIDER / CAROUSEL
// ==========================================
let currentSlideIndex = 0;
let slideInterval = null;

function initHeroSlider() {
  const slides = document.querySelectorAll('.casu-slide');
  const fills = document.querySelectorAll('.casu-timeline-fill, .casu-progress-fill, .casu-progress-segment');
  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    fills.forEach((f, i) => {
      f.classList.toggle('active', i === index);
      const innerFill = f.querySelector('.casu-progress-fill');
      if (innerFill) {
        innerFill.style.width = i === index ? '100%' : '0%';
      }
    });
    currentSlideIndex = index;
  }

  window.showHeroSlide = showSlide;
  window.changeHeroSlide = function(dir) {
    const next = (currentSlideIndex + dir + slides.length) % slides.length;
    showSlide(next);
    resetHeroTimer();
  };
  window.setHeroSlide = function(idx) {
    showSlide(idx);
    resetHeroTimer();
  };

  function resetHeroTimer() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const next = (currentSlideIndex + 1) % slides.length;
      showSlide(next);
    }, 5500);
  }

  showSlide(0);
  resetHeroTimer();
}

// ==========================================
// BUSCADOR EN TIEMPO REAL & BÚSQUEDA PREDICTIVA
// ==========================================
function initSearch() {
  setupPredictiveSearch(document.getElementById('mainSearchInput'));
  setupPredictiveSearch(document.getElementById('casuSearchInput'));
  setupPredictiveSearch(document.getElementById('mobileSearchInput'));
}

function setupPredictiveSearch(inputEl) {
  if (!inputEl) return;
  const parent = inputEl.closest('.casu-search-wrap, .mobile-drawer-search, .casu-search-pill') || inputEl.parentElement;
  if (!parent) return;

  let dropdown = parent.querySelector('.live-search-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'live-search-dropdown';
    parent.appendChild(dropdown);
  }

  let debounceTimer = null;

  inputEl.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    appState.searchQuery = val;
    if (typeof renderProducts === 'function') {
      renderProducts();
    }

    clearTimeout(debounceTimer);
    if (val.length < 2) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }

    debounceTimer = setTimeout(() => {
      renderLiveSearchResults(val, dropdown, inputEl);
    }, 120);
  });

  inputEl.addEventListener('focus', () => {
    const val = inputEl.value.trim();
    if (val.length >= 2) {
      renderLiveSearchResults(val, dropdown, inputEl);
    }
  });

  document.addEventListener('click', (e) => {
    if (!parent.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    } else if (e.key === 'Enter') {
      dropdown.classList.remove('active');
      scrollToCatalog();
    }
  });
}

function renderLiveSearchResults(query, dropdown, inputEl) {
  const q = query.toLowerCase();
  let allPhones = [];
  if (typeof window.productos !== 'undefined' && Array.isArray(window.productos)) {
    allPhones = window.productos;
  } else if (typeof window.PRODUCTS_DATA !== 'undefined' && Array.isArray(window.PRODUCTS_DATA)) {
    allPhones = window.PRODUCTS_DATA;
  }

  let allAcc = [];
  if (typeof window.accesorios !== 'undefined' && Array.isArray(window.accesorios)) {
    allAcc = window.accesorios;
  }

  const matches = [];

  allPhones.forEach(p => {
    const name = (p.name || p.nombre || '').toLowerCase();
    const brand = (p.brand || p.marca || '').toLowerCase();
    const specs = Array.isArray(p.specs) ? p.specs.join(' ').toLowerCase() : '';
    let score = 0;
    if (name.startsWith(q)) score += 16;
    else if (name.includes(q)) score += 10;
    if (brand.startsWith(q)) score += 12;
    else if (brand.includes(q)) score += 7;
    if (specs.includes(q)) score += 4;

    if (score > 0) {
      matches.push({ item: p, score, type: 'phone' });
    }
  });

  allAcc.forEach(a => {
    const name = (a.name || a.nombre || '').toLowerCase();
    const brand = (a.brand || a.marca || '').toLowerCase();
    let score = 0;
    if (name.startsWith(q)) score += 14;
    else if (name.includes(q)) score += 9;
    if (brand.includes(q)) score += 5;

    if (score > 0) {
      matches.push({ item: a, score, type: 'acc' });
    }
  });

  matches.sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="live-search-empty">
        <p style="margin: 0 0 6px 0; color: #f8fafc; font-weight: 600;">No encontramos resultados para "${query}"</p>
        <p style="margin: 0; font-size: 0.78rem; color: #94a3b8;">Verifica el modelo o explora las mejores ofertas en el catálogo.</p>
      </div>
      <a href="javascript:void(0)" onclick="handleLiveSearchViewAll('${query.replace(/'/g, "\\'")}')" class="live-search-view-all-btn">
        <span>Ver todo el catálogo</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
      </a>
    `;
    dropdown.classList.add('active');
    return;
  }

  const topMatches = matches.slice(0, 5);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

  const itemsHtml = topMatches.map(m => {
    const it = m.item;
    const name = it.name || it.nombre;
    const highlightedName = name.replace(regex, '<mark>$1</mark>');
    const price = it.price || it.precio || 0;
    const img = resolveAssetPath(it.image || it.imagen || '');
    const brand = it.brand || it.marca || (m.type === 'phone' ? 'Smartphone' : 'Accesorio');
    const isPhone = m.type === 'phone';

    return `
      <div class="live-search-item" onclick="handleLiveSearchResultClick('${it.id}', ${isPhone})" title="${name}">
        <img src="${img}" alt="${name}" class="live-search-thumb" onerror="this.onerror=null; this.src='${resolveAssetPath('assets/img/ui/Logo.jpeg')}'">
        <div class="live-search-details">
          <h4 class="live-search-title">${highlightedName}</h4>
          <div class="live-search-meta">
            <span class="live-search-brand-tag">${brand}</span>
            <span style="color: #64748b;">•</span>
            <span style="color: #10b981; font-weight: 600;">100% Sellado</span>
          </div>
        </div>
        <div class="live-search-price">${formatPrice(price)}</div>
      </div>
    `;
  }).join('');

  dropdown.innerHTML = `
    <div class="live-search-header">
      <span>Coincidencias recomendadas</span>
      <span>${matches.length} resultado${matches.length === 1 ? '' : 's'}</span>
    </div>
    <div class="live-search-results-list">
      ${itemsHtml}
    </div>
    <a href="javascript:void(0)" onclick="handleLiveSearchViewAll('${query.replace(/'/g, "\\'")}')" class="live-search-view-all-btn">
      <span>Ver todos los resultados para "${query}" (${matches.length})</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
    </a>
  `;
  dropdown.classList.add('active');
}

function handleLiveSearchResultClick(id, isPhone) {
  document.querySelectorAll('.live-search-dropdown').forEach(d => d.classList.remove('active'));
  const drawer = document.getElementById('mobileDrawer');
  if (drawer && drawer.classList.contains('active') && typeof toggleMenuMovil === 'function') {
    toggleMenuMovil();
  }
  if (isPhone && typeof openQuickView === 'function') {
    openQuickView(id);
  } else {
    addToCart(id, !isPhone);
  }
}
window.handleLiveSearchResultClick = handleLiveSearchResultClick;

function handleLiveSearchViewAll(query) {
  document.querySelectorAll('.live-search-dropdown').forEach(d => d.classList.remove('active'));
  const drawer = document.getElementById('mobileDrawer');
  if (drawer && drawer.classList.contains('active') && typeof toggleMenuMovil === 'function') {
    toggleMenuMovil();
  }
  const isPagesDir = window.location.pathname.includes('/pages/');
  const targetUrl = (isPagesDir ? 'catalogo.html' : 'pages/catalogo.html') + (query ? `?q=${encodeURIComponent(query)}` : '');
  window.location.href = targetUrl;
}
window.handleLiveSearchViewAll = handleLiveSearchViewAll;

function scrollToCatalog(marca = null) {
  const cat = document.getElementById('catalogo') || document.getElementById('catalogoSection') || document.getElementById('productsContainer');
  if (cat) {
    cat.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (marca && typeof filterByBrand === 'function') filterByBrand(marca);
  } else {
    const searchVal = document.getElementById('mainSearchInput')?.value?.trim() || document.getElementById('casuSearchInput')?.value?.trim();
    let url = window.location.pathname.includes('/pages/') ? 'catalogo.html' : 'pages/catalogo.html';
    const params = [];
    if (marca) params.push(`marca=${encodeURIComponent(marca)}`);
    if (searchVal) params.push(`q=${encodeURIComponent(searchVal)}`);
    if (params.length > 0) url += '?' + params.join('&');
    window.location.href = url;
  }
}

// ==========================================
// MOVIMIENTO CONTINUO DE ACCESORIOS (INFINITO 60FPS)
// ==========================================
let accessoriesMotionInitialized = false;

function initAccessoriesMotion() {
  const wrapper = document.getElementById('accesoriosMotionWrapper');
  const track = document.getElementById('accesoriosTrack');
  if (!wrapper || !track) return;

  const originalCards = Array.from(track.children).filter(el => !el.classList.contains('acc-clone'));
  if (originalCards.length === 0) return;

  // 1. Clonar las tarjetas para crear un carrusel continuo e infinito sin saltos
  if (!track.dataset.cloned) {
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('acc-clone');
      track.appendChild(clone);
    });
    track.dataset.cloned = 'true';
  }

  if (accessoriesMotionInitialized) return;
  accessoriesMotionInitialized = true;

  // 2. Calcular la distancia exacta de un ciclo completo (ancho del primer set de tarjetas)
  let resetDistance = 0;
  function updateResetDistance() {
    if (track.children.length > originalCards.length) {
      const firstClone = track.children[originalCards.length];
      const firstCard = track.children[0];
      if (firstClone && firstCard) {
        resetDistance = firstClone.offsetLeft - firstCard.offsetLeft;
      }
    }
    if (!resetDistance || resetDistance <= 0) {
      resetDistance = track.scrollWidth / 2;
    }
  }

  updateResetDistance();
  window.addEventListener('resize', updateResetDistance);

  // 3. Variables de control de movimiento continuo suave
  let isPaused = false;
  let isInteracting = false;
  let resumeTimer = null;
  let scrollPos = wrapper.scrollLeft || 0;
  let lastTimestamp = null;
  const pixelsPerSecond = 38; // Velocidad fluida, elegante y legible

  // Pausar con el cursor para que el usuario pueda hacer clic o leer
  wrapper.addEventListener('mouseenter', () => { isPaused = true; });
  wrapper.addEventListener('mouseleave', () => { isPaused = false; });

  // Pausar con interacción táctil (móvil)
  wrapper.addEventListener('touchstart', () => {
    isInteracting = true;
    isPaused = true;
    clearTimeout(resumeTimer);
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    isInteracting = false;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      isPaused = false;
    }, 1200);
  }, { passive: true });

  // Sincronizar posición continua si el usuario desliza manualmente con touch o trackpad
  wrapper.addEventListener('scroll', () => {
    if (isPaused || isInteracting) {
      scrollPos = wrapper.scrollLeft;
      if (resetDistance > 0) {
        if (scrollPos >= resetDistance) {
          scrollPos -= resetDistance;
          wrapper.scrollLeft = scrollPos;
        } else if (scrollPos <= 0) {
          scrollPos += resetDistance;
          wrapper.scrollLeft = scrollPos;
        }
      }
    }
  }, { passive: true });

  // 4. Ciclo de animación optimizado a 60fps/120fps con requestAnimationFrame
  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
    lastTimestamp = timestamp;

    if (!isPaused && !isInteracting && resetDistance > 0) {
      scrollPos += pixelsPerSecond * delta;
      if (scrollPos >= resetDistance) {
        scrollPos -= resetDistance;
      }
      wrapper.scrollLeft = scrollPos;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function scrollAccesoriosTrack(direction) {
  const wrapper = document.getElementById('accesoriosMotionWrapper');
  if (!wrapper) return;
  const scrollAmount = 280 * direction;
  wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// ==========================================
// MENÚ MÓVIL (DRAWER)
// ==========================================
function toggleMenuMovil() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const menuBtn = document.getElementById('mobileMenuBtn');
  if (!drawer) return;

  const isOpen = drawer.classList.contains('open') || drawer.classList.contains('active');
  if (isOpen) {
    drawer.classList.remove('open', 'active');
    if (backdrop) backdrop.classList.remove('open', 'active');
    document.body.style.overflow = '';
    if (menuBtn) {
      const closeSvg = menuBtn.querySelector('.icon-close-menu');
      const lottieEl = menuBtn.querySelector('.lottie-icon-hamburger');
      if (closeSvg) closeSvg.style.display = 'none';
      if (lottieEl) lottieEl.style.display = 'flex';
    }
  } else {
    drawer.classList.add('open', 'active');
    if (backdrop) backdrop.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
    if (menuBtn) {
      const closeSvg = menuBtn.querySelector('.icon-close-menu');
      const lottieEl = menuBtn.querySelector('.lottie-icon-hamburger');
      if (closeSvg) closeSvg.style.display = 'block';
      if (lottieEl) lottieEl.style.display = 'none';
    }
  }
}

// Cerrar drawer al presionar Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer && (drawer.classList.contains('open') || drawer.classList.contains('active'))) {
      toggleMenuMovil();
    }
  }
});

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message) {
  let toast = document.getElementById('maccellToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'maccellToast';
    toast.className = 'maccell-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ==========================================
// ANIMACIONES LOTTIE
// ==========================================
function initLottieIcons() {
  if (typeof lottie === 'undefined') return;

  const isSubdir = window.location.pathname.includes('/pages/');
  const basePath = isSubdir ? '../' : '';

  const lottieConfigs = [
    { id: 'lottieHeaderCart', selector: '.lottie-icon-cart', key: 'cart', path: 'assets/img/icons/animados/bolsa.json' },
    { id: 'lottieNavMenu', selector: '.lottie-icon-hamburger', key: 'navMenu', path: 'assets/img/icons/animados/3 rayitas para el nav.json' },
    { id: 'lottieFloatWa', selector: '.lottie-icon-wa-float', key: 'whatsapp', path: 'assets/img/icons/animados/whatsapp animado.json' },
    { id: 'lottieBottomWa', selector: '.lottie-icon-wa-bottom', key: 'whatsapp', path: 'assets/img/icons/animados/whatsapp animado.json' },
    { id: 'lottieDrawerCart', selector: '.lottie-icon-drawer-cart', key: 'cart', path: 'assets/img/icons/animados/lottieflow-ecommerce-14-9-000000-easey.json' },
    { id: 'lottieBannerIg', selector: '.lottie-icon-ig-banner', key: 'instagram', path: 'assets/img/icons/animados/ig animado.json' },
    // Footer Redes Sociales Animadas
    { id: 'lottieFooterFb', selector: '.lottie-footer-fb', key: 'facebook', path: 'assets/img/icons/animados/facebook animado.json' },
    { id: 'lottieFooterIg', selector: '.lottie-footer-ig', key: 'instagram', path: 'assets/img/icons/animados/ig animado.json' },
    { id: 'lottieFooterWa', selector: '.lottie-footer-wa', key: 'whatsapp', path: 'assets/img/icons/animados/whatsapp animado.json' }
  ];

  lottieConfigs.forEach(cfg => {
    const elements = new Set();
    if (cfg.id) {
      const byId = document.getElementById(cfg.id);
      if (byId) elements.add(byId);
    }
    if (cfg.selector) {
      document.querySelectorAll(cfg.selector).forEach(el => elements.add(el));
    }

    elements.forEach(el => {
      if (el.children.length > 0) return;

      try {
        if (typeof window.MaccellAnimatedData !== 'undefined' && window.MaccellAnimatedData[cfg.key]) {
          lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: window.MaccellAnimatedData[cfg.key]
          });
        } else {
          lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: basePath + cfg.path
          });
        }
      } catch (e) {
        // Fallback silencioso si falla la carga
      }
    });
  });
}

// ==========================================
// NAVEGACIÓN Y DEEP LINKING
// ==========================================
function navegarA(destino, param = null) {
  if (destino === 'inicio') {
    if (window.location.pathname.includes('/pages/')) {
      window.location.href = '../Inicio.html';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  if (destino === 'marcas') {
    const marcaParam = param ? `?marca=${encodeURIComponent(param)}` : '';
    if (window.location.pathname.includes('/pages/')) {
      window.location.href = `catalogo.html${marcaParam}`;
    } else {
      window.location.href = `pages/catalogo.html${marcaParam}`;
    }
    return;
  }

  if (destino === 'nosotros') {
    if (window.location.pathname.includes('/pages/')) {
      window.location.href = 'nosotros.html';
    } else {
      window.location.href = 'pages/nosotros.html';
    }
    return;
  }

  if (destino === 'ubicanos') {
    if (window.location.pathname.includes('/pages/')) {
      window.location.href = 'ubicacion.html';
    } else {
      window.location.href = 'pages/ubicacion.html';
    }
    return;
  }

  if (destino === 'contacto') {
    if (window.location.pathname.includes('/pages/')) {
      window.location.href = 'contacto.html';
    } else {
      window.location.href = 'pages/contacto.html';
    }
    return;
  }
}

function navegarYScroll(destino, anchorId) {
  if (destino === 'nosotros') {
    const targetUrl = window.location.pathname.includes('/pages/') 
      ? `nosotros.html#${anchorId}` 
      : `pages/nosotros.html#${anchorId}`;
    window.location.href = targetUrl;
    return;
  }

  navegarA(destino);
}

// ==========================================
// ACCESO DISCRETO AL PANEL DE ADMINISTRACIÓN
// Invisible para los clientes. Permite al dueño ingresar mediante:
// 1. Atajo de teclado: Ctrl + Shift + A  o  Alt + A
// 2. Parámetro en el link: ?admin  o  ?panel (ej. maccell.pe/?admin)
// 3. Triple clic rápido en el logo MacCell o copyright
// 4. Comando en consola: admin()
// ==========================================
function initSecretAdminAccess() {
  const isPagesDir = typeof window !== 'undefined' && window.location.pathname.includes('/pages/');
  const adminUrl = isPagesDir ? '../admin.html' : 'admin.html';

  // 1. Detección automática por URL con parámetro ?admin o ?panel
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin') || params.has('panel')) {
      window.location.href = adminUrl;
      return;
    }
  } catch (err) {}

  // 2. Atajo de teclado discreto (Ctrl + Shift + A ó Alt + A)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))) {
      e.preventDefault();
      window.location.href = adminUrl;
    }
  });

  // 3. Triple clic / tap rápido en el logo o copyright
  let clickCount = 0;
  let clickTimer = null;

  function handleSecretClick() {
    clickCount++;
    clearTimeout(clickTimer);
    if (clickCount >= 3) {
      clickCount = 0;
      window.location.href = adminUrl;
      return;
    }
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 900);
  }

  const triggers = document.querySelectorAll(
    '.header-brand-logo, .casu-brand-title, .footer-brand-logo-wrap, .casu-footer-legal-copy, .footer-bottom'
  );
  triggers.forEach(el => {
    el.addEventListener('click', handleSecretClick);
  });

  // 4. Atajo rápido desde consola DevTools
  window.admin = () => { window.location.href = adminUrl; };
  window.maccellAdmin = () => { window.location.href = adminUrl; };
}

// ==========================================
// LIBRO DE RECLAMACIONES VIRTUAL (LEY N° 29571)
// ==========================================
let ultimoReclamoRegistrado = null;

function ensureLibroReclamacionesModal() {
  let modal = document.getElementById('modalLibroReclamaciones');
  if (modal) return modal;

  const hoyStr = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const codigoAuto = 'LR-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);

  modal = document.createElement('div');
  modal.id = 'modalLibroReclamaciones';
  modal.className = 'libro-rec-modal-overlay';
  modal.setAttribute('onclick', 'if(event.target===this) cerrarLibroReclamaciones();');

  modal.innerHTML = `
    <div class="libro-rec-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="libroRecTitle">
      <!-- BARRA SUPERIOR INSTITUCIONAL (ESTADO PERUANO / INDECOPI) -->
      <div class="libro-rec-top-official-bar">
        <div class="libro-rec-top-left">
          <div class="libro-rec-top-flag" title="República del Perú">
            <span class="red"></span><span class="white"></span><span class="red"></span>
          </div>
          <span>REPÚBLICA DEL PERÚ • CÓDIGO DE PROTECCIÓN Y DEFENSA DEL CONSUMIDOR</span>
        </div>
        <div class="libro-rec-top-right">
          <span>LEY N° 29571 / D.S. N° 011-2011-PCM</span>
        </div>
      </div>

      <!-- HEADER PRINCIPAL DEL DOCUMENTO -->
      <div class="libro-rec-modal-header">
        <div class="libro-rec-header-brand">
          <div class="libro-rec-emblem">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M6 6h10"></path>
              <path d="M6 10h10"></path>
              <path d="M6 14h6"></path>
            </svg>
          </div>
          <div>
            <h3 class="libro-rec-modal-title" id="libroRecTitle">LIBRO DE RECLAMACIONES</h3>
            <p class="libro-rec-modal-subtitle">Hoja de Reclamación Virtual • MacCell Perú S.A.C.</p>
          </div>
        </div>
        <button type="button" class="libro-rec-close-btn" onclick="cerrarLibroReclamaciones()" aria-label="Cerrar modal">✕</button>
      </div>

      <!-- CUERPO DEL DOCUMENTO -->
      <div class="libro-rec-modal-body" id="libroRecModalBody">
        <!-- DATOS DEL PROVEEDOR Y HOJA -->
        <div class="libro-rec-provider-box">
          <div class="libro-rec-provider-item">
            <span class="libro-rec-provider-label">Razón Social:</span>
            <span class="libro-rec-provider-val">MACCELL PERÚ S.A.C.</span>
          </div>
          <div class="libro-rec-provider-item">
            <span class="libro-rec-provider-label">RUC:</span>
            <span class="libro-rec-provider-val">20609876541</span>
          </div>
          <div class="libro-rec-provider-item">
            <span class="libro-rec-provider-label">Establecimiento:</span>
            <span class="libro-rec-provider-val">C.C. Plaza TEC Tienda 303, Cercado de Lima</span>
          </div>
          <div class="libro-rec-provider-item">
            <span class="libro-rec-provider-label">Hoja de Reclamación:</span>
            <span class="libro-rec-provider-val highlight" id="lblCodigoReclamo">${codigoAuto}</span>
          </div>
          <div class="libro-rec-provider-item">
            <span class="libro-rec-provider-label">Fecha de Emisión:</span>
            <span class="libro-rec-provider-val">${hoyStr}</span>
          </div>
        </div>

        <form id="formLibroReclamaciones" onsubmit="enviarHojaReclamacion(event)">
          <!-- 1. IDENTIFICACIÓN DEL CONSUMIDOR -->
          <div class="libro-rec-section">
            <div class="libro-rec-section-heading">
              <span class="sec-num">1</span>
              <span>Identificación del Consumidor Reclamante</span>
            </div>

            <div class="libro-rec-grid-2">
              <div class="libro-rec-field">
                <label class="libro-rec-label" for="recNombre">Nombres y Apellidos / Razón Social <span class="req">*</span></label>
                <input type="text" id="recNombre" class="libro-rec-input" required placeholder="Nombres completos del reclamante">
              </div>

              <div class="libro-rec-grid-2" style="margin-bottom: 0;">
                <div class="libro-rec-field">
                  <label class="libro-rec-label" for="recTipoDoc">Tipo Documento <span class="req">*</span></label>
                  <select id="recTipoDoc" class="libro-rec-select" required>
                    <option value="DNI">DNI</option>
                    <option value="Carnet de Extranjería">Carnet de Extranjería</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="RUC">RUC</option>
                  </select>
                </div>
                <div class="libro-rec-field">
                  <label class="libro-rec-label" for="recNumDoc">N° de Documento <span class="req">*</span></label>
                  <input type="text" id="recNumDoc" class="libro-rec-input" required placeholder="Número de documento">
                </div>
              </div>
            </div>

            <div class="libro-rec-grid-2">
              <div class="libro-rec-field">
                <label class="libro-rec-label" for="recTelefono">Teléfono Celular / WhatsApp <span class="req">*</span></label>
                <input type="tel" id="recTelefono" class="libro-rec-input" required placeholder="Ej: 924678780">
              </div>

              <div class="libro-rec-field">
                <label class="libro-rec-label" for="recEmail">Correo Electrónico (donde recibirá respuesta) <span class="req">*</span></label>
                <input type="email" id="recEmail" class="libro-rec-input" required placeholder="nombre@correo.com">
              </div>
            </div>

            <div class="libro-rec-field">
              <label class="libro-rec-label" for="recDomicilio">Domicilio (Dirección, Distrito y Departamento) <span class="req">*</span></label>
              <input type="text" id="recDomicilio" class="libro-rec-input" required placeholder="Dirección completa del consumidor">
            </div>

            <label class="libro-rec-checkbox">
              <input type="checkbox" id="recEsMenor" onchange="document.getElementById('recPadreWrap').style.display = this.checked ? 'block' : 'none';">
              <span>El consumidor reclamante es menor de edad (indicar datos del padre, madre o apoderado)</span>
            </label>

            <div id="recPadreWrap" style="display:none; margin-top: 10px;">
              <div class="libro-rec-field">
                <label class="libro-rec-label" for="recApoderado">Nombres, Apellidos y Documento del Padre/Madre/Apoderado</label>
                <input type="text" id="recApoderado" class="libro-rec-input" placeholder="Datos completos del apoderado">
              </div>
            </div>
          </div>

          <!-- 2. IDENTIFICACIÓN DEL BIEN CONTRATADO -->
          <div class="libro-rec-section">
            <div class="libro-rec-section-heading">
              <span class="sec-num">2</span>
              <span>Identificación del Bien Contratado</span>
            </div>

            <div class="libro-rec-field">
              <label class="libro-rec-label">Tipo de Bien Contratado <span class="req">*</span></label>
              <div class="libro-rec-radios">
                <label class="libro-rec-radio-option">
                  <input type="radio" name="recTipoBien" value="Producto" checked>
                  <div class="libro-rec-radio-text">
                    <strong>PRODUCTO</strong>
                    <small>Celular smartphone, cargador, audífonos o accesorio original</small>
                  </div>
                </label>
                <label class="libro-rec-radio-option">
                  <input type="radio" name="recTipoBien" value="Servicio">
                  <div class="libro-rec-radio-text">
                    <strong>SERVICIO</strong>
                    <small>Servicio de envío / delivery o atención posventa</small>
                  </div>
                </label>
              </div>
            </div>

            <div class="libro-rec-grid-2">
              <div class="libro-rec-field">
                <label class="libro-rec-label" for="recMonto">Monto Reclamado en Soles (S/) (Opcional)</label>
                <input type="number" id="recMonto" class="libro-rec-input" placeholder="0.00" min="0" step="0.01">
              </div>

              <div class="libro-rec-field">
                <label class="libro-rec-label" for="recDescripcionBien">Descripción del Producto o Servicio <span class="req">*</span></label>
                <input type="text" id="recDescripcionBien" class="libro-rec-input" required placeholder="Ej: iPhone 13 128GB Midnight o Samsung Galaxy S24">
              </div>
            </div>
          </div>

          <!-- 3. DETALLE DE LA RECLAMACIÓN Y PEDIDO -->
          <div class="libro-rec-section">
            <div class="libro-rec-section-heading">
              <span class="sec-num">3</span>
              <span>Detalle de la Reclamación y Pedido del Consumidor</span>
            </div>

            <div class="libro-rec-field">
              <label class="libro-rec-label">Tipo de Disconformidad <span class="req">*</span></label>
              <div class="libro-rec-radios">
                <label class="libro-rec-radio-option">
                  <input type="radio" name="recTipoDisconformidad" value="Reclamo" checked>
                  <div class="libro-rec-radio-text">
                    <strong>RECLAMO</strong>
                    <small>Disconformidad relacionada a los productos o servicios expendidos (defecto, entrega, garantía).</small>
                  </div>
                </label>
                <label class="libro-rec-radio-option">
                  <input type="radio" name="recTipoDisconformidad" value="Queja">
                  <div class="libro-rec-radio-text">
                    <strong>QUEJA</strong>
                    <small>Malestar o descontento respecto a la atención brindada al público (trato recibido o demora).</small>
                  </div>
                </label>
              </div>
            </div>

            <div class="libro-rec-field">
              <label class="libro-rec-label" for="recDetalle">Detalle de los Hechos (Fundamento de la reclamación) <span class="req">*</span></label>
              <textarea id="recDetalle" class="libro-rec-textarea" required rows="4" placeholder="Describa de manera ordenada y clara los hechos materia de su reclamo o queja..."></textarea>
            </div>

            <div class="libro-rec-field">
              <label class="libro-rec-label" for="recPedido">Pedido Concreto del Consumidor <span class="req">*</span></label>
              <textarea id="recPedido" class="libro-rec-textarea" required rows="2" placeholder="Especifique con exactitud qué solución o acción solicita a la empresa..."></textarea>
            </div>
          </div>

          <!-- NOTA LEGAL INDECOPI -->
          <div class="libro-rec-legal-notice">
            <strong>Aviso Legal conforme a Ley N° 29571:</strong> MacCell dará respuesta formal a la presente reclamación en un plazo no mayor a quince (15) días hábiles improrrogables a través del correo electrónico consignado. La formulación de este reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.
          </div>

          <!-- DECLARACIÓN JURADA Y BOTÓN -->
          <div class="libro-rec-section" style="margin-bottom: 0; background: #f8fafc;">
            <label class="libro-rec-checkbox">
              <input type="checkbox" id="recAcepto" required>
              <span><strong>Declaración Jurada:</strong> Declaro bajo juramento que los datos consignados en la presente Hoja de Reclamación son verdaderos y autorizo a MacCell Perú S.A.C. al tratamiento de mis datos personales únicamente para la atención y seguimiento de esta reclamación, conforme a la Ley N° 29733 de Protección de Datos Personales.</span>
            </label>

            <button type="submit" class="libro-rec-submit-btn">
              <span>Enviar Hoja de Reclamación</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}

function abrirLibroReclamaciones() {
  const modal = ensureLibroReclamacionesModal();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const form = document.getElementById('formLibroReclamaciones');
  if (form) {
    const inputNombre = document.getElementById('recNombre');
    if (inputNombre) setTimeout(() => inputNombre.focus(), 150);
  }
}

function cerrarLibroReclamaciones() {
  const modal = document.getElementById('modalLibroReclamaciones');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function enviarHojaReclamacion(event) {
  event.preventDefault();

  const lblCodigo = document.getElementById('lblCodigoReclamo');
  const codigo = lblCodigo ? lblCodigo.textContent.trim() : ('LR-' + new Date().getFullYear() + '-' + Date.now().toString().slice(-5));
  const hoyStr = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const nombre = document.getElementById('recNombre').value.trim();
  const tipoDoc = document.getElementById('recTipoDoc').value;
  const numDoc = document.getElementById('recNumDoc').value.trim();
  const telefono = document.getElementById('recTelefono').value.trim();
  const email = document.getElementById('recEmail').value.trim();
  const domicilio = document.getElementById('recDomicilio').value.trim();
  const esMenor = document.getElementById('recEsMenor').checked;
  const apoderado = esMenor ? document.getElementById('recApoderado').value.trim() : '';

  const tipoBienEl = document.querySelector('input[name="recTipoBien"]:checked');
  const tipoBien = tipoBienEl ? tipoBienEl.value : 'Producto';
  const monto = document.getElementById('recMonto').value.trim();
  const descripcionBien = document.getElementById('recDescripcionBien').value.trim();

  const tipoDisconformidadEl = document.querySelector('input[name="recTipoDisconformidad"]:checked');
  const tipoDisconformidad = tipoDisconformidadEl ? tipoDisconformidadEl.value : 'Reclamo';
  const detalle = document.getElementById('recDetalle').value.trim();
  const pedido = document.getElementById('recPedido').value.trim();

  const reclamoData = {
    codigo,
    fecha: hoyStr,
    nombre,
    tipoDoc,
    numDoc,
    telefono,
    email,
    domicilio,
    esMenor,
    apoderado,
    tipoBien,
    monto: monto ? `S/ ${monto}` : 'No especificado',
    descripcionBien,
    tipoDisconformidad,
    detalle,
    pedido
  };

  ultimoReclamoRegistrado = reclamoData;

  // Guardar en localStorage para respaldo
  try {
    const listado = JSON.parse(localStorage.getItem('maccell_reclamaciones_db') || '[]');
    listado.unshift(reclamoData);
    localStorage.setItem('maccell_reclamaciones_db', JSON.stringify(listado));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage', e);
  }

  // Renderizar constancia formal oficial
  const bodyEl = document.getElementById('libroRecModalBody');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="libro-rec-receipt-card">
        <div class="libro-rec-receipt-header">
          <div class="libro-rec-receipt-header-left">
            <div class="libro-rec-receipt-seal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h3 class="libro-rec-receipt-title">CONSTANCIA DE REGISTRO DE RECLAMACIÓN</h3>
              <p class="libro-rec-receipt-sub">Conforme al Art. 24° del Código de Protección y Defensa del Consumidor</p>
            </div>
          </div>
          <div class="libro-rec-receipt-code-box">
            <span class="code-label">HOJA N°</span>
            <span class="code-val">${codigo}</span>
          </div>
        </div>

        <div class="libro-rec-receipt-status-banner">
          Su <strong>${tipoDisconformidad}</strong> ha sido ingresado formalmente a nuestro Libro de Reclamaciones Virtual. MacCell Perú dará respuesta en un plazo no mayor a <strong>15 días hábiles</strong> al correo <strong>${email}</strong>.
        </div>

        <table class="libro-rec-table-summary">
          <tbody>
            <tr>
              <td class="key">Proveedor:</td>
              <td class="val">MACCELL PERÚ S.A.C. (RUC 20609876541)</td>
            </tr>
            <tr>
              <td class="key">Establecimiento:</td>
              <td class="val">C.C. Plaza TEC Tienda 303, Cercado de Lima</td>
            </tr>
            <tr>
              <td class="key">Fecha y Hora:</td>
              <td class="val">${hoyStr}</td>
            </tr>
            <tr>
              <td class="key">Consumidor:</td>
              <td class="val">${nombre} (${tipoDoc}: ${numDoc})</td>
            </tr>
            <tr>
              <td class="key">Contacto:</td>
              <td class="val">Tel: ${telefono} | Correo: ${email}</td>
            </tr>
            <tr>
              <td class="key">Domicilio:</td>
              <td class="val">${domicilio}</td>
            </tr>
            ${esMenor && apoderado ? `
            <tr>
              <td class="key">Apoderado:</td>
              <td class="val">${apoderado}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="key">Bien Contratado:</td>
              <td class="val">${tipoBien}: ${descripcionBien} ${monto && monto !== 'No especificado' ? `(Monto: S/ ${monto})` : ''}</td>
            </tr>
            <tr>
              <td class="key">Tipo de Registro:</td>
              <td class="val"><strong style="color: #0077b6;">${tipoDisconformidad.toUpperCase()}</strong></td>
            </tr>
            <tr>
              <td class="key">Detalle Reclamo:</td>
              <td class="val" style="white-space: pre-wrap;">${detalle}</td>
            </tr>
            <tr>
              <td class="key">Pedido Concreto:</td>
              <td class="val" style="white-space: pre-wrap;">${pedido}</td>
            </tr>
          </tbody>
        </table>

        <div class="libro-rec-receipt-footer-legal">
          Nota Oficial: Se ha generado esta constancia electrónica con valor legal según el D.S. N° 011-2011-PCM. Puede imprimir o guardar este comprobante en formato PDF.
        </div>

        <div class="libro-rec-receipt-actions">
          <button type="button" class="libro-rec-btn-print" onclick="window.print()">
            <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.32 0H6.34m12.41-6.171V6.75a2.25 2.25 0 0 0-2.25-2.25H7.5A2.25 2.25 0 0 0 5.25 6.75v5.079"/>
            </svg>
            <span>Imprimir / Guardar PDF</span>
          </button>

          <button type="button" class="libro-rec-btn-wa" onclick="enviarReclamacionWhatsApp()">
            <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.7c.96.523 1.874.801 2.79.8 3.183 0 5.768-2.587 5.77-5.766.001-3.182-2.585-5.769-5.768-5.785m3.411 8.163c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.18-.538-1.503-.623-2.464-2.148-2.538-2.247-.074-.099-.607-.808-.607-1.542s.385-1.096.522-1.246c.137-.15.299-.187.4-.187.1 0 .201.002.289.006.092.004.215-.035.336.257.126.302.43 1.049.467 1.125.037.075.062.164.013.264-.05.099-.074.163-.148.251-.074.088-.157.197-.224.264-.075.074-.153.155-.066.305.087.15.385.636.827 1.03.568.506 1.048.663 1.198.738.15.075.237.062.324-.038.087-.1.374-.435.474-.585.1-.15.2-.125.337-.075.137.05.87.41 1.02.485.15.075.25.112.287.175.037.062.037.362-.107.767"/>
            </svg>
            <span>Enviar por WhatsApp a MacCell</span>
          </button>

          <button type="button" class="libro-rec-btn-close-final" onclick="cerrarLibroReclamaciones()">
            Cerrar
          </button>
        </div>
      </div>
    `;
  }

  showToast('✓ Hoja de Reclamación registrada conforme a ley');
}

function enviarReclamacionWhatsApp() {
  if (!ultimoReclamoRegistrado) return;
  const d = ultimoReclamoRegistrado;
  const mensaje = `*HOJA DE RECLAMACIÓN VIRTUAL - MACCELL PERÚ*
📋 *Código:* ${d.codigo}
📅 *Fecha:* ${d.fecha}
👤 *Reclamante:* ${d.nombre} (${d.tipoDoc}: ${d.numDoc})
📱 *Teléfono:* ${d.telefono}
📧 *Correo:* ${d.email}
🏠 *Domicilio:* ${d.domicilio}
📦 *Bien:* ${d.tipoBien} - ${d.descripcionBien} ${d.monto ? `(${d.monto})` : ''}
⚖️ *Tipo:* ${d.tipoDisconformidad}
📝 *Detalle:* ${d.detalle}
🎯 *Pedido:* ${d.pedido}

_Enviado conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571)._`;

  const url = `https://api.whatsapp.com/send?phone=51924678780&text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// ==========================================
// PWA & SOPORTE OFFLINE / INSTALACIÓN NATIVA
// ==========================================
let deferredPwaPrompt = null;

function initPwa() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      const isPages = window.location.pathname.includes('/pages/');
      const swPath = isPages ? '../sw.js' : 'sw.js';
      navigator.serviceWorker.register(swPath)
        .then(reg => {
          console.log('[PWA] Service Worker registrado:', reg.scope);
        })
        .catch(err => {
          console.warn('[PWA] Aviso en Service Worker:', err);
        });
    });
  }

  initPwaInstallPrompt();
}

function initPwaInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;

    const dismissedTime = localStorage.getItem('maccell_pwa_dismissed');
    if (dismissedTime && (Date.now() - Number(dismissedTime)) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    setTimeout(() => {
      showPwaInstallBanner();
    }, 4500);
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] MacCell App instalada');
    deferredPwaPrompt = null;
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.remove();
  });
}

function showPwaInstallBanner() {
  if (document.getElementById('pwaInstallBanner') || !deferredPwaPrompt) return;

  const banner = document.createElement('div');
  banner.id = 'pwaInstallBanner';
  banner.className = 'pwa-install-banner';

  const iconSrc = resolveAssetPath('assets/img/pwa/icon-192.png');

  banner.innerHTML = `
    <img src="${iconSrc}" alt="MacCell App" class="pwa-banner-icon">
    <div class="pwa-banner-info">
      <div class="pwa-banner-title">MacCell Oficial</div>
      <p class="pwa-banner-desc">Instala la app para compras rápidas y catálogo sin conexión.</p>
    </div>
    <div class="pwa-banner-actions">
      <button class="pwa-btn-install" id="btnPwaInstallAction">Instalar</button>
      <button class="pwa-btn-close" id="btnPwaCloseAction" aria-label="Cerrar">✕</button>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById('btnPwaInstallAction')?.addEventListener('click', () => {
    if (deferredPwaPrompt) {
      deferredPwaPrompt.prompt();
      deferredPwaPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] Usuario aceptó instalación');
        }
        deferredPwaPrompt = null;
        banner.remove();
      });
    }
  });

  document.getElementById('btnPwaCloseAction')?.addEventListener('click', () => {
    localStorage.setItem('maccell_pwa_dismissed', String(Date.now()));
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(100%)';
    banner.style.transition = 'all 0.3s ease';
    setTimeout(() => banner.remove(), 320);
  });
}

// EXPORTAR AL OBJETO GLOBAL WINDOW
window.STORE_CONFIG = STORE_CONFIG;
window.appState = appState;
window.initPwa = initPwa;
window.addToCart = addToCart;
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkoutViaWhatsApp = checkoutViaWhatsApp;
window.buyViaWhatsApp = buyViaWhatsApp;
window.pedirAccesorioWhatsApp = pedirAccesorioWhatsApp;
window.initAccessoriesMotion = initAccessoriesMotion;
window.iniciarMovimientoAccesorios = initAccessoriesMotion;
window.scrollAccesoriosTrack = scrollAccesoriosTrack;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.abrirModalClientes = abrirModalClientes;
window.cerrarModalClientes = cerrarModalClientes;
window.filtrarFotosClientes = filtrarFotosClientes;
window.toggleLikeCliente = toggleLikeCliente;
window.doubleClickHeart = doubleClickHeart;
window.consultarClienteWhatsApp = consultarClienteWhatsApp;
window.changeHeroSlide = window.changeHeroSlide;
window.setHeroSlide = window.setHeroSlide;
window.toggleMenuMovil = toggleMenuMovil;
window.showToast = showToast;
window.scrollToCatalog = scrollToCatalog;
window.navegarA = navegarA;
window.navegarYScroll = navegarYScroll;
window.initSecretAdminAccess = initSecretAdminAccess;
window.abrirLibroReclamaciones = abrirLibroReclamaciones;
window.cerrarLibroReclamaciones = cerrarLibroReclamaciones;
window.enviarHojaReclamacion = enviarHojaReclamacion;
window.enviarReclamacionWhatsApp = enviarReclamacionWhatsApp;


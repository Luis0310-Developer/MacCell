/* ===================================================
   MACCELL - STORE LOGIC & APP CONTROLLER
   Gestión de Catálogo, Carrito, Búsqueda y Contenedores
   =================================================== */

// CONFIGURACIÓN DE LA TIENDA MACCELL
const STORE_CONFIG = {
  storeName: "MacCell",
  storeSlogan: "Celulares y Accesorios",
  whatsappNumber: "51924678780", // Número oficial de WhatsApp para pedidos (+51 924 678 780)
  storeLocation: "C.C. Plaza TEC - Av. Garcilaso de la Vega 1358, Lima",
  currency: "S/"
};

// ESTADO GLOBAL
let appState = {
  currentSection: 'inicio',
  currentCategory: 'all',
  currentRange: 'all',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('maccell_cart')) || [],
  activeHeroSlide: 0
};

// INICIALIZACIÓN AL CARGAR DOM
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initCountdownTimer();
  renderProducts();
  renderFeaturedProducts();
  iniciarMovimientoAccesorios();
  updateCartBadge();
  setupEventListeners();
  initLottieIcons();

  // Revisar si viene con hash en la URL (#nosotros, #marcas, etc.)
  const hash = window.location.hash.replace('#', '');
  if (['inicio', 'nosotros', 'marcas', 'ubicanos', 'contacto', 'delivery'].includes(hash)) {
    navegarA(hash);
  } else {
    navegarA('inicio');
  }
});

// ==========================================
// GESTOR DE CONTENEDORES INDEPENDIENTES (SPA)
// ==========================================
function navegarA(seccionId, marca = null) {
  appState.currentSection = seccionId;

  // Actualizar hash de la URL para historial y navegación directa
  if (window.location.hash !== '#' + seccionId) {
    if (history.pushState) {
      history.pushState(null, '', '#' + seccionId);
    } else {
      window.location.hash = '#' + seccionId;
    }
  }

  // Ocultar todos los contenedores de apartados
  document.querySelectorAll('.apartado-container').forEach(c => {
    c.classList.remove('active');
  });

  // Mostrar el contenedor seleccionado
  const targetContainer = document.getElementById('contenedor-' + seccionId);
  if (targetContainer) {
    targetContainer.classList.add('active');
  } else {
    const inicio = document.getElementById('contenedor-inicio');
    if (inicio) inicio.classList.add('active');
  }

  // Actualizar enlace activo en el menú de escritorio
  document.querySelectorAll('.casu-nav-item').forEach(item => {
    item.classList.remove('active');
  });

  const activeLink = document.querySelector(`.casu-nav-item[data-seccion="${seccionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Actualizar enlace activo en menú móvil drawer
  document.querySelectorAll('.mobile-nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('data-mob-seccion') === seccionId) {
      a.classList.add('active');
    }
  });

  // Actualizar enlace activo en barra inferior para móviles
  document.querySelectorAll('.mobile-bottom-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-bottom') === seccionId) {
      btn.classList.add('active');
    }
  });

  // Si se seleccionó una marca desde el dropdown
  if (marca) {
    filterByBrand(marca);
  }

  // Desplazar suavemente a la parte superior
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navegar a un contenedor y hacer scroll suave a un elemento específico
function navegarYScroll(seccionId, elementoId) {
  navegarA(seccionId);
  if (elementoId) {
    setTimeout(() => {
      const el = document.getElementById(elementoId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 180);
  }
}

// ==========================================
// RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
// ==========================================
function renderProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  // Filtrado de productos
  let filtered = PRODUCTS_DATA.filter(prod => {
    const matchCategory = appState.currentCategory === 'all' || 
      prod.category === appState.currentCategory ||
      prod.brand.toLowerCase() === appState.currentCategory.toLowerCase();
    const matchRange = appState.currentRange === 'all' || prod.range === appState.currentRange;
    const matchSearch = appState.searchQuery === '' || 
      prod.name.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
      prod.specs.processor.toLowerCase().includes(appState.searchQuery.toLowerCase());

    return matchCategory && matchRange && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin: 0 auto 12px; display: block; color: var(--text-dim);">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
        </svg>
        <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 6px;">No encontramos celulares con esos criterios</h3>
        <p style="font-size: 0.9rem;">Prueba buscando otra marca o limpiando los filtros.</p>
        <button class="pill-btn" onclick="resetFilters()" style="margin-top: 14px; background: var(--logo-cyan); color: #0b0f19;">Ver todos los equipos</button>
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

  // Mostramos los 4 más vendidos / ofertas para Inicio
  const featured = PRODUCTS_DATA.slice(0, 4);
  container.innerHTML = featured.map(prod => buildProductCardHtml(prod)).join('');
}

// Plantilla HTML de cada Tarjeta de Celular
function buildProductCardHtml(prod) {
  const discount = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);
  
  return `
    <div class="product-card" data-id="${prod.id}">
      <!-- Badges -->
      <div class="product-badge-stack">
        ${prod.badge ? `<span class="product-badge badge-${prod.badgeType}">${prod.badge} -${discount}%</span>` : ''}
        <span class="product-badge badge-garantia">Garantía 1 Año</span>
      </div>

      <!-- Quick View Button -->
      <button class="product-quick-view-btn" onclick="openQuickView(${prod.id})" title="Vista Rápida">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
      </button>

      <!-- Product Image -->
      <div class="product-image-wrap" onclick="openQuickView(${prod.id})" style="cursor: pointer;">
        <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'">
      </div>

      <!-- Brand & Title -->
      <span class="product-brand">${prod.brand}</span>
      <h3 class="product-title" onclick="openQuickView(${prod.id})" style="cursor: pointer;" title="${prod.name}">${prod.name}</h3>

      <!-- Key Specs -->
      <div class="product-specs-list">
        <span class="spec-pill">${prod.specs.storage}</span>
        <span class="spec-pill">${prod.specs.ram}</span>
        <span class="spec-pill">${prod.specs.screen.split(' ')[0]}</span>
      </div>

      <!-- Price -->
      <div class="product-price-box">
        <div>
          <span class="price-main">${formatPrice(prod.price)}</span>
          <span class="price-old">${formatPrice(prod.originalPrice)}</span>
        </div>
      </div>

      <!-- Action Button -->
      <div class="product-actions">
        <button class="btn-card-cart" onclick="addToCart(${prod.id})" title="Agregar al Carrito">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
          </svg>
          <span>Agregar al Carrito</span>
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// CONTROL DE FILTROS & BÚSQUEDA
// ==========================================
function filterByBrand(brand, element) {
  appState.currentCategory = brand;
  
  // Actualizar chips activos
  document.querySelectorAll('.brand-chip').forEach(el => {
    el.classList.remove('active');
    if (!element) {
      const brandData = el.dataset.brand || '';
      const text = el.textContent.toLowerCase();
      if (brand === 'all' && (brandData === 'all' || text.includes('todos'))) {
        el.classList.add('active');
      } else if (brand !== 'all' && (brandData === brand.toLowerCase() || text.includes(brand.toLowerCase()))) {
        el.classList.add('active');
      }
    }
  });

  if (element) {
    element.classList.add('active');
  }

  // Actualizar píldoras
  document.querySelectorAll('.filter-pills .pill-btn').forEach(btn => {
    if (btn.dataset.brand === brand) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
}

function filterByRange(range, element) {
  appState.currentRange = range;
  document.querySelectorAll('.range-pills .pill-btn').forEach(btn => btn.classList.remove('active'));
  if (element) element.classList.add('active');
  renderProducts();
}

function resetFilters() {
  appState.currentCategory = 'all';
  appState.currentRange = 'all';
  appState.searchQuery = '';
  const searchInput = document.getElementById('mainSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.brand-chip').forEach(el => {
    if ((el.dataset.brand && el.dataset.brand === 'all') || el.textContent.includes('Todos')) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  const allBtn = document.querySelector('.pill-btn[data-brand="all"]');
  if (allBtn) allBtn.classList.add('active');

  renderProducts();
}

function handleSearch(event) {
  appState.searchQuery = event.target.value.trim();
  
  // Si busca mientras está en otra pestaña, cambiamos automáticamente al catálogo
  if (appState.currentSection !== 'marcas') {
    navegarA('marcas');
  }
  
  renderProducts();
}

function scrollToCatalog() {
  navegarA('marcas');
}

// ==========================================
// BANNER PANORÁMICO ESTILO CASUCELL
// ==========================================
let heroSlideTimer = null;
const HERO_SLIDE_DURATION = 5000; // 5 segundos por diapositiva

function initHeroSlider() {
  const carousel = document.getElementById('casuHeroCarousel');
  if (!carousel) return;

  // Iniciar en slide 0
  showHeroSlide(0);

  // Iniciar timer automático
  startHeroTimer();

  // Pausar en hover para permitir interactuar y leer
  carousel.addEventListener('mouseenter', pauseHeroTimer);
  carousel.addEventListener('mouseleave', startHeroTimer);

  // Soporte touch / swipe en móviles
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        changeHeroSlide(1);
      } else {
        changeHeroSlide(-1);
      }
    }
  }, { passive: true });
}

function showHeroSlide(index) {
  const slides = document.querySelectorAll('.casu-slide');
  const segments = document.querySelectorAll('.casu-progress-segment');
  if (slides.length === 0) return;

  const total = slides.length;
  // Rango circular
  appState.activeHeroSlide = (index + total) % total;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === appState.activeHeroSlide);
  });

  segments.forEach((seg, i) => {
    seg.classList.remove('active');
    // Reiniciar animación del fill
    const fill = seg.querySelector('.casu-progress-fill');
    if (fill) {
      fill.style.animation = 'none';
      void fill.offsetHeight; // trigger reflow
      fill.style.animation = '';
    }
  });

  if (segments[appState.activeHeroSlide]) {
    segments[appState.activeHeroSlide].classList.add('active');
  }
}

function changeHeroSlide(delta) {
  showHeroSlide(appState.activeHeroSlide + delta);
  restartHeroTimer();
}

function setHeroSlide(index) {
  showHeroSlide(index);
  restartHeroTimer();
}

function startHeroTimer() {
  pauseHeroTimer();
  heroSlideTimer = setInterval(() => {
    if (appState.currentSection === 'inicio') {
      showHeroSlide(appState.activeHeroSlide + 1);
    }
  }, HERO_SLIDE_DURATION);
}

function pauseHeroTimer() {
  if (heroSlideTimer) {
    clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }
}

function restartHeroTimer() {
  startHeroTimer();
}

// ==========================================
// COUNTDOWN TIMER (OFERTAS FLASH)
// ==========================================
function initCountdownTimer() {
  const hoursEl = document.getElementById('cdHours');
  const minsEl = document.getElementById('cdMins');
  const secsEl = document.getElementById('cdSecs');
  if (!hoursEl || !minsEl || !secsEl) return;

  let totalSeconds = 14 * 3600 + 42 * 60 + 15;

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600;
    }
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ==========================================
// GESTIÓN DEL CARRITO DE COMPRAS
// ==========================================
function addToCart(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = appState.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    appState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
      selectedColor: product.colors[0]
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`¡${product.name.split(' ').slice(0, 3).join(' ')} agregado al carrito!`);
  openCart();
}

function updateCartQty(productId, delta) {
  const item = appState.cart.find(i => i.id === productId);
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
  appState.cart = appState.cart.filter(i => i.id !== productId);
  saveCart();
  renderCartItems();
  updateCartBadge();
  showToast("Producto eliminado del carrito");
}

function saveCart() {
  localStorage.setItem('maccell_cart', JSON.stringify(appState.cart));
}

function updateCartBadge() {
  const count = appState.cart.reduce((acc, item) => acc + item.qty, 0);
  const total = appState.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // Badge numérico en Header y Barra Móvil Inferior
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = count;
  }
  const bottomBadge = document.getElementById('bottomCartBadge');
  if (bottomBadge) {
    bottomBadge.textContent = count;
  }

  // Monto en Soles en el Header
  const headerTotal = document.getElementById('headerCartTotal');
  if (headerTotal) {
    headerTotal.textContent = `S/ ${total.toFixed(2)}`;
  }
}

function openCart() {
  renderCartItems();
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (lottieInstances && lottieInstances.drawerCart) {
    lottieInstances.drawerCart.goToAndPlay(0, true);
  }
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

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Color: ${item.selectedColor || 'Original'}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="btn-qty" onclick="updateCartQty(${item.id}, -1)">-</button>
              <span class="qty-num">${item.qty}</span>
              <button class="btn-qty" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart(${item.id})">
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
// INTEGRACIÓN CON WHATSAPP
// ==========================================
function buyViaWhatsApp(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const message = `¡Hola ${STORE_CONFIG.storeName}! 👋\n` +
    `Estoy interesado(a) en comprar este equipo visto en su página web:\n\n` +
    `📱 *${prod.name}*\n` +
    `💰 *Precio Especial:* ${formatPrice(prod.price)}\n` +
    `🛡️ *Garantía:* 1 Año Oficial\n` +
    `📦 *Entrega:* ¿Tienen stock disponible para entrega hoy en Lima o envío a provincia?\n\n` +
    `¡Muchas gracias!`;

  const url = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function checkoutViaWhatsApp() {
  if (appState.cart.length === 0) {
    showToast("Tu carrito está vacío. Agrega algún celular.");
    return;
  }

  let itemsText = "";
  let total = 0;

  appState.cart.forEach((item, index) => {
    const sub = item.price * item.qty;
    total += sub;
    itemsText += `${index + 1}. *${item.name}* (x${item.qty}) - ${formatPrice(sub)}\n`;
  });

  const message = `¡Hola ${STORE_CONFIG.storeName}! 👋\n` +
    `Deseo confirmar el siguiente pedido desde su tienda web:\n\n` +
    `🛒 *RESUMEN DE EQUIPOS:*\n${itemsText}\n` +
    `💳 *MONTO TOTAL:* ${formatPrice(total)}\n\n` +
    `📍 Deseo coordinar el pago (Contraentrega / Yape / Transferencia / Tarjeta) y datos de entrega.\n` +
    `¿Me podrían brindar los datos por favor?`;

  const url = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==========================================
// VISTA RÁPIDA (MODAL)
// ==========================================
function openQuickView(productId) {
  if (typeof window.openQuickView === 'function') {
    return window.openQuickView(productId);
  }
}

function closeModal() {
  if (typeof window.closeQuickView === 'function') {
    return window.closeQuickView();
  }
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// NOTIFICACIÓN TOAST
// ==========================================
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="#00c0a3" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ==========================================
// CONFIGURACIÓN DE EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  const searchInput = document.getElementById('mainSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeCart();
      cerrarModalClientes();
    }
  });

  // Soporte para botones Atrás/Adelante del navegador
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    if (['inicio', 'nosotros', 'marcas', 'ubicanos', 'contacto', 'delivery'].includes(hash)) {
      navegarA(hash);
    }
  });
}

// ==========================================
// MÓDULO: CLIENTES FELICES (ESTILO INSTAGRAM)
// ==========================================
const CLIENTES_DATA = [
  { id: 1, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_1.jpg", brand: "apple", device: "iPhone 15 Pro Max", likes: 248, time: "Hace 2 horas", caption: "¡Entrega exitosa! Cliente feliz estrenando su iPhone 15 Pro Max sellado y con garantía oficial de MacCell 🍏✨ ¡A disfrutarlo al máximo!" },
  { id: 2, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_2.jpg", brand: "samsung", device: "Galaxy S24 Ultra", likes: 195, time: "Hace 4 horas", caption: "Potencia pura con Galaxy AI 🤖 Cliente satisfecho llevándose su S24 Ultra en nuestra tienda física en CC Plaza TEC. ¡Muchas gracias por la preferencia!" },
  { id: 3, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_3.jpg", brand: "poco", device: "POCO X6 Pro 5G", likes: 312, time: "Hace 6 horas", caption: "¡Furia gamer desatada! 🎮 Cliente contento con su nuevo POCO X6 Pro 5G al mejor precio de Lima. ¡Gracias por confiar en MacCell!" },
  { id: 4, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_4.jpg", brand: "honor", device: "Honor Magic 6 Pro", likes: 174, time: "Ayer", caption: "Retratos de nivel profesional y pantalla ultra resistente 📸✨ Cliente feliz con su Honor Magic sellado de fábrica." },
  { id: 5, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_5.jpg", brand: "xiaomi", device: "Xiaomi 14 Ultra Leica", likes: 289, time: "Ayer", caption: "La cúspide de la fotografía móvil en manos de nuestro estimado cliente. ¡Garantía de 1 año y accesorios de regalo! 🎁" },
  { id: 6, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_6.jpg", brand: "apple", device: "iPhone 16 Pro Max", likes: 452, time: "Hace 2 días", caption: "Titanio desierto impecable ✈️ Entrega presencial rápida y segura. ¡Bienvenido a la familia MacCell! 📱" },
  { id: 7, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_7.jpg", brand: "samsung", device: "Galaxy A55 5G", likes: 163, time: "Hace 2 días", caption: "Calidad y durabilidad garantizada. Marco de metal y pantalla Super AMOLED entregado a cliente satisfecho 💯" },
  { id: 8, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_8.jpg", brand: "poco", device: "POCO F6 Pro 5G", likes: 278, time: "Hace 3 días", caption: "¡Velocidad extrema con Snapdragon 8 Gen 2 y carga de 120W! Cliente súper contento con su compra ⚡" },
  { id: 9, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_9.jpg", brand: "xiaomi", device: "Redmi Note 13 Pro+", likes: 219, time: "Hace 3 días", caption: "Cámara de 200MP para capturar cada momento. Sellado con boleta legal y entrega inmediata en Lima 🛍️" },
  { id: 10, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_10.jpg", brand: "apple", device: "iPhone 15 128GB", likes: 341, time: "Hace 4 días", caption: "Colores increíbles y Dynamic Island. Otra sonrisa más gracias a MacCell 🍏🙌" },
  { id: 11, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_11.jpg", brand: "honor", device: "Honor 200 Pro", likes: 185, time: "Hace 4 días", caption: "Estudio Harcourt de París en tus manos. Cliente feliz renovando su equipo con nosotros 🎨✨" },
  { id: 12, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_12.jpg", brand: "samsung", device: "Galaxy S23 FE", likes: 147, time: "Hace 5 días", caption: "¡Gran elección! Experiencia premium de Galaxy a un precio insuperable. Gracias por elegirnos 💫" },
  { id: 13, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_13.jpg", brand: "apple", device: "iPhone 14 Pro", likes: 260, time: "Hace 5 días", caption: "Equipo como nuevo, batería al 100% y garantía por escrito. ¡Cliente satisfecho! 🤝" },
  { id: 14, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_14.jpg", brand: "xiaomi", device: "Xiaomi Pad 6", likes: 198, time: "Hace 6 días", caption: "Para productividad y estudio 📚 Tablet Xiaomi entregada a cliente feliz en nuestra tienda de Plaza TEC." },
  { id: 15, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_15.jpg", brand: "poco", device: "POCO X6 5G", likes: 230, time: "Hace 6 días", caption: "Pantalla AMOLED 1.5K y gran rendimiento. ¡Gracias por tu compra y preferencia! 🚀" },
  { id: 16, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_16.jpg", brand: "honor", device: "Honor X8b", likes: 142, time: "Hace 1 semana", caption: "Cámara selfie de 50MP y diseño ultra delgado. ¡Cliente feliz estrenando su Honor! 🌟" },
  { id: 17, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_17.jpg", brand: "apple", device: "iPhone 13 128GB", likes: 388, time: "Hace 1 semana", caption: "El favorito de siempre. Potencia garantizada y el mejor precio de Lima en MacCell 🍏" },
  { id: 18, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_18.jpg", brand: "samsung", device: "Galaxy S24+", likes: 215, time: "Hace 1 semana", caption: "Elegancia y máxima pantalla QHD+. Cliente satisfecho con su nuevo buque insignia 🏆" },
  { id: 19, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_19.jpg", brand: "xiaomi", device: "Redmi 13C", likes: 128, time: "Hace 1 semana", caption: "Económico, confiable y con gran batería. ¡Muchas gracias por la confianza amigo! 📱" },
  { id: 20, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_20.jpg", brand: "poco", device: "POCO M6 Pro", likes: 175, time: "Hace 2 semanas", caption: "120Hz Flow AMOLED a precio inmejorable. ¡Entrega express y cliente feliz! 🛵⚡" },
  { id: 21, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_21.jpg", brand: "apple", device: "iPhone 15 Plus", likes: 298, time: "Hace 2 semanas", caption: "Batería legendaria y pantalla gigante de 6.7 pulgadas. ¡Felicidades por tu nuevo iPhone! 🎉" },
  { id: 22, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_22.jpg", brand: "honor", device: "Honor 90 5G", likes: 164, time: "Hace 2 semanas", caption: "Pantalla curva de 3840Hz sin fatiga visual. ¡Gracias por confiar en nosotros! 👓✨" },
  { id: 23, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_23.jpg", brand: "samsung", device: "Galaxy Z Flip 5", likes: 334, time: "Hace 2 semanas", caption: "Innovación plegable que cabe en cualquier bolsillo. Cliente encantado con su Galaxy Z Flip 🕶️" },
  { id: 24, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_24.jpg", brand: "xiaomi", device: "Xiaomi 13T Pro", likes: 226, time: "Hace 3 semanas", caption: "Carga de 120W y cámaras Leica. ¡Una bestia entregada con éxito en Lima! ⚡" },
  { id: 25, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_25.jpg", brand: "apple", device: "iPhone 12 128GB", likes: 250, time: "Hace 3 semanas", caption: "Diseño premium y compatibilidad 5G. ¡Cliente satisfecho con su garantía de 1 año! 🛡️" },
  { id: 26, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_26.jpg", brand: "poco", device: "POCO X5 Pro 5G", likes: 189, time: "Hace 3 semanas", caption: "Snapdragon 778G y peso pluma. ¡Cliente feliz llevándose su equipo sellado! 📦" },
  { id: 27, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_27.jpg", brand: "samsung", device: "Galaxy A35 5G", likes: 145, time: "Hace 3 semanas", caption: "Resistencia al agua IP67 y pantalla fluida de 120Hz. ¡Gracias por la compra! 💧" },
  { id: 28, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_28.jpg", brand: "honor", device: "Honor Magic 5 Pro", likes: 210, time: "Hace 1 mes", caption: "Zoom periscópico de 100x y gran autonomía. ¡Cliente contento con su compra en MacCell! 🔭" },
  { id: 29, img: "assets/img/ui/clientes-satisfechos/fotos/cliente_29.jpg", brand: "apple", device: "iPhone 14 128GB", likes: 315, time: "Hace 1 mes", caption: "¡Cerramos el mes con otro cliente feliz! Gracias a todos por hacer crecer la familia MacCell ❤️" }
];

let clienteLikedState = {};

function abrirModalClientes(filtro = 'todos') {
  const overlay = document.getElementById('modalClientesOverlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  filtrarFotosClientes(filtro);
}

function cerrarModalClientes(e) {
  if (e && e.target && e.target !== e.currentTarget && !e.target.closest('.ig-modal-close')) {
    return;
  }
  const overlay = document.getElementById('modalClientesOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function filtrarFotosClientes(filtro, btn) {
  if (btn) {
    document.querySelectorAll('.ig-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  let fotos = CLIENTES_DATA;
  if (filtro && filtro !== 'todos') {
    fotos = CLIENTES_DATA.filter(c => c.brand.toLowerCase() === filtro.toLowerCase() || (filtro === 'xiaomi' && (c.brand === 'xiaomi' || c.brand === 'poco')));
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
        <!-- Top bar con avatar y usuario -->
        <div class="ig-post-top">
          <div class="ig-post-user">
            <img src="Logo.jpeg" alt="MacCell" class="ig-post-avatar">
            <div class="ig-post-meta">
              <span class="ig-post-username">maccell.pe</span>
              <span class="ig-post-location">CC Plaza TEC, Lima</span>
            </div>
          </div>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="color: #94a3b8;">
            <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
          </svg>
        </div>

        <!-- Imagen del cliente con doble toque para dar corazón -->
        <div class="ig-post-img-wrap" ondblclick="doubleClickHeart(${c.id}, event)">
          <img src="${c.img}" alt="${c.device}" loading="lazy">
          <div class="ig-heart-pop" id="heartPop-${c.id}">❤️</div>
        </div>

        <!-- Barra de acciones: Like, WhatsApp Oficial, Compartir, Guardar -->
        <div class="ig-post-actions">
          <div class="ig-action-left">
            <button class="ig-action-icon ${isLiked ? 'liked' : ''}" onclick="toggleLikeCliente(${c.id}, event)" title="Me gusta">
              <svg width="22" height="22" fill="${isLiked ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
              </svg>
            </button>
            <!-- Botón WhatsApp reemplazando el icono de burbuja -->
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

        <!-- Info del post: Likes, Dispositivo Entregado y Fecha (Sin comentarios incoherentes) -->
        <div class="ig-post-info">
          <div class="ig-post-likes">${currentLikes.toLocaleString()} Me gusta</div>
          <div style="font-size: 0.8rem; font-weight: 700; color: #00b4d8; margin-bottom: 4px;">
            📱 ${c.device} • Entrega Presencial
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

// ==========================================
// MÓDULO: ACCESORIOS (MOVIMIENTO Y WHATSAPP)
// ==========================================
function scrollAccesoriosTrack(direction) {
  const wrapper = document.getElementById('accesoriosMotionWrapper');
  if (!wrapper) return;
  const scrollAmount = 260 * direction;
  wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function pedirAccesorioWhatsApp(nombre, precio) {
  const phone = STORE_CONFIG.whatsappNumber;
  const text = encodeURIComponent(`¡Hola MacCell! 👋 Vengo de la página web y deseo pedir el accesorio:\n\n🔌 *${nombre}*\n💰 Precio: *S/ ${precio}*\n\n¿Tienen stock disponible para entrega inmediata?`);
  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
}

function consultarClienteWhatsApp(device) {
  const phone = STORE_CONFIG.whatsappNumber;
  const text = encodeURIComponent(`¡Hola MacCell! 👋 Vi en su galería de clientes entregas del equipo: *${device}*.\n\n¿Tienen este modelo en stock disponible para entrega hoy y cuál es el precio actual? ¡Gracias!`);
  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
}

function iniciarMovimientoAccesorios() {
  const wrapper = document.getElementById('accesoriosMotionWrapper');
  const track = document.getElementById('accesoriosTrack');
  if (!wrapper || !track) return;

  // 1. Clonar las tarjetas originales para crear un carrusel continuo e infinito sin saltos
  const originalCards = Array.from(track.children);
  if (originalCards.length === 0) return;

  if (!track.dataset.cloned) {
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
    track.dataset.cloned = 'true';
  }

  // 2. Calcular la distancia exacta de un ciclo completo (ancho del primer set de tarjetas)
  let resetDistance = 0;
  function updateResetDistance() {
    if (track.children.length > originalCards.length) {
      const firstClone = track.children[originalCards.length];
      const firstCard = track.children[0];
      resetDistance = firstClone.offsetLeft - firstCard.offsetLeft;
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
  const pixelsPerSecond = 36; // Velocidad fluida, elegante y legible

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
    }, 1000);
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

// ==========================================
// MÓDULO: NAVEGACIÓN Y MENÚ MÓVIL RESPONSIVE
// ==========================================
function toggleMenuMovil() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const menuBtn = document.getElementById('mobileMenuBtn');
  if (!drawer) return;

  const isOpen = drawer.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('open', isOpen);
  
  if (menuBtn) {
    const lottieHam = menuBtn.querySelector('#lottieNavMenu');
    const iconHam = menuBtn.querySelector('.icon-hamburger');
    const iconClose = menuBtn.querySelector('.icon-close-menu');
    if (lottieHam && iconClose) {
      lottieHam.style.display = isOpen ? 'none' : 'flex';
      iconClose.style.display = isOpen ? 'block' : 'none';
    } else if (iconHam && iconClose) {
      iconHam.style.display = isOpen ? 'none' : 'block';
      iconClose.style.display = isOpen ? 'block' : 'none';
    }
  }

  // Prevenir scroll en el fondo cuando el menú está abierto
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function handleMobileSearch(e) {
  const query = e.target.value;
  appState.searchQuery = query;
  if (appState.currentSection !== 'marcas') {
    navegarA('marcas');
  }
  renderProducts();
}

function scrollHaciaAccesorios() {
  if (appState.currentSection !== 'inicio') {
    navegarA('inicio');
    setTimeout(() => {
      const seccion = document.getElementById('seccionAccesorios');
      if (seccion) {
        seccion.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  } else {
    const seccion = document.getElementById('seccionAccesorios');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Actualizar item activo en bottom nav
  document.querySelectorAll('.mobile-bottom-item').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector('.mobile-bottom-item[data-bottom="accesorios"]');
  if (btn) btn.classList.add('active');
}

// ===================================================
// MÓDULO: GESTIÓN DE ICONOS ANIMADOS (LOTTIE BODIES)
// ===================================================
let lottieInstances = {};

function initLottieIcons() {
  if (typeof lottie === 'undefined') {
    console.warn('Lottie library no está disponible');
    return;
  }

  const loadLottie = (elementId, dataKey, options = {}) => {
    const el = document.getElementById(elementId);
    if (!el) return null;
    el.innerHTML = '';

    const animData = (window.MaccellAnimatedData && window.MaccellAnimatedData[dataKey]) ? window.MaccellAnimatedData[dataKey] : null;

    const fileMap = {
      navMenu: '3 rayitas para el nav.json',
      cart: 'lottieflow-ecommerce-14-9-000000-easey.json',
      whatsapp: 'whatsapp animado.json',
      instagram: 'ig animado.json',
      facebook: 'facebook animado.json',
      ubicacion: 'ubicacionanimacion.json',
      contacto: 'contactanos.json'
    };

    const config = {
      container: el,
      renderer: 'svg',
      loop: options.loop !== undefined ? options.loop : true,
      autoplay: options.autoplay !== undefined ? options.autoplay : true
    };

    if (animData) {
      config.animationData = animData;
    } else {
      config.path = 'iconos animados/' + encodeURIComponent(fileMap[dataKey]);
    }

    try {
      const anim = lottie.loadAnimation(config);
      return anim;
    } catch (err) {
      console.error('Error cargando animación Lottie:', dataKey, err);
      return null;
    }
  };

  // 1. Menú Hamburguesa Móvil (3 rayitas para el nav)
  lottieInstances.navMenu = loadLottie('lottieNavMenu', 'navMenu', { loop: true, autoplay: true });

  // 2. Carrito de Compras (Header y Drawer)
  lottieInstances.headerCart = loadLottie('lottieHeaderCart', 'cart', { loop: true, autoplay: true });
  lottieInstances.drawerCart = loadLottie('lottieDrawerCart', 'cart', { loop: true, autoplay: true });

  // 3. WhatsApp (Botón Flotante, Barra Inferior Móvil y Footer)
  lottieInstances.floatWa = loadLottie('lottieFloatWa', 'whatsapp', { loop: true, autoplay: true });
  lottieInstances.bottomWa = loadLottie('lottieBottomWa', 'whatsapp', { loop: true, autoplay: true });
  lottieInstances.footerWa = loadLottie('lottieFooterWa', 'whatsapp', { loop: true, autoplay: true });

  // 4. Instagram (Banner Clientes Felices y Footer)
  lottieInstances.bannerIg = loadLottie('lottieBannerIg', 'instagram', { loop: true, autoplay: true });
  lottieInstances.footerIg = loadLottie('lottieFooterIg', 'instagram', { loop: true, autoplay: true });

  // 5. Facebook (Footer)
  lottieInstances.footerFb = loadLottie('lottieFooterFb', 'facebook', { loop: true, autoplay: true });

  // 6. Ubicación (Ubícanos en Plaza TEC)
  lottieInstances.ubicacion = loadLottie('lottieUbicanos', 'ubicacion', { loop: true, autoplay: true });

  // 7. Contáctanos (Asesoría y Cotización)
  lottieInstances.contacto = loadLottie('lottieContactanos', 'contacto', { loop: true, autoplay: true });
}



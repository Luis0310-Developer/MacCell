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

const FALLBACK_ACCESORIOS = [
  {
    "id": "acc-cubo-20w-apple",
    "nombre": "CUBO 20W APPLE",
    "name": "CUBO 20W APPLE",
    "tipo": "Cargador Rápido",
    "brand": "Apple",
    "precio": 65,
    "price": 65,
    "originalPrice": 89,
    "imagen": "assets/img/ui/accesorios/cubo_20w_apple.webp",
    "image": "assets/img/ui/accesorios/cubo_20w_apple.webp",
    "badge": "100% ORIGINAL",
    "specs": ["Carga Rápida 20W", "Conector USB-C", "Compatibilidad iPhone / iPad"]
  },
  {
    "id": "acc-cubo-40w-apple",
    "nombre": "CUBO 40W APPLE DUAL",
    "name": "CUBO 40W APPLE DUAL",
    "tipo": "Cargador Dual",
    "brand": "Apple",
    "precio": 95,
    "price": 95,
    "originalPrice": 129,
    "imagen": "assets/img/ui/accesorios/cubo_40w_apple.webp",
    "image": "assets/img/ui/accesorios/cubo_40w_apple.webp",
    "badge": "DOBLE PUERTO",
    "specs": ["Doble Puerto USB-C", "40W Potencia Total", "Chip de Seguridad"]
  },
  {
    "id": "acc-cubo-25w-samsung",
    "nombre": "CUBO 25W SAMSUNG SUPER FAST",
    "name": "CUBO 25W SAMSUNG SUPER FAST",
    "tipo": "Cargador Rápido",
    "brand": "Samsung",
    "precio": 55,
    "price": 55,
    "originalPrice": 79,
    "imagen": "assets/img/ui/accesorios/cubo_25w_samsung.webp",
    "image": "assets/img/ui/accesorios/cubo_25w_samsung.webp",
    "badge": "SUPER FAST",
    "specs": ["Super Fast Charging 25W", "PD 3.0 PPS", "Certificado Samsung"]
  },
  {
    "id": "acc-cubo-45w-samsung",
    "nombre": "CUBO 45W SAMSUNG ULTRA FAST",
    "name": "CUBO 45W SAMSUNG ULTRA FAST",
    "tipo": "Cargador Ultra",
    "brand": "Samsung",
    "precio": 85,
    "price": 85,
    "originalPrice": 119,
    "imagen": "assets/img/ui/accesorios/cubo_45w_samsung.webp",
    "image": "assets/img/ui/accesorios/cubo_45w_samsung.webp",
    "badge": "45W ULTRA",
    "specs": ["Carga Ultra Rápida 2.0", "Compatible Galaxy S24 Ultra", "Incluye Cable 5A"]
  },
  {
    "id": "acc-honor-earbuds-x7-lite",
    "nombre": "HONOR EARBUDS X7 LITE",
    "name": "HONOR EARBUDS X7 LITE",
    "tipo": "Audífonos Inalámbricos",
    "brand": "Honor",
    "precio": 99,
    "price": 99,
    "originalPrice": 139,
    "imagen": "assets/img/ui/accesorios/honor_earbuds_x7_lite.webp",
    "image": "assets/img/ui/accesorios/honor_earbuds_x7_lite.webp",
    "badge": "BLUETOOTH 5.3",
    "specs": ["Batería hasta 28 Horas", "Cancelación de Ruido AI", "Control Táctil"]
  },
  {
    "id": "acc-galaxy-buds-core",
    "nombre": "GALAXY BUDS CORE",
    "name": "GALAXY BUDS CORE",
    "tipo": "Audífonos Inalámbricos",
    "brand": "Samsung",
    "precio": 149,
    "price": 149,
    "originalPrice": 199,
    "imagen": "assets/img/ui/accesorios/galaxy_buds_core.webp",
    "image": "assets/img/ui/accesorios/galaxy_buds_core.webp",
    "badge": "SONIDO AKG",
    "specs": ["Sonido Hi-Fi AKG", "Diseño Ergonómico", "Conexión Instantánea Galaxy"]
  },
  {
    "id": "acc-buds-6-play",
    "nombre": "BUDS 6 PLAY INALÁMBRICO",
    "name": "BUDS 6 PLAY INALÁMBRICO",
    "tipo": "Audífonos Inalámbricos",
    "brand": "Xiaomi",
    "precio": 69,
    "price": 69,
    "originalPrice": 99,
    "imagen": "assets/img/ui/accesorios/buds_6_play.webp",
    "image": "assets/img/ui/accesorios/buds_6_play.webp",
    "badge": "BAJOS POTENTES",
    "specs": ["Driver Dinámico 12mm", "Latencia Ultrabaja", "Resistente a Salpicaduras"]
  },
  {
    "id": "acc-cable-iphone",
    "nombre": "CABLE DE IPHONE USB-C / LIGHTNING",
    "name": "CABLE DE IPHONE USB-C / LIGHTNING",
    "tipo": "Cable de Datos y Carga",
    "brand": "Apple",
    "precio": 39,
    "price": 39,
    "originalPrice": 59,
    "imagen": "assets/img/ui/accesorios/cable_iphone.webp",
    "image": "assets/img/ui/accesorios/cable_iphone.webp",
    "badge": "ALTA DURABILIDAD",
    "specs": ["Carga Rápida Power Delivery", "Transferencia 480 Mbps", "Conector Reforzado"]
  }
];

// Helper para obtener la lista de accesorios
function getAccessoriesList() {
  if (typeof window !== 'undefined' && Array.isArray(window.accesorios) && window.accesorios.length > 0) {
    return window.accesorios;
  }
  if (typeof accesorios !== 'undefined' && Array.isArray(accesorios) && accesorios.length > 0) {
    return accesorios;
  }
  return FALLBACK_ACCESORIOS;
}

// Helper para formato de moneda
function formatPrice(amount) {
  return "S/ " + Number(amount || 0).toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Mapa de colores oficiales y tonos metálicos realistas
const SMARTPHONE_COLOR_MAP = {
  // Apple iPhone
  "titanio desierto": "#c5a787",
  "titanio natural": "#9f9891",
  "titanio negro": "#1e2022",
  "titanio blanco": "#f5f5f7",
  "negro espacial": "#1b1b1d",
  "plata": "#e3e4e5",
  "oro": "#fae7cf",
  "azul": "#3b82f6",
  "verde": "#2e7d32",
  "rosa": "#f4a6b8",
  "medianoche": "#1a1e24",
  "blanco estelar": "#f9f6ef",
  
  // Samsung Galaxy
  "gris titanio": "#686a6e",
  "negro titanio": "#212124",
  "violeta titanio": "#685b7b",
  "amarillo titanio": "#e6db74",
  "crema": "#eeebe3",
  "fantasma negro": "#17181a",
  "iceblue": "#93c5fd",
  "navy": "#1e3a8a",
  
  // Xiaomi & Leica
  "negro cuero vegano": "#1f2022",
  "blanco": "#fcfcfc",
  "negro": "#141517",
  "azul leica": "#1d4ed8",
  "verde aurora": "#10b981",
  
  // Motorola
  "madera nórdica": "#966f33",
  "peach fuzz pantone": "#ffbe98",
  "negro eclipse": "#1a1c20",
  "verde liana": "#435d49",
  
  // Honor
  "verde esmeralda": "#1b4d3e",
  "negro medianoche": "#16181d",
  "azul océano": "#1e3a8a",
  
  // POCO & Infinix
  "amarillo poco": "#ffd600",
  "gris titán": "#64748b",
  "azul estelar": "#2563eb",
  "dorado": "#d4af37",
  "verde ciprés": "#2d6a4f"
};

function getSwatchHex(colorName) {
  if (!colorName) return "#64748b";
  const normalized = colorName.toLowerCase().trim();
  for (const [key, val] of Object.entries(SMARTPHONE_COLOR_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return val;
    }
  }
  if (normalized.includes('negro') || normalized.includes('black')) return '#1e2022';
  if (normalized.includes('blanco') || normalized.includes('white')) return '#f8fafc';
  if (normalized.includes('gris') || normalized.includes('gray') || normalized.includes('silver')) return '#64748b';
  if (normalized.includes('azul') || normalized.includes('blue')) return '#2563eb';
  if (normalized.includes('verde') || normalized.includes('green')) return '#16a34a';
  if (normalized.includes('oro') || normalized.includes('gold') || normalized.includes('dorado')) return '#d4af37';
  if (normalized.includes('violeta') || normalized.includes('morado') || normalized.includes('purple')) return '#7c3aed';
  if (normalized.includes('amarillo') || normalized.includes('yellow')) return '#eab308';
  return '#475569';
}

function selectCardColor(button, id, colorName) {
  const card = button.closest('.product-card');
  if (card) {
    card.dataset.selectedColor = colorName;
    const dots = card.querySelectorAll('.card-swatch-dot');
    dots.forEach(d => d.classList.remove('active'));
    button.classList.add('active');
    const label = card.querySelector('.card-swatch-name-label');
    if (label) label.textContent = colorName;
  }
}
if (typeof window !== 'undefined') {
  window.selectCardColor = selectCardColor;
  window.getSwatchHex = getSwatchHex;
}

// Helper para resolver rutas de imágenes según el directorio actual (/pages/ vs raíz)
function resolveAssetPath(path) {
  if (!path) return '';
  if (typeof path === 'string' && path.includes('res.cloudinary.com') && path.includes('/image/upload/') && !path.includes('/image/upload/e_trim/')) {
    path = path.replace('/image/upload/', '/image/upload/e_trim/');
  }
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
      currentSort: 'relevance',
      searchQuery: '',
      compareList: [],
      isCompareMode: false,
      catalogViewMode: 'grid',
      highlightDiff: false
    };
  } else {
    if (!Array.isArray(window.appState.compareList)) window.appState.compareList = [];
    if (typeof window.appState.isCompareMode === 'undefined') window.appState.isCompareMode = false;
    if (typeof window.appState.currentSort === 'undefined') window.appState.currentSort = 'relevance';
    if (!window.appState.catalogViewMode) window.appState.catalogViewMode = 'grid';
    if (typeof window.appState.highlightDiff === 'undefined') window.appState.highlightDiff = false;
  }
}

function isProductInCompare(id) {
  if (typeof appState === 'undefined' || !Array.isArray(appState.compareList)) return false;
  return appState.compareList.includes(String(id));
}

// ==========================================
// ALGORITMO DE DISTRIBUCIÓN ARMÓNICA DE MODELOS
// ==========================================
// Extrae una clave representativa de la familia de modelo
// (omite variaciones de RAM, ROM/GB, red 4G/5G, Libre/Registrado y SIM)
function getProductModelKey(p) {
  if (!p) return 'unknown';
  const brand = (p.brand || p.marca || '').toLowerCase().trim();
  const rawName = (p.name || p.nombre || '').toLowerCase();

  const cleanName = rawName
    .replace(/\s*\([^)]*\)/g, '')            // Remueve paréntesis ej: (4GB RAM), (8+8GB RAM)
    .replace(/\b\d+\s*(gb|tb)\b/gi, '')      // Remueve capacidades ej: 128GB, 256GB, 1TB
    .replace(/\b(4g|5g|lte|wifi)\b/gi, '')   // Remueve bandas 4G, 5G
    .replace(/\b(single|dual)\s*sim\b/gi, '') // Remueve tipo de SIM
    .replace(/\b(libre|registrado)\b/gi, '') // Remueve estado de registro
    .replace(/\s+/g, ' ')
    .trim();

  return brand + '::' + cleanName;
}

// Algoritmo para distribuir y alternar variantes y marcas en el catálogo
// Evita que modelos idénticos aparezcan consecutivos, manteniendo un ritmo
// visual variado, atractivo y balanceado entre gamas altas y accesibles.
function distributeCatalogProducts(list, isMultiBrand) {
  if (!list || list.length <= 2) return list ? [...list] : [];

  // MODO MULTI-MARCA: Intercala equilibradamente entre todas las marcas del catálogo
  if (isMultiBrand) {
    const brandMap = new Map();
    list.forEach(p => {
      const b = (p.brand || p.marca || 'other').toLowerCase();
      if (!brandMap.has(b)) brandMap.set(b, []);
      brandMap.get(b).push(p);
    });

    const brandQueues = [];
    for (const [, items] of brandMap.entries()) {
      brandQueues.push(distributeCatalogProducts(items, false));
    }

    // Ordenar de mayor a menor cantidad para espaciar mejor marcas grandes
    brandQueues.sort((a, b) => b.length - a.length);

    const result = [];
    let added = true;
    while (added) {
      added = false;
      for (let i = 0; i < brandQueues.length; i++) {
        if (brandQueues[i].length > 0) {
          result.push(brandQueues[i].shift());
          added = true;
        }
      }
    }
    return result;
  }

  // MODO MONO-MARCA: Agrupa por familia de modelo (Galaxy A17, S26 Ultra, etc.)
  const modelMap = new Map();
  list.forEach(p => {
    const key = getProductModelKey(p);
    if (!modelMap.has(key)) modelMap.set(key, []);
    modelMap.get(key).push(p);
  });

  // Ordenar internamente variantes de menor a mayor precio
  for (const items of modelMap.values()) {
    items.sort((a, b) => Number(a.price || a.precio || 0) - Number(b.price || b.precio || 0));
  }

  // Calcular precio promedio para alternar gamas de entrada con buques insignia
  const families = Array.from(modelMap.entries()).map(([key, items]) => {
    const avgPrice = items.reduce((s, x) => s + Number(x.price || x.precio || 0), 0) / items.length;
    return { key, items, avgPrice };
  });

  families.sort((a, b) => a.avgPrice - b.avgPrice);

  const mid = Math.ceil(families.length / 2);
  const lower = families.slice(0, mid);
  const upper = families.slice(mid).reverse();

  const orderedQueues = [];
  const maxLen = Math.max(lower.length, upper.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < upper.length) orderedQueues.push(upper[i]);
    if (i < lower.length) orderedQueues.push(lower[i]);
  }

  const result = [];
  let remaining = list.length;

  // Extracción round-robin evitando duplicados consecutivos
  while (remaining > 0) {
    let progressed = false;
    for (let i = 0; i < orderedQueues.length; i++) {
      const q = orderedQueues[i];
      if (q.items.length > 0) {
        const lastItem = result.length > 0 ? result[result.length - 1] : null;
        if (lastItem && getProductModelKey(lastItem) === q.key && orderedQueues.some((other, idx) => idx !== i && other.items.length > 0)) {
          continue;
        }
        result.push(q.items.shift());
        remaining--;
        progressed = true;
      }
    }
    if (!progressed) {
      for (let i = 0; i < orderedQueues.length; i++) {
        if (orderedQueues[i].items.length > 0) {
          result.push(orderedQueues[i].items.shift());
          remaining--;
          break;
        }
      }
    }
  }

  // Pase de intercambio seguro para garantizar 0 modelos idénticos continuos
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < result.length - 1; i++) {
      const keyI = getProductModelKey(result[i]);
      const keyNext = getProductModelKey(result[i + 1]);
      if (keyI === keyNext) {
        for (let j = 0; j < result.length; j++) {
          if (j === i || j === i + 1) continue;
          const keyJ = getProductModelKey(result[j]);
          if (keyJ === keyI) continue;

          const prevOfI1 = keyI;
          const nextOfI1 = (i + 2 < result.length) ? getProductModelKey(result[i + 2]) : null;
          if (keyJ === prevOfI1 || (nextOfI1 !== null && keyJ === nextOfI1)) continue;

          const prevOfJ = (j > 0) ? getProductModelKey(result[j - 1]) : null;
          const nextOfJ = (j + 1 < result.length) ? getProductModelKey(result[j + 1]) : null;
          if ((prevOfJ !== null && prevOfJ === keyI) || (nextOfJ !== null && nextOfJ === keyI)) continue;

          const temp = result[i + 1];
          result[i + 1] = result[j];
          result[j] = temp;
          break;
        }
      }
    }
  }

  return result;
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
    const prodName = (prod.name || prod.nombre || '').toLowerCase();

    let matchCategory = false;
    const catLower = currentCategory.toLowerCase();
    if (catLower === 'all') {
      matchCategory = true;
    } else if (catLower === 'apple') {
      matchCategory = categoryName.includes('apple') || brandName.includes('apple') || prodName.includes('iphone');
    } else if (catLower === 'samsung') {
      matchCategory = categoryName.includes('samsung') || brandName.includes('samsung') || prodName.includes('galaxy');
    } else if (catLower === 'xiaomi' || catLower === 'redmi') {
      matchCategory = categoryName.includes('xiaomi') || brandName.includes('xiaomi') || categoryName.includes('redmi') || brandName.includes('redmi') || prodName.includes('redmi') || prodName.includes('xiaomi');
    } else if (catLower === 'poco') {
      matchCategory = categoryName.includes('poco') || brandName.includes('poco') || prodName.includes('poco');
    } else if (catLower === 'honor') {
      matchCategory = categoryName.includes('honor') || brandName.includes('honor') || prodName.includes('honor');
    } else if (catLower === 'motorola') {
      matchCategory = categoryName.includes('motorola') || brandName.includes('motorola') || prodName.includes('moto');
    } else if (catLower === 'infinix') {
      matchCategory = categoryName.includes('infinix') || brandName.includes('infinix') || prodName.includes('infinix');
    } else if (catLower === 'oppo') {
      matchCategory = categoryName.includes('oppo') || brandName.includes('oppo') || prodName.includes('oppo');
    } else if (catLower === 'realme') {
      matchCategory = categoryName.includes('realme') || brandName.includes('realme') || prodName.includes('realme');
    } else if (catLower === 'google') {
      matchCategory = categoryName.includes('google') || brandName.includes('google') || prodName.includes('pixel') || prodName.includes('google');
    } else if (catLower === 'zte') {
      matchCategory = categoryName.includes('zte') || brandName.includes('zte') || brandName.includes('nubia') || prodName.includes('zte') || prodName.includes('nubia') || prodName.includes('redmagic');
    } else if (catLower === 'tecno') {
      matchCategory = categoryName.includes('tecno') || brandName.includes('tecno') || prodName.includes('tecno') || prodName.includes('spark');
    } else {
      matchCategory = categoryName === catLower || brandName === catLower || prodName.includes(catLower);
    }

    const prodRange = (prod.range || '').toLowerCase();
    const prodPrice = prod.price || prod.precio || 0;
    let matchRange = false;
    if (currentRange === 'all') {
      matchRange = true;
    } else if (currentRange === 'budget-low') {
      matchRange = prodPrice <= 1500;
    } else if (currentRange === 'budget-mid') {
      matchRange = prodPrice > 1500 && prodPrice <= 3000;
    } else if (currentRange === 'budget-high') {
      matchRange = prodPrice > 3000;
    } else {
      matchRange = prodRange === currentRange.toLowerCase();
    }

    const proc = (prod.specsObj && prod.specsObj.processor ? prod.specsObj.processor : (Array.isArray(prod.specs) ? prod.specs.join(' ') : '')).toLowerCase();
    const matchSearch = searchQuery === '' || 
      prodName.includes(searchQuery) ||
      brandName.includes(searchQuery) ||
      proc.includes(searchQuery);

    return matchCategory && matchRange && matchSearch;
  });

  // Ordenamiento de productos (Relevancia, Menor a Mayor, Mayor a Menor)
  const currentSort = (typeof appState !== 'undefined' && appState.currentSort) ? appState.currentSort : 'relevance';
  if (currentSort === 'price-asc') {
    // Orden estricto por precio menor a mayor solicitado por el usuario
    filtered.sort((a, b) => Number(a.price || a.precio || 0) - Number(b.price || b.precio || 0));
  } else if (currentSort === 'price-desc') {
    // Orden estricto por precio mayor a menor solicitado por el usuario
    filtered.sort((a, b) => Number(b.price || b.precio || 0) - Number(a.price || a.precio || 0));
  } else if (currentSort === 'relevance' && searchQuery === '') {
    // Modo predeterminado (relevancia y sin búsqueda de texto):
    // Distribuimos los modelos armónicamente para intercalar variantes repetidas
    const isMultiBrand = currentCategory.toLowerCase() === 'all';
    filtered = distributeCatalogProducts(filtered, isMultiBrand);
  }

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
  // Distribuir para exhibir modelos y marcas variadas en la portada
  const distributed = distributeCatalogProducts(allProducts, true);
  const featured = distributed.slice(0, 4);
  container.innerHTML = featured.map(prod => buildProductCardHtml(prod)).join('');
}

// Plantilla HTML de cada Tarjeta de Celular (con opción de Comparar)
function buildProductCardHtml(prod) {
  const price = prod.price || prod.precio || 0;
  const originalPrice = prod.originalPrice || price;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const brand = prod.brand || prod.marca || '';
  const name = prod.name || prod.nombre || '';
  const id = prod.id;
  const rawImage = prod.image || prod.imagen || '';
  const image = resolveAssetPath(rawImage);
  const fallbackLogo = resolveAssetPath('assets/img/ui/Logo.jpeg');
  const brandLower = (prod.brand || prod.marca || '').toLowerCase();
  let defaultFallback = fallbackLogo;
  if (brandLower.includes('poco')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729244/Poco_f9_ultra.webp';
  } else if (brandLower.includes('zte') || brandLower.includes('nubia') || brandLower.includes('redmagic')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792647096/Redmagic_11s.webp';
  } else if (brandLower.includes('motorola') || brandLower.includes('moto')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733291/MOTO_EDGE_50_ULTRA_5G.webp';
  } else if (brandLower.includes('honor')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792796978/HONOR_MAGIC_8_PRO.webp';
  } else if (brandLower.includes('apple') || brandLower.includes('iphone')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728584/Iphone_18_pro_max_clean.png';
  } else if (brandLower.includes('infinix')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734877/INFINIX_GT_50_PRO_1.webp';
  } else if (brandLower.includes('oppo')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792718210/Celular_oppo_para_inicio.webp';
  } else if (brandLower.includes('realme')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792719372/Celular_realme_para_inicio.webp';
  } else if (brandLower.includes('google') || brandLower.includes('pixel')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792718180/google_pixel_para_inicio.jpg';
  } else if (brandLower.includes('tecno')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792719919/Celular_tecno_clean.png';
  } else if (brandLower.includes('xiaomi') || brandLower.includes('redmi')) {
    defaultFallback = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/Xioami_18_pro_max.jpg';
  } else if (brandLower.includes('samsung') || brandLower.includes('galaxy')) {
    defaultFallback = resolveAssetPath('assets/img/brands/Samsung/S26 ultra.jpeg');
  }
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

  const defaultColor = (Array.isArray(prod.colors) && prod.colors.length > 0) ? prod.colors[0] : '';

  // Badge de Registro en Lista Blanca (Registrado o Libre)
  const isLibre = prod.registro && String(prod.registro).toLowerCase().trim() === 'libre';
  const regBadgeText = isLibre ? 'Libre' : 'Registrado';
  const regBadgeClass = isLibre ? 'badge-reg-libre' : 'badge-reg-r';
  const regBadgeTitle = isLibre ? 'Libre: No registrado en lista blanca' : 'Registrado: Registrado en lista blanca';

  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return `
    <div class="product-card ${inCompare ? 'in-compare-active' : ''} ${viewMode === 'list' ? 'list-view-card' : ''}" data-id="${id}" data-selected-color="${defaultColor}">
      <!-- Badges -->
      <div class="product-badge-stack">
        <span class="product-badge badge-registro ${regBadgeClass}" title="${regBadgeTitle}">${regBadgeText}</span>
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
        <img src="${image}" alt="${name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='${defaultFallback}'">
      </div>

      <div class="product-card-body-content">
        <!-- Brand & Title -->
        <span class="product-brand">${brand}</span>
        <h3 class="product-title" onclick="openQuickView('${id}')" style="cursor: pointer;" title="${name}">${name}</h3>

        <!-- Price -->
        <div class="product-price-box">
          <div class="price-details-wrap">
            <span class="price-prefix">Desde</span>
            <span class="price-main">${formatPrice(price)}</span>
            ${originalPrice > price ? `
              <div class="price-sub-row">
                <span class="price-old">${formatPrice(originalPrice)}</span>
                <span class="price-discount-tag">${discountPercent}% OFF</span>
              </div>
            ` : ''}
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
    { title: "Marca & Gama", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.386a10.998 10.998 0 0 0 4.195-4.195c.486-.827.313-1.908-.386-2.607L10.377 3.659A2.25 2.25 0 0 0 8.786 3h-.786Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>`, get: p => `${p.brand || p.marca} • Gama ${(p.range || 'alta').toUpperCase()}` },
    { title: "Precio Oferta", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`, get: p => `<strong style="color: #00d2ff; font-size: 1.1rem;">${formatPrice(p.price || p.precio)}</strong>` },
    { title: "Precio Regular", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"/></svg>`, get: p => (p.originalPrice > (p.price || p.precio)) ? `<span style="text-decoration: line-through; color: #94a3b8;">${formatPrice(p.originalPrice)}</span>` : 'Mismo precio' },
    { title: "Calificación", icon: `<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`, get: p => `${p.rating || 4.9} / 5 (${p.reviewsCount || 40} opiniones)` },
    { title: "Pantalla", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="14" height="20" x="5" y="2" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01"/></svg>`, get: p => (p.specsObj && p.specsObj.screen) ? p.specsObj.screen : (p.specs ? p.specs[3] : '-') },
    { title: "Procesador", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>`, get: p => {
      const proc = (p.specsObj && p.specsObj.processor) ? p.specsObj.processor : (p.specs ? p.specs[0] : '-');
      const antutu = (p.specsObj && p.specsObj.antutu) ? `<div class="compare-antutu-score">⚡ AnTuTu v10: <strong>${Number(p.specsObj.antutu).toLocaleString('es-PE')}</strong> pts</div>` : '';
      return `${proc}${antutu}`;
    } },
    { title: "Memoria RAM", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 15h4M7 9h10"/></svg>`, get: p => (p.specsObj && p.specsObj.ram) ? p.specsObj.ram : (p.specs ? p.specs[1] : '-') },
    { title: "Almacenamiento", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h10M7 12h10M7 17h10"/></svg>`, get: p => (p.specsObj && p.specsObj.storage) ? p.specsObj.storage : '-' },
    { title: "Cámaras", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/><circle cx="12" cy="13.5" r="3.75"/></svg>`, get: p => (p.specsObj && p.specsObj.cameras) ? p.specsObj.cameras : (p.specs ? p.specs[2] : '-') },
    { title: "Batería y Carga", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="16" height="10" x="2" y="7" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M22 11v2"/></svg>`, get: p => (p.specsObj && p.specsObj.battery) ? p.specsObj.battery : '-' },
    { title: "Colores Disponibles", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 3a9 9 0 0 1 9 9c0 2.5-2 4.5-4.5 4.5h-1.5a1.5 1.5 0 0 0-1.5 1.5c0 .8-.7 1.5-1.5 1.5A9 9 0 0 1 12 3Z"/></svg>`, get: p => (p.colors && p.colors.length > 0) ? p.colors.map(c => `<span class="compare-color-chip">${c}</span>`).join(' ') : 'Original' },
    { title: "Garantía & Comprobante", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>`, get: p => `Se emite comprobante de venta para garantía • Caja sellada original` },
    { title: "Registro Lista Blanca", icon: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`, get: p => (p.registro === 'Libre' ? `<span class="product-badge badge-registro badge-reg-libre">Libre (No registrado)</span>` : `<span class="product-badge badge-registro badge-reg-r">R (Registrado)</span>`) }
  ];

  const highlight = appState.highlightDiff;

  body.innerHTML = `
    <div class="compare-mobile-scroll-hint">Desliza horizontalmente para comparar todos los equipos</div>
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
              Comprar / Despacho
            </td>
            ${selected.map(p => `
              <td class="compare-cell compare-action-cell">
                <button class="btn-compare-action-cart" onclick="addToCart('${p.id}')" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                  <span>Agregar al Carrito</span>
                </button>
                <button class="btn-compare-action-wa" onclick="buyViaWhatsApp('${p.id}')" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.7c.96.523 1.874.801 2.79.8 3.183 0 5.768-2.587 5.77-5.766.001-3.182-2.585-5.769-5.768-5.785m3.411 8.163c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.18-.538-1.503-.623-2.464-2.148-2.538-2.247-.074-.099-.607-.808-.607-1.542s.385-1.096.522-1.246c.137-.15.299-.187.4-.187.1 0 .201.002.289.006.092.004.215-.035.336.257.126.302.43 1.049.467 1.125.037.075.062.164.013.264-.05.099-.074.163-.148.251-.074.088-.157.197-.224.264-.075.074-.153.155-.066.305.087.15.385.636.827 1.03.568.506 1.048.663 1.198.738.15.075.237.062.324-.038.087-.1.374-.435.474-.585.1-.15.2-.125.337-.075.137.05.87.41 1.02.485.15.075.25.112.287.175.037.062.037.362-.107.767"/></svg>
                  <span>Pedir por WhatsApp</span>
                </button>
                <button class="btn-compare-action-detail" onclick="openQuickView('${p.id}'); closeCompareModal();" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
                  <span>Ver Detalle</span>
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
          <button class="btn-accesorio-cart" onclick="addToCart('${id}', true)" title="Agregar ${name.replace(/"/g, '&quot;')} al Carrito">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            <span>Agregar al Carrito</span>
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

// Control interactivo del menú desplegable / bottom-sheet de ordenamiento
function toggleSortFilterMenu(forceState) {
  const modal = document.getElementById('sortAnimatedDropdown');
  const backdrop = document.getElementById('sortModalBackdrop');
  const triggerBtn = document.getElementById('sortSquareBtn');
  if (!modal) return;

  const willOpen = typeof forceState === 'boolean' ? forceState : !modal.classList.contains('open');

  if (willOpen) {
    modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (triggerBtn) {
      triggerBtn.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  } else {
    modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (triggerBtn) {
      triggerBtn.classList.remove('active');
      triggerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }
}

// Aplicar criterio de ordenamiento: 'relevance' | 'price-asc' | 'price-desc'
function setCatalogSort(sortType, element) {
  if (typeof appState !== 'undefined') {
    appState.currentSort = sortType;
  }

  // Actualizar indicador visual en el botón cuadradito
  const dot = document.getElementById('sortDotIndicator');
  const triggerBtn = document.getElementById('sortSquareBtn');
  if (dot) {
    dot.style.display = sortType !== 'relevance' ? 'block' : 'none';
  }
  if (triggerBtn) {
    if (sortType !== 'relevance') {
      triggerBtn.classList.add('is-sorted');
    } else {
      triggerBtn.classList.remove('is-sorted');
    }
  }

  // Actualizar clases activas en las opciones del modal
  document.querySelectorAll('.sort-modal-opt, .sort-compact-opt').forEach(btn => {
    btn.classList.remove('active');
  });
  if (element) {
    element.classList.add('active');
  } else {
    const target = document.querySelector(`.sort-modal-opt[data-sort="${sortType}"], .sort-compact-opt[data-sort="${sortType}"]`);
    if (target) target.classList.add('active');
  }

  // Renderizar productos reordenados
  renderProducts();

  // Animación visual suave de entrada en las tarjetas de producto
  const container = document.getElementById('productsContainer');
  if (container) {
    container.classList.remove('sort-animated-enter');
    void container.offsetWidth; // reiniciar animación
    container.classList.add('sort-animated-enter');
  }

  // Cerrar el modal suavemente tras 150ms de feedback táctil
  setTimeout(() => {
    toggleSortFilterMenu(false);
  }, 150);
}

function resetFilters() {
  if (typeof appState !== 'undefined') {
    appState.currentCategory = 'all';
    appState.currentRange = 'all';
    appState.currentSort = 'relevance';
    appState.searchQuery = '';
  }

  const labelEl = document.getElementById('currentSortLabel');
  if (labelEl) labelEl.textContent = 'Relevancia';

  document.querySelectorAll('.sort-dropdown-option').forEach(btn => {
    if (btn.dataset.sort === 'relevance') btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const searchInp = document.getElementById('mainSearchInput');
  if (searchInp) searchInp.value = '';

  document.querySelectorAll('.brand-chip').forEach(el => {
    if ((el.dataset.brand && el.dataset.brand === 'all') || el.textContent.includes('Todos')) el.classList.add('active');
    else el.classList.remove('active');
  });

  document.querySelectorAll('.range-pills .pill-btn, .range-chip').forEach(el => {
    if (el.textContent.includes('Todas') || el.textContent.includes('Todos') || el.dataset.range === 'all') el.classList.add('active');
    else el.classList.remove('active');
  });

  renderProducts();
}

// Cerrar el modal de ordenamiento con tecla Escape
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      toggleSortFilterMenu(false);
    }
  });
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
  window.toggleSortFilterMenu = toggleSortFilterMenu;
  window.setCatalogSort = setCatalogSort;
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

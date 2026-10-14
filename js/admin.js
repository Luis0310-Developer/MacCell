/* ===================================================
   MACCELL - PANEL DE ADMINISTRADOR (LÓGICA PRINCIPAL)
   Gestor integral de catálogo, stock, fotos y persistencia
   =================================================== */

(function () {
  'use strict';

  // Estado Local del Administrador
  const AdminState = {
    smartphones: [],
    accesorios: [],
    factorySmartphones: [],
    factoryAccesorios: [],
    currentTab: 'smartphones', // 'smartphones' | 'accesorios' | 'stock' | 'backup'
    searchQuery: '',
    brandFilter: 'all',
    stockFilter: 'all',
    viewMode: 'table', // 'table' | 'grid'
    editingProductId: null,
    editingProductType: 'phone', // 'phone' | 'acc'
    quickPhotoProductId: null,
    quickPhotoProductType: 'phone',
    tempGallery: []
  };

  // Iconografía SVG Corporativa
  const AdminIcons = {
    camera: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>',
    edit: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    trash: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
    phone: '<svg class="admin-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
    headphones: '<svg class="admin-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',
    save: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>',
    server: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    download: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    copy: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    upload: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    restore: '<svg class="admin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
    check: '<svg class="admin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    alert: '<svg class="admin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info: '<svg class="admin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  /* ===================================================
     SEGURIDAD Y CONTROL DE ACCESO (ADMIN AUTH)
     Credenciales autorizadas: TheDino / Dino555.
     =================================================== */
  const AUTH_CONFIG = {
    user: 'TheDino',
    pass: 'Dino555.',
    tokenKey: 'maccell_admin_session',
    tokenVal: 'TheDino_authenticated'
  };

  const AdminAuth = {
    isAuthenticated() {
      try {
        const session = sessionStorage.getItem(AUTH_CONFIG.tokenKey);
        const persistent = localStorage.getItem(AUTH_CONFIG.tokenKey);
        return session === AUTH_CONFIG.tokenVal || persistent === AUTH_CONFIG.tokenVal;
      } catch (e) {
        return false;
      }
    },

    checkSession() {
      const overlay = document.getElementById('adminAuthOverlay');
      if (this.isAuthenticated()) {
        document.documentElement.classList.add('admin-authenticated');
        if (document.body) document.body.classList.add('admin-authenticated');
        if (overlay) overlay.style.display = 'none';
        return true;
      } else {
        document.documentElement.classList.remove('admin-authenticated');
        if (document.body) document.body.classList.remove('admin-authenticated');
        if (overlay) overlay.style.display = 'flex';
        setTimeout(() => {
          const userInput = document.getElementById('adminAuthUser');
          if (userInput) userInput.focus();
        }, 150);
        return false;
      }
    },

    login(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const userInput = document.getElementById('adminAuthUser');
      const passInput = document.getElementById('adminAuthPass');
      const rememberCheckbox = document.getElementById('adminAuthRemember');
      const errorDiv = document.getElementById('adminAuthError');
      const errorText = document.getElementById('adminAuthErrorText');
      const overlay = document.getElementById('adminAuthOverlay');

      const userVal = (userInput?.value || '').trim();
      const passVal = passInput?.value || '';

      if (userVal === AUTH_CONFIG.user && passVal === AUTH_CONFIG.pass) {
        if (errorDiv) errorDiv.style.display = 'none';

        try {
          sessionStorage.setItem(AUTH_CONFIG.tokenKey, AUTH_CONFIG.tokenVal);
          if (rememberCheckbox && rememberCheckbox.checked) {
            localStorage.setItem(AUTH_CONFIG.tokenKey, AUTH_CONFIG.tokenVal);
          } else {
            localStorage.removeItem(AUTH_CONFIG.tokenKey);
          }
        } catch (err) {
          console.warn('Storage no disponible:', err);
        }

        document.documentElement.classList.add('admin-authenticated');
        if (document.body) document.body.classList.add('admin-authenticated');

        if (overlay) {
          overlay.style.opacity = '0';
          overlay.style.transition = 'opacity 0.25s ease';
          setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.opacity = '1';
          }, 250);
        }

        initCatalogData();
        renderStats();
        renderCurrentTab();

        showToast('¡Bienvenido TheDino! Sesión autorizada correctamente.', 'success');
        return true;
      } else {
        if (errorDiv) {
          errorDiv.style.display = 'flex';
          if (errorText) {
            errorText.textContent = 'Credenciales no válidas. Acceso denegado.';
          }
        }
        if (passInput) {
          passInput.value = '';
          passInput.focus();
        }
        return false;
      }
    },

    logout() {
      if (confirm('¿Deseas cerrar la sesión del Panel de Administración?')) {
        try {
          sessionStorage.removeItem(AUTH_CONFIG.tokenKey);
          localStorage.removeItem(AUTH_CONFIG.tokenKey);
        } catch (e) {}
        document.documentElement.classList.remove('admin-authenticated');
        if (document.body) document.body.classList.remove('admin-authenticated');
        window.location.reload();
      }
    },

    togglePassVisibility() {
      const passInput = document.getElementById('adminAuthPass');
      const eyeIcon = document.getElementById('eyeIcon');
      if (!passInput) return;

      if (passInput.type === 'password') {
        passInput.type = 'text';
        if (eyeIcon) {
          eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        }
      } else {
        passInput.type = 'password';
        if (eyeIcon) {
          eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
      }
    }
  };

  // Exponer a window para invocar desde HTML
  window.AdminAuth = AdminAuth;

  document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    const isAuthed = AdminAuth.checkSession();
    if (isAuthed) {
      initCatalogData();
      renderStats();
      renderCurrentTab();
    }
  });

  /* ----------------------------------------------------
     1. INICIALIZACIÓN Y SINCRONIZACIÓN DE DATOS
  ---------------------------------------------------- */
  function initCatalogData() {
    // 1. Obtener datos base
    let baseProds = [];
    let baseAccs = [];

    if (typeof window.productos !== 'undefined' && Array.isArray(window.productos)) {
      baseProds = JSON.parse(JSON.stringify(window.productos));
    }
    if (typeof window.accesorios !== 'undefined' && Array.isArray(window.accesorios)) {
      baseAccs = JSON.parse(JSON.stringify(window.accesorios));
    }

    // Guardar copia de fábrica para restaurar si el usuario lo desea
    AdminState.factorySmartphones = JSON.parse(JSON.stringify(baseProds));
    AdminState.factoryAccesorios = JSON.parse(JSON.stringify(baseAccs));

    // 2. Verificar si hay cambios guardados en localStorage
    try {
      const savedProds = localStorage.getItem('maccell_custom_products');
      if (savedProds) {
        const parsed = JSON.parse(savedProds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          baseProds = parsed;
        }
      }
      const savedAccs = localStorage.getItem('maccell_custom_accessories');
      if (savedAccs) {
        const parsedAcc = JSON.parse(savedAccs);
        if (Array.isArray(parsedAcc) && parsedAcc.length > 0) {
          baseAccs = parsedAcc;
        }
      }
    } catch (e) {
      console.warn('Error leyendo localStorage:', e);
    }

    AdminState.smartphones = baseProds;
    AdminState.accesorios = baseAccs;

    // Asegurar que cada accesorio tenga propiedad de stock si no existe
    AdminState.accesorios.forEach(acc => {
      if (typeof acc.stock === 'undefined') acc.stock = 10;
    });

    updateGlobalStoreObjects();
  }

  function updateGlobalStoreObjects() {
    if (typeof window !== 'undefined') {
      window.productos = AdminState.smartphones;
      window.PRODUCTS_DATA = AdminState.smartphones;
      window.accesorios = AdminState.accesorios;
    }
  }

  /* ----------------------------------------------------
     2. PERSISTENCIA: LOCALSTORAGE, DISCO Y EXPORTACIÓN
  ---------------------------------------------------- */
  function saveToLocalStorage(showFeedback = true) {
    try {
      localStorage.setItem('maccell_custom_products', JSON.stringify(AdminState.smartphones));
      localStorage.setItem('maccell_custom_accessories', JSON.stringify(AdminState.accesorios));
      updateGlobalStoreObjects();
      
      // Notificar a otras pestañas abiertas de la tienda
      window.dispatchEvent(new Event('storage'));

      if (showFeedback) {
        showToast('Catálogo sincronizado y guardado con éxito', 'success');
      }
      renderStats();
    } catch (err) {
      console.error(err);
      showToast('Error al persistir cambios en el almacenamiento local', 'danger');
    }
  }

  // Generador de código JavaScript para data/products.js
  function generateProductsJsCode() {
    const cleanPhones = AdminState.smartphones.map(p => {
      return {
        id: p.id || slugify(p.nombre || p.name),
        nombre: p.nombre || p.name,
        name: p.name || p.nombre,
        marca: p.marca || p.brand || 'Varios',
        brand: p.brand || p.marca || 'Varios',
        category: p.category || (p.marca ? p.marca.toLowerCase() : 'otros'),
        range: p.range || 'alta',
        precio: Number(p.precio || p.price || 0),
        price: Number(p.price || p.precio || 0),
        originalPrice: Number(p.originalPrice || 0) || (Number(p.precio || 0) + 200),
        imagen: p.imagen || p.image || '',
        image: p.image || p.imagen || '',
        badge: p.badge || 'NUEVO',
        badgeType: p.badgeType || 'new',
        stock: Number(p.stock || 0),
        rating: Number(p.rating || 4.8),
        reviewsCount: Number(p.reviewsCount || 15),
        gallery: Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : [p.imagen || p.image || ''],
        specs: Array.isArray(p.specs) ? p.specs : [],
        specsObj: p.specsObj || {
          screen: "Pantalla OLED 120Hz",
          processor: "Octa-Core Alta Potencia",
          ram: "8 GB RAM",
          storage: "256 GB",
          cameras: "Cámara Pro 50MP",
          battery: "5,000 mAh Carga Rápida"
        },
        colors: Array.isArray(p.colors) ? p.colors : ["Negro", "Azul"],
        description: p.description || "Smartphone con garantía de 1 año y accesorios originales en MacCell Perú.",
        disponible: p.disponible !== false && Number(p.stock || 0) > 0
      };
    });

    const cleanAccs = AdminState.accesorios.map(a => {
      return {
        id: a.id || slugify(a.nombre || a.name),
        nombre: a.nombre || a.name,
        name: a.name || a.nombre,
        tipo: a.tipo || 'Accesorio',
        precio: Number(a.precio || a.price || 0),
        price: Number(a.price || a.precio || 0),
        originalPrice: Number(a.originalPrice || 0) || (Number(a.precio || 0) + 30),
        imagen: a.imagen || a.image || '',
        image: a.image || a.imagen || '',
        badge: a.badge || 'ORIGINAL',
        stock: Number(a.stock || 10),
        specs: Array.isArray(a.specs) ? a.specs : ["Calidad Garantizada", "Original MacCell"]
      };
    });

    return `/* ===================================================
   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS
   Generado desde el Panel de Administrador MacCell
   Última actualización: ${new Date().toLocaleString('es-PE')}
   =================================================== */

const productos = ${JSON.stringify(cleanPhones, null, 2)};

const accesorios = ${JSON.stringify(cleanAccs, null, 2)};

// Helper: Formato de Moneda Peruana (S/.)
function formatPrice(amount) {
  return "S/ " + Number(amount).toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Compatibilidad universal y sincronización con Panel de Administrador
if (typeof window !== 'undefined') {
  // Sincronización automática con datos personalizados guardados desde el Panel Admin
  try {
    const customProds = window.localStorage.getItem('maccell_custom_products');
    if (customProds) {
      const parsedProds = JSON.parse(customProds);
      if (Array.isArray(parsedProds) && parsedProds.length > 0) {
        productos.length = 0;
        parsedProds.forEach(item => productos.push(item));
      }
    }
    const customAccs = window.localStorage.getItem('maccell_custom_accessories');
    if (customAccs) {
      const parsedAccs = JSON.parse(customAccs);
      if (Array.isArray(parsedAccs) && parsedAccs.length > 0) {
        accesorios.length = 0;
        parsedAccs.forEach(item => accesorios.push(item));
      }
    }
  } catch (syncErr) {
    console.warn('MacCell: Sincronización de catálogo local:', syncErr);
  }

  window.productos = productos;
  window.PRODUCTS_DATA = productos;
  window.accesorios = accesorios;
  window.formatPrice = formatPrice;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productos, accesorios, formatPrice };
}
`;
  }

  // Guardar directo en disco a través del dev-server si está activo
  async function saveDirectToDiskServer() {
    const code = generateProductsJsCode();
    try {
      showToast('Guardando en data/products.js...', 'info');
      const response = await fetch('/api/save-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        const result = await response.json();
        saveToLocalStorage(false);
        showToast('Archivo data/products.js actualizado con éxito en el servidor local', 'success');
      } else {
        throw new Error('Servidor dev-server no respondió con 200');
      }
    } catch (err) {
      // Si no hay dev-server corriendo, guardamos en localStorage y ofrecemos descargar
      saveToLocalStorage(false);
      showToast('Guardado en la tienda local. También puedes descargar el archivo JS.', 'info');
      downloadProductsJsFile();
    }
  }

  // Descarga del archivo products.js
  function downloadProductsJsFile() {
    const code = generateProductsJsCode();
    const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Archivo products.js generado y descargado correctamente', 'success');
  }

  // Copiar código al portapapeles
  function copyJsCodeToClipboard() {
    const code = generateProductsJsCode();
    navigator.clipboard.writeText(code).then(() => {
      showToast('Código copiado al portapapeles', 'success');
    }).catch(() => {
      showToast('No se pudo copiar el código automáticamente', 'danger');
    });
  }

  // Exportar respaldo JSON
  function exportBackupJson() {
    const backup = {
      exportDate: new Date().toISOString(),
      smartphones: AdminState.smartphones,
      accesorios: AdminState.accesorios
    };
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maccell-catalogo-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Copia de respaldo JSON descargada correctamente', 'success');
  }

  // Importar respaldo JSON
  function importBackupJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data && Array.isArray(data.smartphones)) {
          AdminState.smartphones = data.smartphones;
          if (Array.isArray(data.accesorios)) {
            AdminState.accesorios = data.accesorios;
          }
          saveToLocalStorage();
          renderStats();
          renderCurrentTab();
          showToast('Catálogo restaurado correctamente desde el archivo de respaldo', 'success');
        } else {
          showToast('El archivo JSON no tiene la estructura esperada de MacCell', 'danger');
        }
      } catch (err) {
        showToast('Error al procesar el archivo JSON seleccionado', 'danger');
      }
    };
    reader.readAsText(file);
  }

  // Restaurar Catálogo de Fábrica
  function restoreFactoryCatalog() {
    if (confirm('¿Deseas restablecer el catálogo al estado original de fábrica? Esta acción reiniciará modificaciones locales.')) {
      localStorage.removeItem('maccell_custom_products');
      localStorage.removeItem('maccell_custom_accessories');
      AdminState.smartphones = JSON.parse(JSON.stringify(AdminState.factorySmartphones));
      AdminState.accesorios = JSON.parse(JSON.stringify(AdminState.factoryAccesorios));
      updateGlobalStoreObjects();
      renderStats();
      renderCurrentTab();
      showToast('Catálogo restablecido al estado original de fábrica', 'info');
    }
  }

  /* ----------------------------------------------------
     3. RENDERIZADO: DASHBOARD Y MÉTRICAS
  ---------------------------------------------------- */
  function renderStats() {
    const totalPhones = AdminState.smartphones.length;
    const totalAccs = AdminState.accesorios.length;

    const totalStockPhones = AdminState.smartphones.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
    const totalStockAccs = AdminState.accesorios.reduce((sum, a) => sum + (Number(a.stock) || 0), 0);
    const totalStock = totalStockPhones + totalStockAccs;

    const lowStockPhones = AdminState.smartphones.filter(p => Number(p.stock) <= 3).length;
    const lowStockAccs = AdminState.accesorios.filter(a => Number(a.stock) <= 3).length;
    const lowStockTotal = lowStockPhones + lowStockAccs;

    // Actualizar elementos DOM
    setText('statTotalPhones', totalPhones);
    setText('statTotalStock', totalStock);
    setText('statLowStock', lowStockTotal);
    setText('statTotalAccs', totalAccs);

    setText('tabCounterPhones', totalPhones);
    setText('tabCounterAccs', totalAccs);
    setText('tabCounterStock', lowStockTotal);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  /* ----------------------------------------------------
     4. RENDERIZADO DE PESTAÑAS Y LISTADOS
  ---------------------------------------------------- */
  function renderCurrentTab() {
    const container = document.getElementById('catalogContentArea');
    if (!container) return;

    // Control de visibilidad de toolbar según la pestaña
    const toolbar = document.getElementById('adminToolbar');
    if (AdminState.currentTab === 'backup') {
      if (toolbar) toolbar.style.display = 'none';
      renderBackupView(container);
      return;
    }

    if (toolbar) toolbar.style.display = 'flex';

    if (AdminState.currentTab === 'smartphones') {
      renderSmartphonesView(container);
    } else if (AdminState.currentTab === 'accesorios') {
      renderAccesoriosView(container);
    } else if (AdminState.currentTab === 'stock') {
      renderStockQuickView(container);
    }
  }

  // Filtrado de smartphones
  function getFilteredSmartphones() {
    return AdminState.smartphones.filter(phone => {
      // Filtro de búsqueda
      if (AdminState.searchQuery) {
        const q = AdminState.searchQuery.toLowerCase();
        const matchName = (phone.nombre || phone.name || '').toLowerCase().includes(q);
        const matchBrand = (phone.marca || phone.brand || '').toLowerCase().includes(q);
        const matchId = (phone.id || '').toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchId) return false;
      }
      // Filtro de Marca
      if (AdminState.brandFilter !== 'all') {
        const brand = (phone.marca || phone.brand || '').toLowerCase();
        if (brand !== AdminState.brandFilter.toLowerCase()) return false;
      }
      // Filtro de Stock
      if (AdminState.stockFilter === 'in_stock') {
        if ((Number(phone.stock) || 0) < 5) return false;
      } else if (AdminState.stockFilter === 'low_stock') {
        const s = Number(phone.stock) || 0;
        if (s <= 0 || s > 4) return false;
      } else if (AdminState.stockFilter === 'out_of_stock') {
        if ((Number(phone.stock) || 0) > 0) return false;
      }
      return true;
    });
  }

  // Render Smartphones
  function renderSmartphonesView(container) {
    const list = getFilteredSmartphones();

    if (list.length === 0) {
      container.innerHTML = `
        <div class="admin-empty-state">
          <div class="admin-empty-icon">${AdminIcons.phone}</div>
          <h3 class="admin-empty-title">No se encontraron dispositivos</h3>
          <p>Ajusta los filtros de búsqueda o marca, o registra un nuevo equipo.</p>
          <button class="btn-admin btn-admin-primary" style="margin-top: 14px;" onclick="window.AdminModule.openProductModal()">
            <span>+ Registrar Nuevo Smartphone</span>
          </button>
        </div>
      `;
      return;
    }

    if (AdminState.viewMode === 'table') {
      renderSmartphonesTable(container, list);
    } else {
      renderSmartphonesGrid(container, list);
    }
  }

  function renderSmartphonesTable(container, list) {
    let html = `
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 56px;">Foto</th>
              <th>Dispositivo & Modelo</th>
              <th>Marca / Segmento</th>
              <th>Precio Venta</th>
              <th style="width: 170px;">Existencias</th>
              <th>Catálogo</th>
              <th style="text-align: right; width: 140px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;

    list.forEach(p => {
      const stock = Number(p.stock) || 0;
      let stockBadgeClass = 'status-in-stock';
      let stockBadgeText = 'En Stock';
      if (stock === 0) {
        stockBadgeClass = 'status-out-of-stock';
        stockBadgeText = 'Agotado';
      } else if (stock <= 3) {
        stockBadgeClass = 'status-low-stock';
        stockBadgeText = 'Stock Crítico';
      }

      const imgPath = resolveImgPath(p.imagen || p.image);
      const isAvailable = p.disponible !== false && stock > 0;

      html += `
        <tr data-id="${p.id}">
          <td>
            <div class="product-thumb-wrap" onclick="window.AdminModule.openQuickPhotoModal('${p.id}', 'phone')" title="Actualizar foto del producto">
              <img src="${imgPath}" alt="${escapeHtml(p.nombre || p.name)}" onerror="this.src='assets/img/ui/Logo.jpeg'">
              <div class="product-thumb-overlay">${AdminIcons.camera}</div>
            </div>
          </td>
          <td>
            <div class="product-meta">
              <div class="product-title">${escapeHtml(p.nombre || p.name)}</div>
              <div class="product-id-tag">ID: ${p.id}</div>
              ${p.badge ? `<span class="product-badge badge-new">${escapeHtml(p.badge)}</span>` : ''}
            </div>
          </td>
          <td>
            <div class="brand-pill">${escapeHtml(p.marca || p.brand || 'Apple')}</div>
            <div class="range-label">Gama ${escapeHtml(p.range || 'Alta')}</div>
          </td>
          <td>
            <div class="price-tag">S/ ${formatMoney(p.precio || p.price)}</div>
            ${p.originalPrice ? `<div class="original-price-tag">S/ ${formatMoney(p.originalPrice)}</div>` : ''}
          </td>
          <td>
            <div class="stock-control">
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${p.id}', -1, 'phone')" title="Restar 1 unidad">-</button>
              <input type="number" class="stock-input" value="${stock}" min="0" 
                     onchange="window.AdminModule.setStockDirect('${p.id}', this.value, 'phone')">
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${p.id}', 1, 'phone')" title="Aumentar 1 unidad">+</button>
            </div>
            <div>
              <span class="stock-status-pill ${stockBadgeClass}"><span class="status-indicator-dot"></span>${stockBadgeText} (${stock})</span>
            </div>
          </td>
          <td>
            <label class="switch-label" title="Disponible en tienda virtual">
              <input type="checkbox" ${isAvailable ? 'checked' : ''} 
                     onchange="window.AdminModule.toggleProductActive('${p.id}', this.checked, 'phone')">
              <span class="switch-slider"></span>
            </label>
          </td>
          <td style="text-align: right;">
            <div class="row-actions" style="justify-content: flex-end;">
              <button class="btn-admin btn-icon-only" onclick="window.AdminModule.openQuickPhotoModal('${p.id}', 'phone')" title="Cambiar fotografía">
                ${AdminIcons.camera}
              </button>
              <button class="btn-admin btn-icon-only" onclick="window.AdminModule.openProductModal('${p.id}')" title="Editar especificaciones">
                ${AdminIcons.edit}
              </button>
              <button class="btn-admin btn-admin-danger btn-icon-only" onclick="window.AdminModule.deleteProduct('${p.id}', 'phone')" title="Eliminar dispositivo">
                ${AdminIcons.trash}
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  function renderSmartphonesGrid(container, list) {
    let html = `<div class="admin-grid-view">`;

    list.forEach(p => {
      const stock = Number(p.stock) || 0;
      let stockBadgeClass = 'status-in-stock';
      let stockBadgeText = 'En Stock';
      if (stock === 0) {
        stockBadgeClass = 'status-out-of-stock';
        stockBadgeText = 'Agotado';
      } else if (stock <= 3) {
        stockBadgeClass = 'status-low-stock';
        stockBadgeText = 'Stock Crítico';
      }

      const imgPath = resolveImgPath(p.imagen || p.image);

      html += `
        <div class="admin-grid-card" data-id="${p.id}">
          <div class="grid-card-media">
            ${p.badge ? `<span class="product-badge badge-new grid-card-badge">${escapeHtml(p.badge)}</span>` : ''}
            <button class="grid-card-quick-photo" onclick="window.AdminModule.openQuickPhotoModal('${p.id}', 'phone')">
              ${AdminIcons.camera}
              <span>Foto</span>
            </button>
            <img src="${imgPath}" alt="${escapeHtml(p.nombre || p.name)}" onerror="this.src='assets/img/ui/Logo.jpeg'">
          </div>
          <div class="grid-card-body">
            <span class="grid-card-brand">${escapeHtml(p.marca || p.brand || '')}</span>
            <h4 class="grid-card-title">${escapeHtml(p.nombre || p.name)}</h4>
            <div class="grid-card-price-row">
              <span class="price-tag">S/ ${formatMoney(p.precio || p.price)}</span>
              ${p.originalPrice ? `<span class="original-price-tag">S/ ${formatMoney(p.originalPrice)}</span>` : ''}
            </div>
            <div class="grid-card-stock-row">
              <div class="stock-control">
                <button class="stock-btn" onclick="window.AdminModule.modifyStock('${p.id}', -1, 'phone')">-</button>
                <input type="number" class="stock-input" value="${stock}" min="0" 
                       onchange="window.AdminModule.setStockDirect('${p.id}', this.value, 'phone')">
                <button class="stock-btn" onclick="window.AdminModule.modifyStock('${p.id}', 1, 'phone')">+</button>
              </div>
              <span class="stock-status-pill ${stockBadgeClass}"><span class="status-indicator-dot"></span>${stockBadgeText}</span>
            </div>
            <div class="grid-card-actions">
              <button class="btn-admin btn-admin-outline" style="flex: 1;" onclick="window.AdminModule.openProductModal('${p.id}')">
                ${AdminIcons.edit}
                <span>Editar</span>
              </button>
              <button class="btn-admin btn-admin-danger btn-icon-only" onclick="window.AdminModule.deleteProduct('${p.id}', 'phone')" title="Eliminar">
                ${AdminIcons.trash}
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // Render Accesorios
  function renderAccesoriosView(container) {
    let list = AdminState.accesorios;

    if (AdminState.searchQuery) {
      const q = AdminState.searchQuery.toLowerCase();
      list = list.filter(a => {
        return (a.nombre || a.name || '').toLowerCase().includes(q) ||
               (a.tipo || '').toLowerCase().includes(q) ||
               (a.id || '').toLowerCase().includes(q);
      });
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="admin-empty-state">
          <div class="admin-empty-icon">${AdminIcons.headphones}</div>
          <h3 class="admin-empty-title">No hay accesorios en el registro</h3>
          <p>Registra cargadores, cables o audífonos compatibles.</p>
          <button class="btn-admin btn-admin-primary" style="margin-top: 14px;" onclick="window.AdminModule.openAccessoryModal()">
            <span>+ Registrar Accesorio</span>
          </button>
        </div>
      `;
      return;
    }

    let html = `
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 56px;">Foto</th>
              <th>Accesorio</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th style="width: 170px;">Existencias</th>
              <th style="text-align: right; width: 140px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;

    list.forEach(a => {
      const stock = Number(a.stock) || 0;
      let stockBadgeClass = stock > 3 ? 'status-in-stock' : (stock > 0 ? 'status-low-stock' : 'status-out-of-stock');
      const stockLabel = stock > 3 ? 'En Stock' : (stock > 0 ? 'Stock Crítico' : 'Agotado');
      const imgPath = resolveImgPath(a.imagen || a.image);

      html += `
        <tr data-id="${a.id}">
          <td>
            <div class="product-thumb-wrap" onclick="window.AdminModule.openQuickPhotoModal('${a.id}', 'acc')" title="Actualizar foto">
              <img src="${imgPath}" alt="${escapeHtml(a.nombre || a.name)}" onerror="this.src='assets/img/ui/Logo.jpeg'">
              <div class="product-thumb-overlay">${AdminIcons.camera}</div>
            </div>
          </td>
          <td>
            <div class="product-meta">
              <div class="product-title">${escapeHtml(a.nombre || a.name)}</div>
              <div class="product-id-tag">ID: ${a.id}</div>
              ${a.badge ? `<span class="product-badge badge-custom">${escapeHtml(a.badge)}</span>` : ''}
            </div>
          </td>
          <td>
            <span class="brand-pill">${escapeHtml(a.tipo || 'General')}</span>
          </td>
          <td>
            <div class="price-tag">S/ ${formatMoney(a.precio || a.price)}</div>
            ${a.originalPrice ? `<div class="original-price-tag">S/ ${formatMoney(a.originalPrice)}</div>` : ''}
          </td>
          <td>
            <div class="stock-control">
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${a.id}', -1, 'acc')">-</button>
              <input type="number" class="stock-input" value="${stock}" min="0" 
                     onchange="window.AdminModule.setStockDirect('${a.id}', this.value, 'acc')">
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${a.id}', 1, 'acc')">+</button>
            </div>
            <div>
              <span class="stock-status-pill ${stockBadgeClass}"><span class="status-indicator-dot"></span>${stockLabel} (${stock})</span>
            </div>
          </td>
          <td style="text-align: right;">
            <div class="row-actions" style="justify-content: flex-end;">
              <button class="btn-admin btn-icon-only" onclick="window.AdminModule.openQuickPhotoModal('${a.id}', 'acc')" title="Cambiar foto">
                ${AdminIcons.camera}
              </button>
              <button class="btn-admin btn-icon-only" onclick="window.AdminModule.openAccessoryModal('${a.id}')" title="Editar accesorio">
                ${AdminIcons.edit}
              </button>
              <button class="btn-admin btn-admin-danger btn-icon-only" onclick="window.AdminModule.deleteProduct('${a.id}', 'acc')" title="Eliminar">
                ${AdminIcons.trash}
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  // Render Vista de Ajuste Rápido de Stock
  function renderStockQuickView(container) {
    const allItems = [
      ...AdminState.smartphones.map(p => ({ ...p, _type: 'phone', _categoryName: 'Celulares' })),
      ...AdminState.accesorios.map(a => ({ ...a, _type: 'acc', _categoryName: 'Accesorios' }))
    ].sort((a, b) => (Number(a.stock) || 0) - (Number(b.stock) || 0));

    let html = `
      <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3 style="font-size: 1.05rem; color: #fff; font-weight: 700; letter-spacing: -0.01em;">Ajuste Rápido de Inventario</h3>
          <p style="font-size: 0.8rem; color: var(--admin-text-dim);">
            Listado priorizado de existencias ordenado de menor a mayor para rápida reposición.
          </p>
        </div>
        <button class="btn-admin btn-admin-primary" onclick="window.AdminModule.saveChangesLive()">
          ${AdminIcons.save}
          <span>Guardar Cambios en Tienda</span>
        </button>
      </div>
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 50px;">Foto</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Stock Actual</th>
              <th style="width: 220px;">Ajustar Lote / Unidades</th>
              <th>Nivel de Existencia</th>
            </tr>
          </thead>
          <tbody>
    `;

    allItems.forEach(item => {
      const stock = Number(item.stock) || 0;
      let badgeHtml = '';
      if (stock === 0) {
        badgeHtml = `<span class="stock-status-pill status-out-of-stock"><span class="status-indicator-dot"></span>Agotado</span>`;
      } else if (stock <= 3) {
        badgeHtml = `<span class="stock-status-pill status-low-stock"><span class="status-indicator-dot"></span>Stock Crítico</span>`;
      } else {
        badgeHtml = `<span class="stock-status-pill status-in-stock"><span class="status-indicator-dot"></span>Disponible</span>`;
      }

      html += `
        <tr>
          <td>
            <div class="product-thumb-wrap" style="width: 40px; height: 40px;">
              <img src="${resolveImgPath(item.imagen || item.image)}" onerror="this.src='assets/img/ui/Logo.jpeg'">
            </div>
          </td>
          <td>
            <div style="font-weight: 600; color: #fff;">${escapeHtml(item.nombre || item.name)}</div>
            <div style="font-size: 0.74rem; color: var(--admin-text-dim);">S/ ${formatMoney(item.precio || item.price)}</div>
          </td>
          <td>
            <span class="brand-pill">${item._categoryName}</span>
          </td>
          <td>
            <strong style="font-size: 1.05rem; font-variant-numeric: tabular-nums; color: ${stock <= 3 ? '#fbbf24' : '#fff'};">${stock} un.</strong>
          </td>
          <td>
            <div class="stock-control">
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${item.id}', -5, '${item._type}')" title="-5 unidades">-5</button>
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${item.id}', -1, '${item._type}')" title="-1 unidad">-1</button>
              <input type="number" class="stock-input" value="${stock}" min="0" 
                     onchange="window.AdminModule.setStockDirect('${item.id}', this.value, '${item._type}')">
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${item.id}', 1, '${item._type}')" title="+1 unidad">+1</button>
              <button class="stock-btn" onclick="window.AdminModule.modifyStock('${item.id}', 5, '${item._type}')" title="+5 unidades">+5</button>
            </div>
          </td>
          <td>${badgeHtml}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  // Render Vista de Respaldos y Código
  function renderBackupView(container) {
    const code = generateProductsJsCode();

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- Card 1: Acciones de Respaldo -->
        <div style="background: var(--admin-bg-surface); border: 1px solid var(--admin-border-subtle); border-radius: var(--admin-radius-md); padding: 22px;">
          <h3 style="font-size: 1.05rem; color: #fff; font-weight: 700; margin-bottom: 8px;">
            Gestión de Respaldos y Exportación
          </h3>
          <p style="font-size: 0.82rem; color: var(--admin-text-muted); margin-bottom: 20px;">
            Exporta copias de seguridad de tus productos o sincroniza directamente con el almacenamiento local.
          </p>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn-admin btn-admin-primary" onclick="window.AdminModule.saveToDiskServer()">
              ${AdminIcons.server}
              <span>Guardar en archivo data/products.js (Auto)</span>
            </button>
            <button class="btn-admin btn-admin-secondary" onclick="window.AdminModule.downloadProductsFile()">
              ${AdminIcons.download}
              <span>Descargar archivo data/products.js</span>
            </button>
            <button class="btn-admin btn-admin-outline" onclick="window.AdminModule.copyJsCode()">
              ${AdminIcons.copy}
              <span>Copiar código completo al portapapeles</span>
            </button>
            <div style="border-top: 1px solid var(--admin-border-subtle); margin: 6px 0;"></div>
            <button class="btn-admin btn-admin-outline" onclick="window.AdminModule.exportJson()">
              ${AdminIcons.download}
              <span>Exportar respaldo JSON</span>
            </button>
            <label class="btn-admin btn-admin-outline" style="cursor: pointer; text-align: center;">
              ${AdminIcons.upload}
              <span>Importar respaldo JSON</span>
              <input type="file" accept=".json" style="display: none;" onchange="window.AdminModule.handleJsonUpload(this.files[0])">
            </label>
            <div style="border-top: 1px solid var(--admin-border-subtle); margin: 6px 0;"></div>
            <button class="btn-admin btn-admin-danger" onclick="window.AdminModule.restoreFactory()">
              ${AdminIcons.restore}
              <span>Restaurar catálogo inicial de fábrica</span>
            </button>
          </div>
        </div>

        <!-- Card 2: Visualizador del código JS -->
        <div style="background: var(--admin-bg-surface); border: 1px solid var(--admin-border-subtle); border-radius: var(--admin-radius-md); padding: 22px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 1.05rem; color: #fff; font-weight: 700;">
              Vista Previa de data/products.js
            </h3>
            <button class="btn-admin btn-admin-outline" style="font-size: 0.78rem;" onclick="window.AdminModule.copyJsCode()">
              ${AdminIcons.copy}
              <span>Copiar</span>
            </button>
          </div>
          <div class="code-viewer-box" style="flex: 1;">${escapeHtml(code.slice(0, 4000))}...</div>
          <span style="font-size: 0.74rem; color: var(--admin-text-dim); margin-top: 8px;">
            Estructura oficial de datos sincronizada con el frontend de MacCell.
          </span>
        </div>
      </div>
    `;
  }

  /* ----------------------------------------------------
     5. GESTIÓN RÁPIDA DE STOCK
  ---------------------------------------------------- */
  function modifyStock(id, delta, type = 'phone') {
    const list = type === 'phone' ? AdminState.smartphones : AdminState.accesorios;
    const item = list.find(x => x.id === id);
    if (!item) return;

    const currentStock = Number(item.stock) || 0;
    const newStock = Math.max(0, currentStock + delta);
    item.stock = newStock;
    if (type === 'phone' && newStock === 0) {
      item.disponible = false;
    } else if (type === 'phone' && newStock > 0 && item.disponible === false) {
      item.disponible = true;
    }

    saveToLocalStorage(false);
    renderStats();
    renderCurrentTab();
    showToast(`Stock de "${item.nombre || item.name}" actualizado a ${newStock} unidades.`, 'info');
  }

  function setStockDirect(id, value, type = 'phone') {
    const list = type === 'phone' ? AdminState.smartphones : AdminState.accesorios;
    const item = list.find(x => x.id === id);
    if (!item) return;

    const num = Math.max(0, parseInt(value, 10) || 0);
    item.stock = num;
    if (type === 'phone' && num === 0) {
      item.disponible = false;
    } else if (type === 'phone' && num > 0) {
      item.disponible = true;
    }

    saveToLocalStorage(false);
    renderStats();
    renderCurrentTab();
    showToast(`Stock de "${item.nombre || item.name}" fijado en ${num} unidades.`, 'info');
  }

  function toggleProductActive(id, isActive, type = 'phone') {
    const list = type === 'phone' ? AdminState.smartphones : AdminState.accesorios;
    const item = list.find(x => x.id === id);
    if (!item) return;

    item.disponible = isActive;
    saveToLocalStorage(false);
    showToast(`Visibilidad de "${item.nombre || item.name}": ${isActive ? 'Activo en tienda' : 'Oculto'}`, 'info');
  }

  /* ----------------------------------------------------
     6. MODAL: AGREGAR Y EDITAR SMARTPHONE
  ---------------------------------------------------- */
  function openProductModal(id = null) {
    AdminState.editingProductId = id;
    AdminState.editingProductType = 'phone';
    AdminState.tempGallery = [];

    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    const form = document.getElementById('productForm');

    if (!modal || !form) return;

    if (id) {
      const p = AdminState.smartphones.find(x => x.id === id);
      if (!p) return;
      title.textContent = `Editar Smartphone: ${p.nombre || p.name}`;
      
      setValue('prodName', p.nombre || p.name || '');
      setValue('prodBrand', p.marca || p.brand || 'Apple');
      setValue('prodCategory', p.category || 'apple');
      setValue('prodRange', p.range || 'alta');
      setValue('prodPrice', p.precio || p.price || '');
      setValue('prodOriginalPrice', p.originalPrice || '');
      setValue('prodStock', p.stock || 0);
      setValue('prodBadge', p.badge || '');
      setValue('prodBadgeType', p.badgeType || 'new');
      setValue('prodColors', Array.isArray(p.colors) ? p.colors.join(', ') : '');
      setValue('prodDesc', p.description || '');

      // Specs
      const s = p.specsObj || {};
      setValue('specScreen', s.screen || '');
      setValue('specProcessor', s.processor || '');
      setValue('specRam', s.ram || '');
      setValue('specStorage', s.storage || '');
      setValue('specCameras', s.cameras || '');
      setValue('specBattery', s.battery || '');

      // Foto
      const mainImg = p.imagen || p.image || '';
      setValue('prodImagePath', mainImg);
      updatePhotoPreview('prodPhotoPreviewImg', 'prodPhotoPreviewName', mainImg);

      AdminState.tempGallery = Array.isArray(p.gallery) ? [...p.gallery] : (mainImg ? [mainImg] : []);
      renderGalleryChips();
    } else {
      title.textContent = 'Nuevo Smartphone';
      form.reset();
      setValue('prodBrand', 'Apple');
      setValue('prodCategory', 'apple');
      setValue('prodRange', 'alta');
      setValue('prodStock', 5);
      setValue('prodBadge', 'NUEVO');
      setValue('prodBadgeType', 'new');
      setValue('prodImagePath', '');
      updatePhotoPreview('prodPhotoPreviewImg', 'prodPhotoPreviewName', '');
      AdminState.tempGallery = [];
      renderGalleryChips();
    }

    // Activar pestaña básica en modal
    switchModalTab('basic');
    modal.classList.add('active');
  }

  function saveProductFromModal(e) {
    if (e) e.preventDefault();

    const name = getValue('prodName').trim();
    const brand = getValue('prodBrand').trim();
    const price = Number(getValue('prodPrice'));
    const stock = Number(getValue('prodStock')) || 0;
    const image = getValue('prodImagePath').trim();

    if (!name || isNaN(price) || price <= 0) {
      showToast('Por favor ingrese un nombre y un precio numérico válido.', 'danger');
      return;
    }

    const originalPrice = Number(getValue('prodOriginalPrice')) || (price + 200);
    const range = getValue('prodRange') || 'alta';
    const category = getValue('prodCategory') || brand.toLowerCase();
    const badge = getValue('prodBadge').trim();
    const badgeType = getValue('prodBadgeType') || 'new';
    const desc = getValue('prodDesc').trim();
    const colors = getValue('prodColors').split(',').map(c => c.trim()).filter(Boolean);

    const specsObj = {
      screen: getValue('specScreen').trim() || "Pantalla AMOLED 120Hz",
      processor: getValue('specProcessor').trim() || "Octa-Core de Alto Rendimiento",
      ram: getValue('specRam').trim() || "8 GB RAM",
      storage: getValue('specStorage').trim() || "256 GB",
      cameras: getValue('specCameras').trim() || "Cámara Principal 50 MP",
      battery: getValue('specBattery').trim() || "5,000 mAh Carga Rápida"
    };

    const specsList = [
      specsObj.processor,
      specsObj.storage,
      specsObj.cameras.split('+')[0].trim(),
      specsObj.screen.includes('120') ? '120Hz' : specsObj.screen
    ].filter(Boolean);

    let gallery = AdminState.tempGallery.length > 0 ? AdminState.tempGallery : (image ? [image] : []);
    if (image && !gallery.includes(image)) {
      gallery.unshift(image);
    }

    if (AdminState.editingProductId) {
      // Editar existente
      const index = AdminState.smartphones.findIndex(p => p.id === AdminState.editingProductId);
      if (index !== -1) {
        const item = AdminState.smartphones[index];
        item.nombre = name;
        item.name = name;
        item.marca = brand;
        item.brand = brand;
        item.category = category;
        item.range = range;
        item.precio = price;
        item.price = price;
        item.originalPrice = originalPrice;
        item.stock = stock;
        item.imagen = image;
        item.image = image;
        item.badge = badge;
        item.badgeType = badgeType;
        item.description = desc;
        item.colors = colors.length > 0 ? colors : ["Estándar"];
        item.specsObj = specsObj;
        item.specs = specsList;
        item.gallery = gallery;
        item.disponible = stock > 0;
      }
      showToast(`Smartphone "${name}" actualizado correctamente.`, 'success');
    } else {
      // Crear nuevo
      const newId = slugify(name) + '-' + Math.floor(Math.random() * 1000);
      const newPhone = {
        id: newId,
        nombre: name,
        name: name,
        marca: brand,
        brand: brand,
        category: category,
        range: range,
        precio: price,
        price: price,
        originalPrice: originalPrice,
        imagen: image || 'assets/img/ui/Logo.jpeg',
        image: image || 'assets/img/ui/Logo.jpeg',
        badge: badge || 'NUEVO',
        badgeType: badgeType,
        stock: stock,
        rating: 4.9,
        reviewsCount: 12,
        gallery: gallery.length > 0 ? gallery : [image || 'assets/img/ui/Logo.jpeg'],
        specs: specsList,
        specsObj: specsObj,
        colors: colors.length > 0 ? colors : ["Negro", "Plata"],
        description: desc || "Smartphone oficial con garantía de 1 año en MacCell Perú.",
        disponible: stock > 0
      };
      AdminState.smartphones.unshift(newPhone);
      showToast(`Smartphone "${name}" incorporado al catálogo.`, 'success');
    }

    saveToLocalStorage();
    renderStats();
    renderCurrentTab();
    closeAllModals();
  }

  /* ----------------------------------------------------
     7. MODAL: AGREGAR Y EDITAR ACCESORIO
  ---------------------------------------------------- */
  function openAccessoryModal(id = null) {
    AdminState.editingProductId = id;
    AdminState.editingProductType = 'acc';

    const modal = document.getElementById('accessoryModal');
    const title = document.getElementById('accessoryModalTitle');
    const form = document.getElementById('accessoryForm');
    if (!modal || !form) return;

    if (id) {
      const a = AdminState.accesorios.find(x => x.id === id);
      if (!a) return;
      title.textContent = `Editar Accesorio: ${a.nombre || a.name}`;
      setValue('accName', a.nombre || a.name || '');
      setValue('accType', a.tipo || 'Cargador');
      setValue('accPrice', a.precio || a.price || '');
      setValue('accOriginalPrice', a.originalPrice || '');
      setValue('accStock', a.stock || 10);
      setValue('accBadge', a.badge || '');
      setValue('accSpecs', Array.isArray(a.specs) ? a.specs.join(', ') : '');
      const img = a.imagen || a.image || '';
      setValue('accImagePath', img);
      updatePhotoPreview('accPhotoPreviewImg', 'accPhotoPreviewName', img);
    } else {
      title.textContent = 'Nuevo Accesorio';
      form.reset();
      setValue('accType', 'Cargador Rápido');
      setValue('accStock', 15);
      setValue('accBadge', '100% ORIGINAL');
      setValue('accImagePath', '');
      updatePhotoPreview('accPhotoPreviewImg', 'accPhotoPreviewName', '');
    }

    modal.classList.add('active');
  }

  function saveAccessoryFromModal(e) {
    if (e) e.preventDefault();

    const name = getValue('accName').trim();
    const type = getValue('accType').trim();
    const price = Number(getValue('accPrice'));
    const stock = Number(getValue('accStock')) || 0;
    const image = getValue('accImagePath').trim();

    if (!name || isNaN(price) || price <= 0) {
      showToast('Por favor ingrese un nombre y un precio numérico válido.', 'danger');
      return;
    }

    const originalPrice = Number(getValue('accOriginalPrice')) || (price + 30);
    const badge = getValue('accBadge').trim() || 'ORIGINAL';
    const specs = getValue('accSpecs').split(',').map(s => s.trim()).filter(Boolean);

    if (AdminState.editingProductId) {
      const item = AdminState.accesorios.find(a => a.id === AdminState.editingProductId);
      if (item) {
        item.nombre = name;
        item.name = name;
        item.tipo = type;
        item.precio = price;
        item.price = price;
        item.originalPrice = originalPrice;
        item.stock = stock;
        item.imagen = image;
        item.image = image;
        item.badge = badge;
        item.specs = specs;
      }
      showToast(`Accesorio "${name}" actualizado correctamente.`, 'success');
    } else {
      const newAcc = {
        id: 'acc-' + slugify(name),
        nombre: name,
        name: name,
        tipo: type,
        precio: price,
        price: price,
        originalPrice: originalPrice,
        stock: stock,
        imagen: image || 'assets/img/ui/accesorios/cubo_20w_apple.webp',
        image: image || 'assets/img/ui/accesorios/cubo_20w_apple.webp',
        badge: badge,
        specs: specs.length > 0 ? specs : ["Original MacCell", "Garantía de Tienda"]
      };
      AdminState.accesorios.push(newAcc);
      showToast(`Accesorio "${name}" agregado al catálogo.`, 'success');
    }

    saveToLocalStorage();
    renderStats();
    renderCurrentTab();
    closeAllModals();
  }

  /* ----------------------------------------------------
     8. MODAL RÁPIDO DE FOTOS ("PONER FOTOS Y ACTUALIZARLAS")
  ---------------------------------------------------- */
  function openQuickPhotoModal(id, type = 'phone') {
    AdminState.quickPhotoProductId = id;
    AdminState.quickPhotoProductType = type;

    const list = type === 'phone' ? AdminState.smartphones : AdminState.accesorios;
    const item = list.find(x => x.id === id);
    if (!item) return;

    const modal = document.getElementById('quickPhotoModal');
    const title = document.getElementById('quickPhotoTitle');
    const inputPath = document.getElementById('quickPhotoInput');

    if (!modal) return;
    title.textContent = `Actualizar Fotografía: ${item.nombre || item.name}`;
    const currentImg = item.imagen || item.image || '';
    if (inputPath) inputPath.value = currentImg;

    updatePhotoPreview('quickPhotoPreviewImg', 'quickPhotoPreviewName', currentImg);
    modal.classList.add('active');
  }

  function saveQuickPhoto() {
    const id = AdminState.quickPhotoProductId;
    const type = AdminState.quickPhotoProductType;
    const newPath = getValue('quickPhotoInput').trim();

    if (!newPath) {
      showToast('Debe especificar una ruta o cargar un archivo de imagen.', 'danger');
      return;
    }

    const list = type === 'phone' ? AdminState.smartphones : AdminState.accesorios;
    const item = list.find(x => x.id === id);
    if (!item) return;

    item.imagen = newPath;
    item.image = newPath;

    if (type === 'phone') {
      if (!Array.isArray(item.gallery)) item.gallery = [];
      if (!item.gallery.includes(newPath)) {
        item.gallery.unshift(newPath);
      }
    }

    saveToLocalStorage();
    renderCurrentTab();
    closeAllModals();
    showToast(`Fotografía de "${item.nombre || item.name}" actualizada con éxito.`, 'success');
  }

  // Manejo de carga de archivos de imagen (PC -> Base64)
  function handleImageFileUpload(file, targetInputId, targetPreviewImgId, targetPreviewNameId) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Seleccione un formato de imagen compatible (JPG, PNG, WEBP).', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setValue(targetInputId, dataUrl);
      updatePhotoPreview(targetPreviewImgId, targetPreviewNameId, dataUrl, file.name);

      // Si estamos en modal de smartphone, añadir a la galería temporal
      if (targetInputId === 'prodImagePath') {
        if (!AdminState.tempGallery.includes(dataUrl)) {
          AdminState.tempGallery.unshift(dataUrl);
          renderGalleryChips();
        }
      }

      showToast(`Archivo "${file.name}" cargado correctamente.`, 'success');
    };
    reader.readAsDataURL(file);
  }

  function updatePhotoPreview(imgId, nameId, path, customName = null) {
    const imgEl = document.getElementById(imgId);
    const nameEl = document.getElementById(nameId);

    if (imgEl) {
      imgEl.src = path ? resolveImgPath(path) : 'assets/img/ui/Logo.jpeg';
    }
    if (nameEl) {
      if (customName) {
        nameEl.textContent = customName;
      } else if (path) {
        nameEl.textContent = path.startsWith('data:') ? 'Imagen Cargada desde tu PC (Base64)' : path.split('/').pop();
      } else {
        nameEl.textContent = 'Ninguna foto seleccionada';
      }
    }
  }

  function renderGalleryChips() {
    const container = document.getElementById('galleryChipsContainer');
    if (!container) return;

    if (AdminState.tempGallery.length === 0) {
      container.innerHTML = '<span style="font-size: 0.78rem; color: var(--admin-text-dim);">No hay fotos adicionales en la galería</span>';
      return;
    }

    let html = '';
    AdminState.tempGallery.forEach((img, idx) => {
      html += `
        <div class="gallery-chip-item">
          <img src="${resolveImgPath(img)}" onerror="this.src='assets/img/ui/Logo.jpeg'">
          <button type="button" class="gallery-chip-remove" onclick="window.AdminModule.removeGalleryItem(${idx})">✕</button>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  function removeGalleryItem(index) {
    AdminState.tempGallery.splice(index, 1);
    renderGalleryChips();
  }

  /* ----------------------------------------------------
     9. ELIMINACIÓN DE PRODUCTOS
  ---------------------------------------------------- */
  function deleteProduct(id, type = 'phone') {
    const list = type === 'phone' ? AdminState.smartphones : AdminState.accesorios;
    const item = list.find(x => x.id === id);
    if (!item) return;

    if (confirm(`¿Confirma la eliminación de "${item.nombre || item.name}" del catálogo? Esta acción no se puede deshacer.`)) {
      if (type === 'phone') {
        AdminState.smartphones = AdminState.smartphones.filter(x => x.id !== id);
      } else {
        AdminState.accesorios = AdminState.accesorios.filter(x => x.id !== id);
      }
      saveToLocalStorage();
      renderStats();
      renderCurrentTab();
      showToast(`Registro de "${item.nombre || item.name}" eliminado.`, 'info');
    }
  }

  /* ----------------------------------------------------
     10. CONTROL DE EVENTOS Y TABS
  ---------------------------------------------------- */
  function initEventListeners() {
    // Tabs Principales
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AdminState.currentTab = btn.getAttribute('data-tab');
        renderCurrentTab();
      });
    });

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('adminSearchInput');
    const searchClear = document.getElementById('adminSearchClear');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        AdminState.searchQuery = e.target.value.trim();
        if (searchClear) searchClear.style.display = AdminState.searchQuery ? 'block' : 'none';
        renderCurrentTab();
      });
    }
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        AdminState.searchQuery = '';
        searchClear.style.display = 'none';
        renderCurrentTab();
      });
    }

    // Filtro Marca
    const brandFilter = document.getElementById('adminBrandFilter');
    if (brandFilter) {
      brandFilter.addEventListener('change', (e) => {
        AdminState.brandFilter = e.target.value;
        renderCurrentTab();
      });
    }

    // Filtro Stock
    const stockFilter = document.getElementById('adminStockFilter');
    if (stockFilter) {
      stockFilter.addEventListener('change', (e) => {
        AdminState.stockFilter = e.target.value;
        renderCurrentTab();
      });
    }

    // View Toggle
    document.querySelectorAll('.btn-view-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-view-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AdminState.viewMode = btn.getAttribute('data-view');
        renderCurrentTab();
      });
    });

    // Cerrar modales con clic en fondo
    document.querySelectorAll('.admin-modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAllModals();
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });

    // Sincronizar campo de Marca con Categoría automáticamente
    const brandSelect = document.getElementById('prodBrand');
    const catSelect = document.getElementById('prodCategory');
    if (brandSelect && catSelect) {
      brandSelect.addEventListener('change', (e) => {
        const val = e.target.value.toLowerCase();
        if (catSelect.querySelector(`option[value="${val}"]`)) {
          catSelect.value = val;
        }
      });
    }
  }

  function switchModalTab(tabId) {
    document.querySelectorAll('.modal-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-modaltab') === tabId);
    });
    document.querySelectorAll('.modal-tab-pane').forEach(p => {
      p.style.display = p.getAttribute('data-pane') === tabId ? 'block' : 'none';
    });
  }

  function closeAllModals() {
    document.querySelectorAll('.admin-modal-overlay').forEach(m => m.classList.remove('active'));
  }

  /* ----------------------------------------------------
     11. NOTIFICACIONES TOAST EMPRESARIALES
  ---------------------------------------------------- */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const iconMap = {
      success: AdminIcons.check,
      danger: AdminIcons.alert,
      warning: AdminIcons.alert,
      info: AdminIcons.info
    };
    const iconSvg = iconMap[type] || AdminIcons.info;

    // Eliminar emojis y dejar texto limpio
    const cleanMsg = String(message)
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/gu, '')
      .trim();

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `<span class="toast-icon">${iconSvg}</span><span>${cleanMsg}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }

  /* ----------------------------------------------------
     12. HELPERS
  ---------------------------------------------------- */
  function resolveImgPath(path) {
    if (!path) return 'assets/img/ui/Logo.jpeg';
    if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Si estamos en /pages/admin.html y la ruta es relativa sin ../
    if (window.location.pathname.includes('/pages/')) {
      if (path.startsWith('../')) return path;
      return '../' + path;
    } else {
      if (path.startsWith('../')) return path.replace(/^\.\.\//, '');
      return path;
    }
  }

  function slugify(text) {
    if (!text) return 'item-' + Date.now();
    return text.toString().toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }

  function formatMoney(amount) {
    return Number(amount || 0).toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  /* ----------------------------------------------------
     13. EXPOSICIÓN GLOBAL PARA CONTROLADORES HTML
  ---------------------------------------------------- */
  window.AdminModule = {
    openProductModal,
    saveProductFromModal,
    openAccessoryModal,
    saveAccessoryFromModal,
    openQuickPhotoModal,
    saveQuickPhoto,
    handleImageFileUpload,
    modifyStock,
    setStockDirect,
    toggleProductActive,
    deleteProduct,
    removeGalleryItem,
    switchModalTab,
    closeAllModals,
    saveChangesLive: () => saveToLocalStorage(true),
    saveToDiskServer: saveDirectToDiskServer,
    downloadProductsFile: downloadProductsJsFile,
    copyJsCode: copyJsCodeToClipboard,
    exportJson: exportBackupJson,
    handleJsonUpload: importBackupJson,
    restoreFactory: restoreFactoryCatalog
  };

})();

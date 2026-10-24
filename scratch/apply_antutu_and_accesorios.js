const fs = require('fs');
const path = require('path');

// 1. Get current products
const productos = require('../data/products.js');

// 2. Kimovil AnTuTu scoring function
function getKimovilAntutu(p) {
  const name = (p.name || '').toLowerCase();
  const proc = (p.specsObj?.processor || '').toLowerCase();
  const brand = (p.brand || p.marca || '').toLowerCase();

  // === APPLE IPHONE ===
  if (brand.includes('apple') || name.includes('iphone')) {
    if (name.includes('iphone 18')) return 2650000;
    if (name.includes('iphone 17 pro')) return 2250000;
    if (name.includes('iphone 17')) return 1980000;
    if (name.includes('iphone 16 pro max') || name.includes('iphone 16 pro')) return 1811232;
    if (name.includes('iphone 16e') || name.includes('iphone 16')) return 1680000;
    if (name.includes('iphone 15 pro max') || name.includes('iphone 15 pro')) return 1560000;
    if (name.includes('iphone 15')) return 1430000;
    if (name.includes('iphone 14 pro max') || name.includes('iphone 14 pro')) return 1470000;
    if (name.includes('iphone 13 pro max') || name.includes('iphone 13 pro')) return 1325000;
    if (proc.includes('a19 pro')) return 2250000;
    if (proc.includes('a19')) return 1980000;
    if (proc.includes('a18 pro')) return 1811232;
    if (proc.includes('a18')) return 1680000;
    if (proc.includes('a17 pro')) return 1560000;
    if (proc.includes('a16')) return 1470000;
    if (proc.includes('a15')) return 1325000;
    return 1450000;
  }

  // === SAMSUNG ===
  if (brand.includes('samsung') || name.includes('galaxy')) {
    if (name.includes('s26 ultra')) return 3180000;
    if (name.includes('s26') || name.includes('s26+')) return 2920000;
    if (name.includes('s25 ultra')) return 3135223; // Exact Kimovil S25 Ultra v11
    if (name.includes('z fold 8')) return 3135000;
    if (name.includes('s25 fe')) return 1780000;
    if (name.includes('s24 fe')) return 1650000;
    if (name.includes('a57')) return 860000;
    if (name.includes('a56')) return 735000;
    if (name.includes('a37')) return 720000;
    if (name.includes('a36')) return 590000;
    if (name.includes('a27')) return 590000;
    if (name.includes('a17 5g') || (name.includes('a17') && proc.includes('1380'))) return 585000;
    if (name.includes('a17 4g') || (name.includes('a17') && proc.includes('g99'))) return 425000;
    if (name.includes('a16 5g')) return 440000;
    if (name.includes('a16')) return 420000;
    if (name.includes('a07')) return 270000;
    if (name.includes('a06')) return 265000;
    if (proc.includes('8 elite')) return 3135223;
    if (proc.includes('exynos 1480')) return 735000;
    if (proc.includes('exynos 1380')) return 590000;
    if (proc.includes('exynos 1330')) return 440000;
    if (proc.includes('g99')) return 420000;
    if (proc.includes('g85')) return 265000;
  }

  // === XIAOMI / REDMI ===
  if (brand.includes('xiaomi') || name.includes('redmi') || name.includes('xiaomi')) {
    if (name.includes('17 ultra')) return 2980000;
    if (name.includes('xiaomi 17 5g')) return 2880000;
    if (name.includes('17t pro')) return 2820000;
    if (name.includes('17t')) return 1750000;
    if (name.includes('15t pro')) return 2110000;
    if (name.includes('15t')) return 1450000;
    if (name.includes('14 ultra')) return 2080000;
    if (name.includes('xiaomi 12 5g')) return 1120000;
    if (name.includes('12 lite')) return 610000;
    
    // Redmi Note series
    if (name.includes('note 17 pro max')) return 740000;
    if (name.includes('note 17 pro 5g')) return 780000;
    if (name.includes('note 17')) return 575000;
    if (name.includes('note 15 pro+ 5g')) return 780000;
    if (name.includes('note 15 pro 5g')) return 780000;
    if (name.includes('note 15 pro 4g')) return 450000;
    if (name.includes('note 15 5g')) return 440000;
    if (name.includes('note 15')) return 345000;
    if (name.includes('note 14 pro+')) return 810000;
    if (name.includes('note 12 pro+')) return 540000;

    // Redmi series
    if (name.includes('redmi 17')) return 480000;
    if (name.includes('redmi 15c')) return 270000;
    if (name.includes('redmi 15')) return 430000;
    if (name.includes('redmi 13')) return 280000;
    if (name.includes('redmi a7 pro')) return 220000;
    if (name.includes('redmi a5')) return 155000;
  }

  // === MOTOROLA ===
  if (brand.includes('moto') || name.includes('moto')) {
    if (name.includes('signature ultra')) return 2850000;
    if (name.includes('razr 60 ultra')) return 1560000;
    if (name.includes('edge 60 pro')) return 2050000;
    if (name.includes('edge 50 ultra')) return 1540000;
    if (name.includes('edge 70 fusion')) return 870000;
    if (name.includes('edge 60 fusion')) return 680000;
    if (name.includes('edge 50')) return 660000;
    if (name.includes('g86 power')) return 580000;
    if (name.includes('g max 5g')) return 490000;
    if (name.includes('g77 5g')) return 490000;
    if (name.includes('g17')) return 270000;
    if (name.includes('g06')) return 245000;
  }

  // === HONOR ===
  if (brand.includes('honor')) {
    if (name.includes('win')) return 2850000;
    if (name.includes('magic 8 pro')) return 2080000;
    if (name.includes('600 pro')) return 2080000;
    if (name.includes('400 pro')) return 1540000;
    if (name.includes('600e') || name.includes('600 5g')) return 870000;
    if (name.includes('400 5g')) return 870000;
    if (name.includes('400 lite')) return 450000;
    if (name.includes('magic 8 lite') || name.includes('x9d')) return 575000;
    if (name.includes('x8d')) return 440000;
    if (name.includes('x7e') || name.includes('x7d')) return 320000;
    if (name.includes('x6d')) return 270000;
    if (name.includes('x6e') || name.includes('x5d') || name.includes('x5c') || name.includes('play 10')) return 155000;
    if (name.includes('play 20a')) return 220000;
  }

  // === POCO ===
  if (brand.includes('poco') || name.includes('poco')) {
    if (name.includes('f8 ultra')) return 2890000;
    if (name.includes('f8 pro')) return 2060000;
    if (name.includes('x8 pro max')) return 2120000;
    if (name.includes('x8 pro')) return 1750000;
    if (name.includes('x7 pro')) return 1650000;
    if (name.includes('c85') || name.includes('c71')) return 270000;
  }

  // === ZTE & NUBIA / REDMAGIC ===
  if (brand.includes('zte') || name.includes('zte') || name.includes('nubia') || name.includes('redmagic')) {
    if (name.includes('redmagic 11s')) return 2950000;
    if (name.includes('neo 5 5g max') || name.includes('neo 5 gt')) return 530000;
    if (name.includes('neo 5 5g')) return 510000;
    if (name.includes('v80 pro')) return 430000;
    if (name.includes('v80 max')) return 480000;
    if (name.includes('a76 5g')) return 480000;
    if (name.includes('v70 max')) return 250000;
    if (name.includes('v60 smart') || name.includes('a56 pro')) return 245000;
    if (name.includes('a35e') || name.includes('a71')) return 130000;
  }

  // === INFINIX ===
  if (brand.includes('infinix')) {
    if (name.includes('gt 50 pro')) return 1380000;
    if (name.includes('note edge') || name.includes('note 50 pro')) return 440000;
    if (name.includes('note 60 pro') || name.includes('hot 70 pro')) return 485000;
    if (name.includes('hot 60 pro')) return 430000;
    if (name.includes('hot 70')) return 280000;
    if (name.includes('hot 60i')) return 260000;
    if (name.includes('smart 10') || name.includes('smart 20') || name.includes('hot 40i')) return 245000;
  }

  // === GOOGLE PIXEL ===
  if (brand.includes('google') || name.includes('pixel')) {
    return 1550000;
  }

  // === REALME ===
  if (brand.includes('realme')) {
    if (name.includes('16 pro plus')) return 610000;
    if (name.includes('16 pro')) return 580000;
    if (name.includes('c75')) return 290000;
    if (name.includes('note 50') || name.includes('c53')) return 245000;
  }

  // === OPPO ===
  if (brand.includes('oppo')) {
    if (name.includes('find x7 ultra')) return 2100000;
    if (name.includes('reno 11') || name.includes('a6 pro')) return 580000;
    if (name.includes('a5 5g')) return 420000;
    if (name.includes('a6t') || name.includes('a6x') || name.includes('a6c')) return 320000;
  }

  // === TECNO ===
  if (brand.includes('tecno')) {
    if (name.includes('curve 2 5g')) return 480000;
    if (name.includes('spark 40 pro')) return 440000;
    if (name.includes('spark 50')) return 270000;
    if (name.includes('spark 40c')) return 155000;
    if (name.includes('spark go 3')) return 245000;
  }

  // Fallback by processor string inspection
  if (proc.includes('8 elite') || proc.includes('dimensity 9400')) return 2900000;
  if (proc.includes('8 gen 3') || proc.includes('dimensity 9300')) return 2080000;
  if (proc.includes('8s gen 3')) return 1540000;
  if (proc.includes('dimensity 8400')) return 1750000;
  if (proc.includes('dimensity 8300') || proc.includes('dimensity 8200')) return 1420000;
  if (proc.includes('7 gen 3') || proc.includes('exynos 1580')) return 870000;
  if (proc.includes('7200 ultra')) return 780000;
  if (proc.includes('exynos 1480')) return 735000;
  if (proc.includes('7s gen 2') || proc.includes('778g')) return 610000;
  if (proc.includes('exynos 1380') || proc.includes('7050')) return 585000;
  if (proc.includes('6 gen 1')) return 575000;
  if (proc.includes('7020') || proc.includes('7025') || proc.includes('t760') || proc.includes('t820')) return 485000;
  if (proc.includes('6080') || proc.includes('6020') || proc.includes('1080') || proc.includes('1330')) return 440000;
  if (proc.includes('g99') || proc.includes('g100')) return 430000;
  if (proc.includes('680') || proc.includes('685')) return 345000;
  if (proc.includes('g91') || proc.includes('g92')) return 285000;
  if (proc.includes('g85') || proc.includes('g81')) return 270000;
  if (proc.includes('t606') || proc.includes('t610') || proc.includes('t612')) return 245000;
  if (proc.includes('g36')) return 155000;
  if (proc.includes('sc9863')) return 130000;

  return 350000;
}

// Update each product's specsObj.antutu
productos.forEach(p => {
  if (!p.specsObj) {
    p.specsObj = {};
  }
  const score = getKimovilAntutu(p);
  p.specsObj.antutu = score;
});

// 3. Official Accessories Array
const accesorios = [
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
    "specs": [
      "Carga Rápida 20W",
      "Conector USB-C",
      "Compatibilidad iPhone / iPad"
    ]
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
    "specs": [
      "Doble Puerto USB-C",
      "40W Potencia Total",
      "Chip de Seguridad"
    ]
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
    "specs": [
      "Super Fast Charging 25W",
      "PD 3.0 PPS",
      "Certificado Samsung"
    ]
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
    "specs": [
      "Carga Ultra Rápida 2.0",
      "Compatible Galaxy S24 Ultra",
      "Incluye Cable 5A"
    ]
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
    "specs": [
      "Batería hasta 28 Horas",
      "Cancelación de Ruido AI",
      "Control Táctil"
    ]
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
    "specs": [
      "Sonido Hi-Fi AKG",
      "Diseño Ergonómico",
      "Conexión Instantánea Galaxy"
    ]
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
    "specs": [
      "Driver Dinámico 12mm",
      "Latencia Ultrabaja",
      "Resistente a Salpicaduras"
    ]
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
    "specs": [
      "Carga Rápida Power Delivery",
      "Transferencia 480 Mbps",
      "Conector Reforzado"
    ]
  }
];

// 4. Build output content
const content = `/* ===================================================
   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS
   Base de datos oficial MacCell Perú
   Incluye Puntuaciones AnTuTu v10 (Kimovil) y Accesorios
   =================================================== */

const productos = ${JSON.stringify(productos, null, 2)};

const accesorios = ${JSON.stringify(accesorios, null, 2)};

if (typeof window !== 'undefined') {
  window.productos = productos;
  window.PRODUCTS_DATA = productos;
  window.accesorios = accesorios;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = productos;
  module.exports.productos = productos;
  module.exports.accesorios = accesorios;
}
`;

fs.writeFileSync(path.join(__dirname, '../data/products.js'), content, 'utf8');
console.log('Successfully written data/products.js!');
console.log('Total productos:', productos.length);
console.log('Total accesorios:', accesorios.length);
console.log('Sample AnTuTu added:', productos[0].name, '->', productos[0].specsObj.antutu);

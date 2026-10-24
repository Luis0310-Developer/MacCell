const fs = require('fs');

const rawUrls = `
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_17_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_17_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_15C_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_15C_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/REDMI_15C_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_17_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/REDMI_15_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_PLUS_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_17_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_PLUS_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_PLUS_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/Xioami_18_pro_max.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_4G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_4G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/xiaomi_transparent.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_4G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/Xiaomi_logo_clean.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/xiaomi_mi_17_3.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/xiaomi_mi_17_4.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_13_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/xiaomi_mi_17_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_15_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_15_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_13_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/xiaomi_mi_17_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/NOTE_17_PRO_MAX_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/XIAOMI_17T_PRO_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/NOTE_17_PRO_MAX_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/REDMI_13_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_PRO_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/XIAOMI_17T_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_15_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_PRO_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/XIAOMI_17T_3.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_PRO_MAX_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/XIAOMI_17T_PRO_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_14_PRO_PLUS_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_14_PRO_PLUS_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_12_PRO_PLUS_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/XIAOMI_17T_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_14_PRO_PLUS_5G_1.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/XIAOMI_17T_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_12_PRO_PLUS_5G_4.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/REDMI_A7_PRO_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/MI_17_ULTRA_4.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/MI_17_ULTRA_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_12_PRO_PLUS_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/NOTE_12_PRO_PLUS_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A7_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_17_ULTRA_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A7_PRO_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_17_ULTRA_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_15T_PRO_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A5_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_LITE_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_LITE_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_LITE_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A5_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_PRO_5G_2.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/REDMI_A5_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_12_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_PRO_5G_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/REDMI_17_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_5G_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_12_5G_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/NOTE_17_PRO_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_5G_3.jpg
`;

const urls = rawUrls.trim().split('\n').map(s => s.trim()).filter(Boolean);

function toEtrim(url) {
  return url.replace('/image/upload/', '/image/upload/e_trim/');
}

const fileToUrl = {};
urls.forEach(u => {
  const file = u.substring(u.lastIndexOf('/') + 1);
  fileToUrl[file] = toEtrim(u);
});

const modelImages = {
  'redmi-a5': [
    fileToUrl['REDMI_A5_1.webp'],
    fileToUrl['REDMI_A5_2.webp'],
    fileToUrl['REDMI_A5_3.webp']
  ],
  'redmi-a7-pro': [
    fileToUrl['REDMI_A7_PRO_1.jpg'],
    fileToUrl['REDMI_A7_PRO_2.jpg'],
    fileToUrl['REDMI_A7_PRO_3.webp']
  ],
  'redmi-15c': [
    fileToUrl['REDMI_15C_1.webp'],
    fileToUrl['REDMI_15C_2.jpg'],
    fileToUrl['REDMI_15C_3.jpg']
  ],
  'redmi-13': [
    fileToUrl['REDMI_13_1.jpg'],
    fileToUrl['REDMI_13_2.jpg'],
    fileToUrl['REDMI_13_3.jpg']
  ],
  'redmi-15': [
    fileToUrl['REDMI_15_1.webp'],
    fileToUrl['REDMI_15_2.webp'],
    fileToUrl['REDMI_15_3.webp']
  ],
  'redmi-17': [
    fileToUrl['REDMI_17_1.jpg'],
    fileToUrl['REDMI_17_2.webp'],
    fileToUrl['REDMI_17_3.webp']
  ],
  'redmi-note-15-4g': [
    fileToUrl['NOTE_15_1.webp'],
    fileToUrl['NOTE_15_2.webp'],
    fileToUrl['NOTE_15_3.jpg']
  ],
  'redmi-note-15-5g': [
    fileToUrl['NOTE_15_5G_1.webp'],
    fileToUrl['NOTE_15_5G_2.webp'],
    fileToUrl['NOTE_15_5G_3.jpg']
  ],
  'redmi-note-17': [
    fileToUrl['NOTE_17_1.webp'],
    fileToUrl['NOTE_17_2.webp'],
    fileToUrl['NOTE_17_3.jpg']
  ],
  'redmi-note-17-pro-5g': [
    fileToUrl['NOTE_17_PRO_5G_1.webp'],
    fileToUrl['NOTE_17_PRO_5G_2.webp'],
    fileToUrl['NOTE_17_PRO_5G_3.webp']
  ],
  'redmi-note-17-pro-max': [
    fileToUrl['NOTE_17_PRO_MAX_1.webp'],
    fileToUrl['NOTE_17_PRO_MAX_2.webp'],
    fileToUrl['NOTE_17_PRO_MAX_3.webp']
  ],
  'redmi-note-15-pro-4g': [
    fileToUrl['NOTE_15_PRO_4G_1.webp'],
    fileToUrl['NOTE_15_PRO_4G_2.webp'],
    fileToUrl['NOTE_15_PRO_4G_3.jpg']
  ],
  'redmi-note-15-pro-5g': [
    fileToUrl['NOTE_15_PRO_5G_1.webp'],
    fileToUrl['NOTE_15_PRO_5G_2.jpg'],
    fileToUrl['NOTE_15_PRO_5G_3.webp']
  ],
  'redmi-note-12-pro-plus': [
    fileToUrl['NOTE_12_PRO_PLUS_5G_1.webp'],
    fileToUrl['NOTE_12_PRO_PLUS_5G_2.jpg'],
    fileToUrl['NOTE_12_PRO_PLUS_5G_3.jpg'],
    fileToUrl['NOTE_12_PRO_PLUS_5G_4.jpg']
  ],
  'redmi-note-14-pro-plus': [
    fileToUrl['NOTE_14_PRO_PLUS_5G_1.png'],
    fileToUrl['NOTE_14_PRO_PLUS_5G_2.jpg'],
    fileToUrl['NOTE_14_PRO_PLUS_5G_3.jpg']
  ],
  'redmi-note-15-pro-plus': [
    fileToUrl['NOTE_15_PRO_PLUS_1.webp'],
    fileToUrl['NOTE_15_PRO_PLUS_2.webp'],
    fileToUrl['NOTE_15_PRO_PLUS_3.webp']
  ],
  'xiaomi-mi-12-lite': [
    fileToUrl['MI_12_LITE_1.jpg'],
    fileToUrl['MI_12_LITE_2.jpg'],
    fileToUrl['MI_12_LITE_3.webp']
  ],
  'xiaomi-mi-12-5g': [
    fileToUrl['MI_12_5G_1.jpg'],
    fileToUrl['MI_12_5G_2.jpg'],
    fileToUrl['MI_12_5G_3.webp']
  ],
  'xiaomi-mi-15t': [
    fileToUrl['MI_15T_5G_1.jpg'],
    fileToUrl['MI_15T_5G_2.webp'],
    fileToUrl['MI_15T_5G_3.jpg']
  ],
  'xiaomi-mi-15t-pro': [
    fileToUrl['MI_15T_PRO_5G_1.jpg'],
    fileToUrl['MI_15T_PRO_5G_2.png'],
    fileToUrl['MI_15T_PRO_5G_3.jpg']
  ],
  'xiaomi-17t': [
    fileToUrl['XIAOMI_17T_1.webp'],
    fileToUrl['XIAOMI_17T_2.jpg'],
    fileToUrl['XIAOMI_17T_3.png']
  ],
  'xiaomi-17t-pro': [
    fileToUrl['XIAOMI_17T_PRO_1.jpg'],
    fileToUrl['XIAOMI_17T_PRO_2.jpg'],
    fileToUrl['XIAOMI_17T_PRO_3.jpg']
  ],
  'xiaomi-17': [
    fileToUrl['xiaomi_mi_17_1.jpg'],
    fileToUrl['xiaomi_mi_17_2.webp'],
    fileToUrl['xiaomi_mi_17_3.png'],
    fileToUrl['xiaomi_mi_17_4.webp']
  ],
  'xiaomi-17-ultra': [
    fileToUrl['MI_17_ULTRA_1.webp'],
    fileToUrl['MI_17_ULTRA_2.webp'],
    fileToUrl['MI_17_ULTRA_3.jpg'],
    fileToUrl['MI_17_ULTRA_4.webp']
  ],
  'xiaomi-14-ultra': [
    fileToUrl['Xioami_18_pro_max.jpg'],
    fileToUrl['xiaomi_transparent.png']
  ]
};

function getModelFamily(id) {
  if (id === 'xiaomi-14-ultra') return 'xiaomi-14-ultra';
  if (id.startsWith('redmi-a5-')) return 'redmi-a5';
  if (id.startsWith('redmi-a7-pro-')) return 'redmi-a7-pro';
  if (id.startsWith('redmi-15c-')) return 'redmi-15c';
  if (id.startsWith('redmi-13-')) return 'redmi-13';
  if (id.startsWith('redmi-15-')) return 'redmi-15';
  if (id.startsWith('redmi-17-')) return 'redmi-17';
  if (id.startsWith('redmi-note-15-5g-')) return 'redmi-note-15-5g';
  if (id.startsWith('redmi-note-15-pro-4g-')) return 'redmi-note-15-pro-4g';
  if (id.startsWith('redmi-note-15-pro-5g-')) return 'redmi-note-15-pro-5g';
  if (id.startsWith('redmi-note-15-pro-plus-')) return 'redmi-note-15-pro-plus';
  if (id.startsWith('redmi-note-15-')) return 'redmi-note-15-4g';
  if (id.startsWith('redmi-note-17-pro-max-')) return 'redmi-note-17-pro-max';
  if (id.startsWith('redmi-note-17-pro-5g-')) return 'redmi-note-17-pro-5g';
  if (id.startsWith('redmi-note-17-')) return 'redmi-note-17';
  if (id.startsWith('redmi-note-12-pro-plus-')) return 'redmi-note-12-pro-plus';
  if (id.startsWith('redmi-note-14-pro-plus-')) return 'redmi-note-14-pro-plus';
  if (id.startsWith('xiaomi-mi-12-lite-')) return 'xiaomi-mi-12-lite';
  if (id.startsWith('xiaomi-mi-12-5g-')) return 'xiaomi-mi-12-5g';
  if (id.startsWith('xiaomi-mi-15t-pro-')) return 'xiaomi-mi-15t-pro';
  if (id.startsWith('xiaomi-mi-15t-5g-')) return 'xiaomi-mi-15t';
  if (id.startsWith('xiaomi-17t-pro-')) return 'xiaomi-17t-pro';
  if (id.startsWith('xiaomi-17t-')) return 'xiaomi-17t';
  if (id.startsWith('xiaomi-17-ultra-')) return 'xiaomi-17-ultra';
  if (id.startsWith('xiaomi-17-')) return 'xiaomi-17';
  return null;
}

// 1. Update data/products.js
const code = fs.readFileSync('data/products.js', 'utf8');
const prods = new Function(code + '; return productos;')();

let updatedCount = 0;
prods.forEach(p => {
  if (p.marca === 'Xiaomi' || p.category === 'xiaomi') {
    const family = getModelFamily(p.id);
    if (family && modelImages[family]) {
      const imgs = modelImages[family];
      p.imagen = imgs[0];
      p.image = imgs[0];
      p.gallery = imgs;
      updatedCount++;
    }
  }
});

console.log(`Updated ${updatedCount} Xiaomi products in data/products.js`);

const header = `/* ===================================================\n   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS\n   Base de datos modular con rutas actualizadas\n   =================================================== */\n\nconst productos = `;
const footer = `;\n\nif (typeof window !== 'undefined') {\n  window.productos = productos;\n  window.PRODUCTS_DATA = productos;\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = productos;\n}\n`;

fs.writeFileSync('data/products.js', header + JSON.stringify(prods, null, 2) + footer, 'utf8');
console.log('Successfully saved data/products.js');

// 2. Update index.html & Inicio.html
const xiaomiPhoneImgUrl = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/Xioami_18_pro_max.jpg';
const xiaomiLogoImgUrl = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/Xiaomi_logo_clean.png';

['index.html', 'Inicio.html'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace('src="assets/img/brands/Xiaomi/Xioami 18 pro max.jpg"', `src="${xiaomiPhoneImgUrl}"`);
  content = content.replace('src="assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"', `src="${xiaomiLogoImgUrl}"`);
  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated ${f}`);
});

// 3. Update js/main.js and js/products-render.js fallbacks
let mainJs = fs.readFileSync('js/main.js', 'utf8');
mainJs = mainJs.replace("defaultImg = 'assets/img/brands/Xiaomi/Xioami 18 pro max.jpg';", `defaultImg = '${xiaomiPhoneImgUrl}';`);
mainJs = mainJs.replace("defaultFallbackPhone = resolveAssetPath('assets/img/brands/Xiaomi/Xioami 18 pro max.jpg');", `defaultFallbackPhone = '${xiaomiPhoneImgUrl}';`);
fs.writeFileSync('js/main.js', mainJs, 'utf8');
console.log('Updated js/main.js');

let prodRenderJs = fs.readFileSync('js/products-render.js', 'utf8');
prodRenderJs = prodRenderJs.replace("defaultFallback = resolveAssetPath('assets/img/brands/Xiaomi/Xioami 18 pro max.jpg');", `defaultFallback = '${xiaomiPhoneImgUrl}';`);
fs.writeFileSync('js/products-render.js', prodRenderJs, 'utf8');
console.log('Updated js/products-render.js');

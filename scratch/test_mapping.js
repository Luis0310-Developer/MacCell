const fs = require('fs');

const { urls } = (() => {
  const content = fs.readFileSync('scratch/map_urls.js', 'utf8');
  const m = content.match(/const rawUrls = `([\s\S]*?)`;/);
  return { urls: m[1].trim().split('\n').map(s => s.trim()).filter(Boolean) };
})();

function toEtrim(url) {
  return url.replace('/image/upload/', '/image/upload/e_trim/');
}

// Build map from filename to e_trim URL
const fileToUrl = {};
urls.forEach(u => {
  const file = u.substring(u.lastIndexOf('/') + 1);
  fileToUrl[file] = toEtrim(u);
});

// Define mapping from model family to files in order (index 1, 2, 3...)
const modelImages = {
  'redmi-a5': [
    'REDMI_A5_1.webp',
    'REDMI_A5_2.webp',
    'REDMI_A5_3.webp'
  ],
  'redmi-a7-pro': [
    'REDMI_A7_PRO_1.jpg',
    'REDMI_A7_PRO_2.jpg',
    'REDMI_A7_PRO_3.webp'
  ],
  'redmi-15c': [
    'REDMI_15C_1.webp',
    'REDMI_15C_2.jpg',
    'REDMI_15C_3.jpg'
  ],
  'redmi-13': [
    'REDMI_13_1.jpg',
    'REDMI_13_2.jpg',
    'REDMI_13_3.jpg'
  ],
  'redmi-15': [
    'REDMI_15_1.webp',
    'REDMI_15_2.webp',
    'REDMI_15_3.webp'
  ],
  'redmi-17': [
    'REDMI_17_1.jpg',
    'REDMI_17_2.webp',
    'REDMI_17_3.webp'
  ],
  'redmi-note-15-4g': [
    'NOTE_15_1.webp',
    'NOTE_15_2.webp',
    'NOTE_15_3.jpg'
  ],
  'redmi-note-15-5g': [
    'NOTE_15_5G_1.webp',
    'NOTE_15_5G_2.webp',
    'NOTE_15_5G_3.jpg'
  ],
  'redmi-note-17': [
    'NOTE_17_1.webp',
    'NOTE_17_2.webp',
    'NOTE_17_3.jpg'
  ],
  'redmi-note-17-pro-5g': [
    'NOTE_17_PRO_5G_1.webp',
    'NOTE_17_PRO_5G_2.webp',
    'NOTE_17_PRO_5G_3.webp'
  ],
  'redmi-note-17-pro-max': [
    'NOTE_17_PRO_MAX_1.webp',
    'NOTE_17_PRO_MAX_2.webp',
    'NOTE_17_PRO_MAX_3.webp'
  ],
  'redmi-note-15-pro-4g': [
    'NOTE_15_PRO_4G_1.webp',
    'NOTE_15_PRO_4G_2.webp',
    'NOTE_15_PRO_4G_3.jpg'
  ],
  'redmi-note-15-pro-5g': [
    'NOTE_15_PRO_5G_1.webp',
    'NOTE_15_PRO_5G_2.jpg',
    'NOTE_15_PRO_5G_3.webp'
  ],
  'redmi-note-12-pro-plus': [
    'NOTE_12_PRO_PLUS_5G_1.webp',
    'NOTE_12_PRO_PLUS_5G_2.jpg',
    'NOTE_12_PRO_PLUS_5G_3.jpg',
    'NOTE_12_PRO_PLUS_5G_4.jpg'
  ],
  'redmi-note-14-pro-plus': [
    'NOTE_14_PRO_PLUS_5G_1.png',
    'NOTE_14_PRO_PLUS_5G_2.jpg',
    'NOTE_14_PRO_PLUS_5G_3.jpg'
  ],
  'redmi-note-15-pro-plus': [
    'NOTE_15_PRO_PLUS_1.webp',
    'NOTE_15_PRO_PLUS_2.webp',
    'NOTE_15_PRO_PLUS_3.webp'
  ],
  'xiaomi-mi-12-lite': [
    'MI_12_LITE_1.jpg',
    'MI_12_LITE_2.jpg',
    'MI_12_LITE_3.webp'
  ],
  'xiaomi-mi-12-5g': [
    'MI_12_5G_1.jpg',
    'MI_12_5G_2.jpg',
    'MI_12_5G_3.webp'
  ],
  'xiaomi-mi-15t': [
    'MI_15T_5G_1.jpg',
    'MI_15T_5G_2.webp',
    'MI_15T_5G_3.jpg'
  ],
  'xiaomi-mi-15t-pro': [
    'MI_15T_PRO_5G_1.jpg',
    'MI_15T_PRO_5G_2.png',
    'MI_15T_PRO_5G_3.jpg'
  ],
  'xiaomi-17t': [
    'XIAOMI_17T_1.webp',
    'XIAOMI_17T_2.jpg',
    'XIAOMI_17T_3.png'
  ],
  'xiaomi-17t-pro': [
    'XIAOMI_17T_PRO_1.jpg',
    'XIAOMI_17T_PRO_2.jpg',
    'XIAOMI_17T_PRO_3.jpg'
  ],
  'xiaomi-17': [
    'xiaomi_mi_17_1.jpg',
    'xiaomi_mi_17_2.webp',
    'xiaomi_mi_17_3.png',
    'xiaomi_mi_17_4.webp'
  ],
  'xiaomi-17-ultra': [
    'MI_17_ULTRA_1.webp',
    'MI_17_ULTRA_2.webp',
    'MI_17_ULTRA_3.jpg',
    'MI_17_ULTRA_4.webp'
  ],
  'xiaomi-14-ultra': [
    'Xioami_18_pro_max.jpg',
    'xiaomi_transparent.png'
  ]
};

// Check that all filenames exist in fileToUrl
for (const [family, files] of Object.entries(modelImages)) {
  for (const f of files) {
    if (!fileToUrl[f]) {
      console.error(`MISSING URL FOR: ${f} in family ${family}`);
    }
  }
}
console.log('All modelImages files resolved to Cloudinary URLs successfully!');

// Now test mapping to the 44 products in data/products.js
const prods = new Function(fs.readFileSync('data/products.js', 'utf8') + '; return productos;')();
const xiaomiProds = prods.filter(p => p.marca === 'Xiaomi' || p.category === 'xiaomi');

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
  if (id.startsWith('redmi-note-15-')) return 'redmi-note-15-4g'; // standard Note 15
  if (id.startsWith('redmi-note-17-pro-max-')) return 'redmi-note-17-pro-max';
  if (id.startsWith('redmi-note-17-pro-5g-')) return 'redmi-note-17-pro-5g';
  if (id.startsWith('redmi-note-17-')) return 'redmi-note-17';
  if (id.startsWith('redmi-note-12-pro-plus-')) return 'redmi-note-12-pro-plus';
  if (id.startsWith('redmi-note-14-pro-plus-')) return 'redmi-note-14-pro-plus';
  if (id.startsWith('xiaomi-mi-12-lite-')) return 'xiaomi-mi-12-lite';
  if (id.startsWith('xiaomi-mi-12-5g-')) return 'xiaomi-mi-12-5g';
  if (id.startsWith('xiaomi-mi-15t-pro-')) return 'xiaomi-mi-15t-pro';
  if (id.startsWith('xiaomi-mi-15t-5g-')) return 'xiaomi-mi-15t-5g';
  if (id.startsWith('xiaomi-17t-pro-')) return 'xiaomi-17t-pro';
  if (id.startsWith('xiaomi-17t-')) return 'xiaomi-17t';
  if (id.startsWith('xiaomi-17-ultra-')) return 'xiaomi-17-ultra';
  if (id.startsWith('xiaomi-17-')) return 'xiaomi-17';
  return null;
}

let unmapped = 0;
xiaomiProds.forEach(p => {
  const family = getModelFamily(p.id);
  if (!family || !modelImages[family]) {
    console.error(`UNMAPPED PRODUCT: ${p.id} - ${p.nombre}`);
    unmapped++;
  } else {
    console.log(`[OK] ${p.id} -> Family: ${family} (${modelImages[family].length} images, main: ${modelImages[family][0]})`);
  }
});

console.log(`Total checked: ${xiaomiProds.length}, Unmapped: ${unmapped}`);

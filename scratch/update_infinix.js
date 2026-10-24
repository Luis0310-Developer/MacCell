const fs = require('fs');

const infinixUpdates = {
  'infinix-smart-10-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735074/NFINIX_SMART_10_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735074/NFINIX_SMART_10_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735078/NFINIX_SMART_10_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735082/NFINIX_SMART_10_3.webp'
    ]
  },
  'infinix-smart-20-64gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734997/INFINIX_SMART_20_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734997/INFINIX_SMART_20_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735001/INFINIX_SMART_20_2.png',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735005/INFINIX_SMART_20_3.jpg'
    ]
  },
  'infinix-smart-20-128gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734997/INFINIX_SMART_20_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734997/INFINIX_SMART_20_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735001/INFINIX_SMART_20_2.png',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792735005/INFINIX_SMART_20_3.jpg'
    ]
  },
  'infinix-hot-40i-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734893/INFINIX_HOT_40I_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734893/INFINIX_HOT_40I_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734889/INFINIX_HOT_40I_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734897/INFINIX_HOT_40I_3.jpg'
    ]
  },
  'infinix-hot-60i-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734925/INFINIX_HOT_60I_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734925/INFINIX_HOT_60I_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734929/INFINIX_HOT_60I_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734933/INFINIX_HOT_60I_3.jpg'
    ]
  },
  'infinix-hot-60-pro-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734901/INFINIX_HOT_60_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734901/INFINIX_HOT_60_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734905/INFINIX_HOT_60_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734909/INFINIX_HOT_60_PRO_3.jpg'
    ]
  },
  'infinix-hot-60-pro-plus-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734913/INFINIX_HOT_60_PRO_PLUS_1.jpg',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734913/INFINIX_HOT_60_PRO_PLUS_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734917/INFINIX_HOT_60_PRO_PLUS_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734921/INFINIX_HOT_60_PRO_PLUS_3.webp'
    ]
  },
  'infinix-hot-70-128gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734937/INFINIX_HOT_70_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734937/INFINIX_HOT_70_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734941/INFINIX_HOT_70_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734945/INFINIX_HOT_70_3.jpg'
    ]
  },
  'infinix-hot-70-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734937/INFINIX_HOT_70_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734937/INFINIX_HOT_70_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734941/INFINIX_HOT_70_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734945/INFINIX_HOT_70_3.jpg'
    ]
  },
  'infinix-hot-70-pro-5g-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734949/INFINIX_HOT_70_PRO_5G_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734949/INFINIX_HOT_70_PRO_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734953/INFINIX_HOT_70_PRO_5G_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734957/INFINIX_HOT_70_PRO_5G_3.jpg'
    ]
  },
  'infinix-note-50-pro-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734961/INFINIX_NOTE_50_PRO_1.jpg',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734961/INFINIX_NOTE_50_PRO_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734965/INFINIX_NOTE_50_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734969/INFINIX_NOTE_50_PRO_3.jpg'
    ]
  },
  'infinix-note-60-pro-256gb-wireless': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734973/INFINIX_NOTE_60_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734973/INFINIX_NOTE_60_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734977/INFINIX_NOTE_60_PRO_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734981/INFINIX_NOTE_60_PRO_3.webp'
    ]
  },
  'infinix-note-60-pro-pininfarina-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734973/INFINIX_NOTE_60_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734973/INFINIX_NOTE_60_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734977/INFINIX_NOTE_60_PRO_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734981/INFINIX_NOTE_60_PRO_3.webp'
    ]
  },
  'infinix-note-edge-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734985/INFINIX_NOTE_EDGE_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734985/INFINIX_NOTE_EDGE_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734989/INFINIX_NOTE_EDGE_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734993/INFINIX_NOTE_EDGE_3.png'
    ]
  },
  'infinix-gt-50-pro-gamer-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734877/INFINIX_GT_50_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734877/INFINIX_GT_50_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734881/INFINIX_GT_50_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734886/INFINIX_GT_50_PRO_3.jpg'
    ]
  }
};

const code = fs.readFileSync('./data/products.js', 'utf8');
const prods = new Function(code + '; return productos;')();

let updatedCount = 0;
prods.forEach(p => {
  if (infinixUpdates[p.id]) {
    p.imagen = infinixUpdates[p.id].main;
    p.image = infinixUpdates[p.id].main;
    p.gallery = infinixUpdates[p.id].gallery;
    updatedCount++;
  }
});

console.log('Updated Infinix products:', updatedCount);

const header = `/* ===================================================\n   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS\n   Base de datos modular con rutas actualizadas\n   =================================================== */\n\nconst productos = `;
const footer = `;\n\nif (typeof window !== 'undefined') {\n  window.productos = productos;\n  window.PRODUCTS_DATA = productos;\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = productos;\n}\n`;

fs.writeFileSync('./data/products.js', header + JSON.stringify(prods, null, 2) + footer, 'utf8');
console.log('Successfully wrote data/products.js');

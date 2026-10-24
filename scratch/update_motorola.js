const fs = require('fs');

const motoUpdates = {
  'moto-g06-64gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733327/MOTO_G06_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733327/MOTO_G06_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733330/MOTO_G06_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733333/MOTO_G06_3.webp'
    ]
  },
  'moto-g06-128gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733327/MOTO_G06_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733327/MOTO_G06_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733330/MOTO_G06_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733333/MOTO_G06_3.webp'
    ]
  },
  'moto-g06-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733327/MOTO_G06_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733327/MOTO_G06_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733330/MOTO_G06_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733333/MOTO_G06_3.webp'
    ]
  },
  'moto-g17-128gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734232/MOTO_G17_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734232/MOTO_G17_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734235/MOTO_G17_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734240/MOTO_G17_3.webp'
    ]
  },
  'moto-g17-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734232/MOTO_G17_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734232/MOTO_G17_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734235/MOTO_G17_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734240/MOTO_G17_3.webp'
    ]
  },
  'moto-g77-5g-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734244/MOTO_G77_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734244/MOTO_G77_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734247/MOTO_G77_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734251/MOTO_G77_3.webp'
    ]
  },
  'moto-g86-power-5g-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734258/MOTO_G86_POWER_5G_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734258/MOTO_G86_POWER_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734255/MOTO_G86_POWER_5G_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734262/MOTO_G86_POWER_5G_3.webp'
    ]
  },
  'moto-g-max-5g-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733317/MOTO_G_MAX_5G_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733317/MOTO_G_MAX_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733320/MOTO_G_MAX_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733323/MOTO_G_MAX_5G_3.jpg'
    ]
  },
  'moto-edge-60-fusion-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733297/MOTO_EDGE_60_FUSION_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733297/MOTO_EDGE_60_FUSION_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733294/MOTO_EDGE_60_FUSION_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733301/MOTO_EDGE_60_FUSION_3.jpg'
    ]
  },
  'moto-edge-70-fusion-fifa-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733307/MOTO_EDGE_70_FUSION_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733307/MOTO_EDGE_70_FUSION_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733310/MOTO_EDGE_70_FUSION_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733314/MOTO_EDGE_70_FUSION_3.webp'
    ]
  },
  'moto-edge-50-buds-pack-256gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733272/MOTO_EDGE_50_1.jpg',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733272/MOTO_EDGE_50_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733275/MOTO_EDGE_50_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733278/MOTO_EDGE_50_3.jpg'
    ]
  },
  'moto-edge-50-ultra-512gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733291/MOTO_EDGE_50_ULTRA_5G.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733291/MOTO_EDGE_50_ULTRA_5G.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733281/MOTO_EDGE_50_ULTRA_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733284/MOTO_EDGE_50_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733288/MOTO_EDGE_50_ULTRA_3.webp'
    ]
  },
  'moto-edge-60-pro-512gb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733304/MOTO_EDGE_60_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792733304/MOTO_EDGE_60_PRO_1.webp'
    ]
  },
  'moto-razr-60-ultra-1tb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734265/MOTO_RAZR_60_ULTRA_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734265/MOTO_RAZR_60_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734269/MOTO_RAZR_60_ULTRA_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734272/MOTO_RAZR_60_ULTRA_3.webp'
    ]
  },
  'motorola-signature-1tb': {
    main: 'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734280/MOTOROLA_SIGNATURE_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734280/MOTOROLA_SIGNATURE_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734283/MOTOROLA_SIGNATURE_2.avif',
      'https://res.cloudinary.com/qknps0t6/image/upload/e_trim/v1792734287/MOTOROLA_SIGNATURE_3.avif'
    ]
  }
};

const code = fs.readFileSync('./data/products.js', 'utf8');
const prods = new Function(code + '; return productos;')();

let updatedCount = 0;
prods.forEach(p => {
  if (motoUpdates[p.id]) {
    p.imagen = motoUpdates[p.id].main;
    p.image = motoUpdates[p.id].main;
    p.gallery = motoUpdates[p.id].gallery;
    updatedCount++;
  }
});

console.log('Updated Motorola products:', updatedCount);

const header = `/* ===================================================\n   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS\n   Base de datos modular con rutas actualizadas\n   =================================================== */\n\nconst productos = `;
const footer = `;\n\nif (typeof window !== 'undefined') {\n  window.productos = productos;\n  window.PRODUCTS_DATA = productos;\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = productos;\n}\n`;

fs.writeFileSync('./data/products.js', header + JSON.stringify(prods, null, 2) + footer, 'utf8');
console.log('Successfully wrote data/products.js');

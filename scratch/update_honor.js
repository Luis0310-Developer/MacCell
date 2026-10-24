const fs = require('fs');

const rawHonorUrls = `
https://res.cloudinary.com/qknps0t6/image/upload/v1792797020/Honor_logo_clean.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792797019/HONOR_X9D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797018/HONOR_X9D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797017/HONOR_X9D_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797016/HONOR_X8D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797014/HONOR_X8D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797014/HONOR_X8D_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797012/HONOR_X7E_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797011/HONOR_X7E_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797010/HONOR_X7E_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797009/HONOR_X7D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797008/HONOR_X7D_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792797007/HONOR_X7D_1.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792797005/HONOR_X6E_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797004/HONOR_X6E_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792797003/HONOR_X6E_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792797002/HONOR_X6D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797001/HONOR_X6D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797000/HONOR_X6D_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796999/HONOR_X5D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796998/HONOR_X5D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796997/HONOR_X5D_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796996/HONOR_X5C_PLUS_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796995/HONOR_X5C_PLUS_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796993/HONOR_X5C_PLUS_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796992/HONOR_X5C_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796991/HONOR_X5C_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796990/HONOR_X5C_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796989/HONOR_WIN_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796988/HONOR_WIN_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796987/HONOR_WIN_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796985/HONOR_PLAY_20A_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796985/HONOR_PLAY_20A_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796983/HONOR_PLAY_20A_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796982/HONOR_PLAY_10_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796981/HONOR_PLAY_10_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796979/HONOR_PLAY_10_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796978/HONOR_MAGIC_8_PRO.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796976/HONOR_MAGIC_8_PRO_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796975/HONOR_MAGIC_8_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796973/HONOR_MAGIC_8_PRO_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796972/HONOR_MAGIC_8_LITE_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796971/HONOR_MAGIC_8_LITE_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796970/HONOR_MAGIC_8_LITE_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796969/Honor_logo.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792796966/HONOR_600E_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796965/HONOR_600E_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796964/HONOR_600E_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796963/HONOR_600_PRO_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796961/HONOR_600_PRO_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796960/HONOR_600_PRO_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796959/HONOR_600_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796958/HONOR_600_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796957/HONOR_600_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796956/HONOR_400_PRO_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796955/HONOR_400_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796952/HONOR_400_LITE_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796954/HONOR_400_PRO_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796951/HONOR_400_LITE_2.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792796944/HONOR_400_LITE_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796929/HONOR_400_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796928/HONOR_400_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796928/HONOR_400_1.webp
`;

const urls = rawHonorUrls.trim().split('\n').map(s => s.trim()).filter(Boolean);

function toEtrim(url) {
  return url.replace('/image/upload/', '/image/upload/e_trim/');
}

const fileToUrl = {};
urls.forEach(u => {
  const file = u.substring(u.lastIndexOf('/') + 1);
  fileToUrl[file] = toEtrim(u);
});

const modelImages = {
  'honor-play-10': [
    fileToUrl['HONOR_PLAY_10_1.webp'],
    fileToUrl['HONOR_PLAY_10_2.webp'],
    fileToUrl['HONOR_PLAY_10_3.jpg']
  ],
  'honor-play-20a': [
    fileToUrl['HONOR_PLAY_20A_1.webp'],
    fileToUrl['HONOR_PLAY_20A_2.jpg'],
    fileToUrl['HONOR_PLAY_20A_3.jpg']
  ],
  'honor-x5c': [
    fileToUrl['HONOR_X5C_1.jpg'],
    fileToUrl['HONOR_X5C_2.webp'],
    fileToUrl['HONOR_X5C_3.jpg']
  ],
  'honor-x5c-plus': [
    fileToUrl['HONOR_X5C_PLUS_1.webp'],
    fileToUrl['HONOR_X5C_PLUS_2.webp'],
    fileToUrl['HONOR_X5C_PLUS_3.webp']
  ],
  'honor-x5d': [
    fileToUrl['HONOR_X5D_1.jpg'],
    fileToUrl['HONOR_X5D_2.jpg'],
    fileToUrl['HONOR_X5D_3.jpg']
  ],
  'honor-x6e': [
    fileToUrl['HONOR_X6E_1.webp'],
    fileToUrl['HONOR_X6E_2.webp'],
    fileToUrl['HONOR_X6E_3.jpg']
  ],
  'honor-x6d': [
    fileToUrl['HONOR_X6D_1.webp'],
    fileToUrl['HONOR_X6D_2.jpg'],
    fileToUrl['HONOR_X6D_3.jpg']
  ],
  'honor-x7d': [
    fileToUrl['HONOR_X7D_1.png'],
    fileToUrl['HONOR_X7D_2.webp'],
    fileToUrl['HONOR_X7D_3.jpg']
  ],
  'honor-x7e': [
    fileToUrl['HONOR_X7E_1.jpg'],
    fileToUrl['HONOR_X7E_2.jpg'],
    fileToUrl['HONOR_X7E_3.jpg']
  ],
  'honor-x8d': [
    fileToUrl['HONOR_X8D_1.jpg'],
    fileToUrl['HONOR_X8D_2.jpg'],
    fileToUrl['HONOR_X8D_3.jpg']
  ],
  'honor-x9d': [
    fileToUrl['HONOR_X9D_1.jpg'],
    fileToUrl['HONOR_X9D_2.jpg'],
    fileToUrl['HONOR_X9D_3.jpg']
  ],
  'honor-magic-8-lite': [
    fileToUrl['HONOR_MAGIC_8_LITE_5G_1.webp'],
    fileToUrl['HONOR_MAGIC_8_LITE_5G_2.webp'],
    fileToUrl['HONOR_MAGIC_8_LITE_5G_3.webp']
  ],
  'honor-400-lite': [
    fileToUrl['HONOR_400_LITE_1.webp'],
    fileToUrl['HONOR_400_LITE_2.png'],
    fileToUrl['HONOR_400_LITE_3.jpg']
  ],
  'honor-400': [
    fileToUrl['HONOR_400_1.webp'],
    fileToUrl['HONOR_400_2.jpg'],
    fileToUrl['HONOR_400_3.jpg']
  ],
  'honor-600e': [
    fileToUrl['HONOR_600E_1.jpg'],
    fileToUrl['HONOR_600E_2.jpg'],
    fileToUrl['HONOR_600E_3.jpg']
  ],
  'honor-600': [
    fileToUrl['HONOR_600_1.jpg'],
    fileToUrl['HONOR_600_2.webp'],
    fileToUrl['HONOR_600_3.webp']
  ],
  'honor-600-pro': [
    fileToUrl['HONOR_600_PRO_5G_1.webp'],
    fileToUrl['HONOR_600_PRO_5G_2.jpg'],
    fileToUrl['HONOR_600_PRO_5G_3.webp']
  ],
  'honor-win': [
    fileToUrl['HONOR_WIN_1.webp'],
    fileToUrl['HONOR_WIN_2.jpg'],
    fileToUrl['HONOR_WIN_3.jpg']
  ],
  'honor-400-pro': [
    fileToUrl['HONOR_400_PRO_1.jpg'],
    fileToUrl['HONOR_400_PRO_2.jpg'],
    fileToUrl['HONOR_400_PRO_3.jpg']
  ],
  'honor-magic-8-pro': [
    fileToUrl['HONOR_MAGIC_8_PRO_1.webp'],
    fileToUrl['HONOR_MAGIC_8_PRO_2.jpg'],
    fileToUrl['HONOR_MAGIC_8_PRO_3.webp']
  ]
};

function getModelFamily(id) {
  if (id.startsWith('honor-play-10-')) return 'honor-play-10';
  if (id.startsWith('honor-play-20a-')) return 'honor-play-20a';
  if (id.startsWith('honor-x5c-plus-')) return 'honor-x5c-plus';
  if (id.startsWith('honor-x5c-')) return 'honor-x5c';
  if (id.startsWith('honor-x5d-')) return 'honor-x5d';
  if (id.startsWith('honor-x6e-')) return 'honor-x6e';
  if (id.startsWith('honor-x6d-')) return 'honor-x6d';
  if (id.startsWith('honor-x7d-')) return 'honor-x7d';
  if (id.startsWith('honor-x7e-')) return 'honor-x7e';
  if (id.startsWith('honor-x8d-')) return 'honor-x8d';
  if (id.startsWith('honor-x9d-')) return 'honor-x9d';
  if (id.startsWith('honor-magic-8-lite-')) return 'honor-magic-8-lite';
  if (id.startsWith('honor-magic-8-pro-')) return 'honor-magic-8-pro';
  if (id.startsWith('honor-400-lite-')) return 'honor-400-lite';
  if (id.startsWith('honor-400-pro-')) return 'honor-400-pro';
  if (id.startsWith('honor-400-')) return 'honor-400';
  if (id.startsWith('honor-600e-')) return 'honor-600e';
  if (id.startsWith('honor-600-pro-')) return 'honor-600-pro';
  if (id.startsWith('honor-600-')) return 'honor-600';
  if (id.startsWith('honor-win-')) return 'honor-win';
  return null;
}

// 1. Update data/products.js
const code = fs.readFileSync('data/products.js', 'utf8');
const prods = new Function(code + '; return productos;')();

let updatedCount = 0;
prods.forEach(p => {
  if (p.marca?.toLowerCase() === 'honor' || p.category?.toLowerCase() === 'honor') {
    const family = getModelFamily(p.id);
    if (family && modelImages[family]) {
      const imgs = modelImages[family];
      p.imagen = imgs[0];
      p.image = imgs[0];
      p.gallery = imgs;
      updatedCount++;
    } else {
      console.error(`COULD NOT MAP HONOR PRODUCT: ${p.id} (${p.nombre})`);
    }
  }
});

console.log(`Updated ${updatedCount} Honor products in data/products.js`);

const header = `/* ===================================================\n   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS\n   Base de datos modular con rutas actualizadas\n   =================================================== */\n\nconst productos = `;
const footer = `;\n\nif (typeof window !== 'undefined') {\n  window.productos = productos;\n  window.PRODUCTS_DATA = productos;\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = productos;\n}\n`;

fs.writeFileSync('data/products.js', header + JSON.stringify(prods, null, 2) + footer, 'utf8');
console.log('Successfully saved data/products.js');

// 2. Update index.html & Inicio.html
const honorPhoneImgUrl = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792796978/HONOR_MAGIC_8_PRO.webp';
const honorLogoImgUrl = 'https://res.cloudinary.com/qknps0t6/image/upload/v1792797020/Honor_logo_clean.png';

['index.html', 'Inicio.html'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace('src="assets/img/brands/Honor/HONOR MAGIC 8 PRO.webp"', `src="${honorPhoneImgUrl}"`);
  content = content.replace('src="assets/img/brands/Honor/Honor_logo_clean.png"', `src="${honorLogoImgUrl}"`);
  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated ${f}`);
});

// 3. Update js/main.js and js/products-render.js fallbacks
let mainJs = fs.readFileSync('js/main.js', 'utf8');
mainJs = mainJs.replace("defaultImg = 'assets/img/brands/Honor/HONOR MAGIC 8 PRO.webp';", `defaultImg = '${honorPhoneImgUrl}';`);
mainJs = mainJs.replace("defaultFallbackPhone = resolveAssetPath('assets/img/brands/Honor/HONOR MAGIC 8 PRO.webp');", `defaultFallbackPhone = '${honorPhoneImgUrl}';`);
fs.writeFileSync('js/main.js', mainJs, 'utf8');
console.log('Updated js/main.js');

let prodRenderJs = fs.readFileSync('js/products-render.js', 'utf8');
prodRenderJs = prodRenderJs.replace("defaultFallback = resolveAssetPath('assets/img/brands/Honor/HONOR MAGIC 8 PRO.webp');", `defaultFallback = '${honorPhoneImgUrl}';`);
fs.writeFileSync('js/products-render.js', prodRenderJs, 'utf8');
console.log('Updated js/products-render.js');

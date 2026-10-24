const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

function trimUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/') && !url.includes('/image/upload/e_trim/')) {
    return url.replace('/image/upload/', '/image/upload/e_trim/');
  }
  return url;
}

function trimGallery(gallery) {
  if (!Array.isArray(gallery)) return gallery;
  return gallery.map(u => trimUrl(u));
}

const samsungMap = {
  // Z Fold 8 Ultra
  'samsung-zfold-8-ultra-256gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721306/SAMSUNG_ZFOLD_8_ULTRA_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721306/SAMSUNG_ZFOLD_8_ULTRA_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721307/SAMSUNG_ZFOLD_8_ULTRA_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721308/SAMSUNG_ZFOLD_8_ULTRA_3.jpg'
    ])
  },
  // S26 Ultra
  'galaxy-s26-ultra-256gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721300/GALAXY_S26_ULTRA_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721300/GALAXY_S26_ULTRA_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721301/GALAXY_S26_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721303/GALAXY_S26_ULTRA_3.jpg'
    ])
  },
  'galaxy-s26-ultra-512gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721300/GALAXY_S26_ULTRA_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721300/GALAXY_S26_ULTRA_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721301/GALAXY_S26_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721303/GALAXY_S26_ULTRA_3.jpg'
    ])
  },
  'galaxy-s26-ultra-512gb-12ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721300/GALAXY_S26_ULTRA_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721300/GALAXY_S26_ULTRA_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721301/GALAXY_S26_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721303/GALAXY_S26_ULTRA_3.jpg'
    ])
  },
  // S26 Plus
  'galaxy-s26-plus-256gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721296/GALAXY_S26_PLUS_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721296/GALAXY_S26_PLUS_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721297/GALAXY_S26_PLUS_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721298/GALAXY_S26_PLUS_3.webp'
    ])
  },
  // S26 Base
  'galaxy-s26-256gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721291/GALAXY_S26_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721291/GALAXY_S26_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721293/GALAXY_S26_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721294/GALAXY_S26_3.jpg'
    ])
  },
  // S25 Ultra
  'galaxy-s25-ultra-256gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721289/GALAXY_S25_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721290/GALAXY_S25_ULTRA_3.jpg'
    ])
  },
  'galaxy-s25-ultra-256gb-12ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721289/GALAXY_S25_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721290/GALAXY_S25_ULTRA_3.jpg'
    ])
  },
  'galaxy-s25-ultra-512gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721289/GALAXY_S25_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721290/GALAXY_S25_ULTRA_3.jpg'
    ])
  },
  'galaxy-s25-ultra-512gb-12ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721289/GALAXY_S25_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721290/GALAXY_S25_ULTRA_3.jpg'
    ])
  },
  'galaxy-s25-ultra-1tb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721289/GALAXY_S25_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721290/GALAXY_S25_ULTRA_3.jpg'
    ])
  },
  'galaxy-s25-ultra-1tb-12ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721287/GALAXY_S25_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721289/GALAXY_S25_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721290/GALAXY_S25_ULTRA_3.jpg'
    ])
  },
  // S25 FE
  'galaxy-s25-fe-256gb-8ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721283/GALAXY_S25_FE_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721283/GALAXY_S25_FE_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721284/GALAXY_S25_FE_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721286/GALAXY_S25_FE_3.jpg'
    ])
  },
  'galaxy-s25-fe-256gb-8ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721283/GALAXY_S25_FE_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721283/GALAXY_S25_FE_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721284/GALAXY_S25_FE_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721286/GALAXY_S25_FE_3.jpg'
    ])
  },
  'galaxy-s25-fe-512gb-8ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721283/GALAXY_S25_FE_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721283/GALAXY_S25_FE_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721284/GALAXY_S25_FE_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721286/GALAXY_S25_FE_3.jpg'
    ])
  },
  // S24 FE
  'galaxy-s24-fe-256gb-8ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721279/GALAXY_S24_FE_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721279/GALAXY_S24_FE_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721280/GALAXY_S24_FE_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721281/GALAXY_S24_FE_3.jpg'
    ])
  },
  // A57 5G
  'galaxy-a57-5g-256gb-8ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721277/GALAXY_A57_5G_3.jpg'
    ])
  },
  'galaxy-a57-5g-256gb-8ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721277/GALAXY_A57_5G_3.jpg'
    ])
  },
  'galaxy-a57-5g-512gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721275/GALAXY_A57_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721277/GALAXY_A57_5G_3.jpg'
    ])
  },
  // A56 5G
  'galaxy-a56-5g-256gb-8ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721271/GALAXY_A56_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721273/GALAXY_A56_5G_3.jpg'
    ])
  },
  'galaxy-a56-5g-256gb-8ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721271/GALAXY_A56_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721273/GALAXY_A56_5G_3.jpg'
    ])
  },
  'galaxy-a56-5g-256gb-12ram-libre': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721271/GALAXY_A56_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721273/GALAXY_A56_5G_3.jpg'
    ])
  },
  'galaxy-a56-5g-256gb-12ram-reg': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721270/GALAXY_A56_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721271/GALAXY_A56_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721273/GALAXY_A56_5G_3.jpg'
    ])
  },
  // A37 5G
  'galaxy-a37-5g-256gb-8ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721266/GALAXY_A37_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721266/GALAXY_A37_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721267/GALAXY_A37_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721269/GALAXY_A37_5G_3.jpg'
    ])
  },
  // A36 5G
  'galaxy-a36-5g-256gb-8ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721262/GALAXY_A36_5G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721262/GALAXY_A36_5G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721263/GALAXY_A36_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721265/GALAXY_A36_5G_3.jpg'
    ])
  },
  // A27 5G
  'galaxy-a27-5g-128gb-6ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721257/GALAXY_A27_5G_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721257/GALAXY_A27_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721258/GALAXY_A27_5G_2.avif',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721260/GALAXY_A27_5G_3.jpg'
    ])
  },
  'galaxy-a27-5g-256gb-8ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721257/GALAXY_A27_5G_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721257/GALAXY_A27_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721258/GALAXY_A27_5G_2.avif',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721260/GALAXY_A27_5G_3.jpg'
    ])
  },
  // A17 5G
  'galaxy-a17-5g-128gb-4ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721253/GALAXY_A17_5G_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721253/GALAXY_A17_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721254/GALAXY_A17_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721255/GALAXY_A17_5G_3.jpg'
    ])
  },
  'galaxy-a17-5g-128gb-6ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721253/GALAXY_A17_5G_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721253/GALAXY_A17_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721254/GALAXY_A17_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721255/GALAXY_A17_5G_3.jpg'
    ])
  },
  'galaxy-a17-5g-256gb-8ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721253/GALAXY_A17_5G_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721253/GALAXY_A17_5G_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721254/GALAXY_A17_5G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721255/GALAXY_A17_5G_3.jpg'
    ])
  },
  // A17 4G
  'galaxy-a17-4g-128gb-4ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721145/GALAXY_A17_4G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721145/GALAXY_A17_4G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721179/GALAXY_A17_4G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721180/GALAXY_A17_4G_3.jpg'
    ])
  },
  'galaxy-a17-4g-256gb-8ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721145/GALAXY_A17_4G_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721145/GALAXY_A17_4G_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721179/GALAXY_A17_4G_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721180/GALAXY_A17_4G_3.jpg'
    ])
  },
  // A16
  'galaxy-a16-128gb-4ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721081/GALAXY_A16_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721081/GALAXY_A16_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721142/GALAXY_A16_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721143/GALAXY_A16_3.jpg'
    ])
  },
  'galaxy-a16-5g-128gb-4ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721081/GALAXY_A16_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721081/GALAXY_A16_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721142/GALAXY_A16_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721143/GALAXY_A16_3.jpg'
    ])
  },
  // A07
  'galaxy-a07-64gb-4ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721017/GALAXY_A07_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721017/GALAXY_A07_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721024/GALAXY_A07_2.avif',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721028/GALAXY_A07_3.jpg'
    ])
  },
  'galaxy-a07-128gb-4ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721017/GALAXY_A07_1.jpg'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721017/GALAXY_A07_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721024/GALAXY_A07_2.avif',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721028/GALAXY_A07_3.jpg'
    ])
  },
  // A06
  'galaxy-a06-128gb-4ram': {
    image: trimUrl('https://res.cloudinary.com/qknps0t6/image/upload/v1792721014/GALAXY_A06_1.webp'),
    gallery: trimGallery([
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721014/GALAXY_A06_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721014/GALAXY_A06_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792721016/GALAXY_A06_3.jpg'
    ])
  }
};

// Load productos via VM
const vm = require('vm');
const sandbox = {};
vm.runInNewContext(content + '; sandbox.productos = productos;', { sandbox });
const prods = sandbox.productos;

let updateCount = 0;
prods.forEach(p => {
  if (samsungMap[p.id]) {
    p.image = samsungMap[p.id].image;
    p.imagen = samsungMap[p.id].image;
    p.gallery = samsungMap[p.id].gallery;
    updateCount++;
  }
  // Trim ALL Cloudinary images in the catalog so ALL phones have uniform sizing without padding differences!
  p.image = trimUrl(p.image);
  p.imagen = trimUrl(p.imagen);
  p.gallery = trimGallery(p.gallery);
});

console.log(`Updated ${updateCount} Samsung products.`);
console.log(`Trimmed whitespace for all Cloudinary images in ${prods.length} products.`);

const output = `/* ===================================================
   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS
   Base de datos modular con rutas actualizadas
   =================================================== */

const productos = ${JSON.stringify(prods, null, 2)};

// Exponer en window y exportar si es entorno Node/CommonJS
if (typeof window !== 'undefined') {
  window.productos = productos;
  window.PRODUCTS_DATA = productos;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productos };
}
`;

fs.writeFileSync(productsFilePath, output, 'utf8');
console.log('Successfully wrote updated data/products.js');

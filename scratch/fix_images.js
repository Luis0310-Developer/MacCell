const fs = require('fs');

const path = require('path');
const targetFile = path.resolve(__dirname, '../data/products.js');
let content = fs.readFileSync(targetFile, 'utf8');
const { productos } = require(targetFile);

let fixedCount = 0;
productos.forEach(p => {
  if (!fs.existsSync(p.image)) {
    const b = (p.brand || '').toUpperCase();
    let replacement = 'assets/img/brands/Samsung/samsung-hero.webp';
    if (b.includes('APPLE')) {
      replacement = 'assets/img/brands/Iphone/Iphone 18 pro max.jpeg';
    } else if (b.includes('MOTO')) {
      replacement = 'assets/img/brands/Motorola/MOTO EDGE 50 ULTRA 5G.webp';
    } else if (b.includes('HONOR')) {
      replacement = 'assets/img/brands/Honor/HONOR MAGIC 8 PRO.webp';
    } else if (b.includes('POCO')) {
      replacement = 'assets/img/brands/Poco/Poco f9 ultra.webp';
    } else if (b.includes('ZTE') || b.includes('NUBIA')) {
      replacement = 'assets/img/brands/ZTEnubia/Redmagic 11s.webp';
    } else if (b.includes('XIAOMI') || b.includes('REDMI')) {
      replacement = 'assets/img/brands/Xiaomi/xiaomi-hero.webp';
    }

    content = content.split('"' + p.image + '"').join('"' + replacement + '"');
    fixedCount++;
  }
});

// Also fix any broken gallery paths
const brokenImages = [
  'assets/img/brands/Iphone/iphone-15.webp',
  'assets/img/brands/Iphone/iphone-16.webp'
];
brokenImages.forEach(broken => {
  content = content.split('"' + broken + '"').join('"assets/img/brands/Iphone/Iphone 18 pro max.jpeg"');
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Fixed', fixedCount, 'broken product image paths in data/products.js');

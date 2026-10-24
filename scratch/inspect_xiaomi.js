const fs = require('fs');

// We can eval or parse products.js
let code = fs.readFileSync('data/products.js', 'utf8');
// remove "const productos =" and export or eval
const fn = new Function(code + '; return productos;');
const productos = fn();

const xiaomi = productos.filter(p => p.marca?.toLowerCase() === 'xiaomi' || p.brand?.toLowerCase() === 'xiaomi' || p.category === 'xiaomi');
console.log('Total Xiaomi products:', xiaomi.length);
xiaomi.forEach((p, i) => {
  console.log(`${i + 1}. [${p.id}] ${p.nombre} (marca: ${p.marca}, category: ${p.category})`);
  console.log(`   Img: ${p.imagen}`);
  console.log(`   Gallery: ${p.gallery ? p.gallery.length : 0} items`);
});

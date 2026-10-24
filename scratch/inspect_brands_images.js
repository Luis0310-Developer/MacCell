const fs = require('fs');

let code = fs.readFileSync('data/products.js', 'utf8');
const fn = new Function(code + '; return productos;');
const productos = fn();

const brands = [...new Set(productos.map(p => p.marca))];
for (const b of brands) {
  const prods = productos.filter(p => p.marca === b);
  console.log(`Brand: ${b} (${prods.length} products)`);
  console.log('Sample image:', prods[0]?.imagen);
  console.log('Sample gallery:', prods[0]?.gallery);
}

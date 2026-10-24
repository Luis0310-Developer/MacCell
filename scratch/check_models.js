const fs = require('fs');

const localFiles = fs.readdirSync('assets/img/brands/Xiaomi');

const prods = new Function(fs.readFileSync('data/products.js', 'utf8') + '; return productos;')();
const xiaomiProds = prods.filter(p => p.marca === 'Xiaomi' || p.category === 'xiaomi');

console.log('--- Checking model associations ---');
xiaomiProds.forEach(p => {
  console.log(`Product: [${p.id}] ${p.nombre}`);
});

const fs = require('fs');

const code = fs.readFileSync('data/products.js', 'utf8');
const prods = new Function(code + '; return productos;')();
const xiaomi = prods.filter(p => p.marca === 'Xiaomi' || p.category === 'xiaomi');

console.log(`Found ${xiaomi.length} Xiaomi products:`);
xiaomi.forEach((p, idx) => {
  console.log(`${idx + 1}. ID: "${p.id}" | Nombre: "${p.nombre}"`);
});

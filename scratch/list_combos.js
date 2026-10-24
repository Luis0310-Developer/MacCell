const productos = require('../data/products.js');

const uniqueModels = new Map();
productos.forEach(p => {
  const brand = p.brand || p.marca;
  const name = p.name;
  const proc = p.specsObj.processor;
  
  // let's create a key representing model family
  const key = `${brand} || ${proc}`;
  if (!uniqueModels.has(key)) {
    uniqueModels.set(key, []);
  }
  uniqueModels.get(key).push(name);
});

console.log('Unique brand + processor combos:', uniqueModels.size);
for (const [key, names] of uniqueModels.entries()) {
  console.log(`[${key}] -> ${names.length} models: ${names.slice(0, 2).join(' / ')}`);
}

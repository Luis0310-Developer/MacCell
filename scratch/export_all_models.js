const productos = require('../data/products.js');
const fs = require('fs');

const list = productos.map((p, idx) => ({
  idx,
  id: p.id,
  name: p.name,
  brand: p.brand,
  processor: p.specsObj?.processor || '',
  antutu: p.specsObj?.antutu || null
}));

fs.writeFileSync('scratch/all_models.json', JSON.stringify(list, null, 2));
console.log('Saved all_models.json. Count:', list.length);

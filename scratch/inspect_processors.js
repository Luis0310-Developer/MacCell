const productos = require('../data/products.js');
console.log('Total productos:', productos.length);

const brands = {};
productos.forEach(p => {
  const b = p.brand || p.marca || 'Otro';
  brands[b] = (brands[b] || 0) + 1;
});
console.log('Brands:', brands);

// Check unique processors
const processors = {};
productos.forEach(p => {
  const proc = p.specsObj?.processor || 'Sin procesador';
  processors[proc] = (processors[proc] || 0) + 1;
});
console.log('Total unique processors:', Object.keys(processors).length);

// Sample 10 unique models with their processor
const samples = productos.slice(0, 15).map(p => ({
  name: p.name,
  processor: p.specsObj?.processor,
  antutu: p.specsObj?.antutu
}));
console.log('Sample products:', JSON.stringify(samples, null, 2));

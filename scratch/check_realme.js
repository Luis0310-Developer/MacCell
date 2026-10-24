const fs = require('fs');
const content = fs.readFileSync('data/products.js', 'utf8');

const vm = require('vm');
const sandbox = {
  window: {},
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} }
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(content, sandbox);

const prods = sandbox.productos || (sandbox.window && sandbox.window.productos) || [];
console.log('Total productos in data/products.js:', prods.length);
const brands = [...new Set(prods.map(p => p.marca || p.brand))];
console.log('All brands:', brands);

const realmeProds = prods.filter(p => ((p.marca || p.brand || '').toLowerCase().includes('realme')));
console.log('Realme productos count:', realmeProds.length);
realmeProds.forEach(p => {
  console.log({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    imagen: p.imagen,
    gallery: p.gallery
  });
});

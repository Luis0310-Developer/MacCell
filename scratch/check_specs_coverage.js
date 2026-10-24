const productos = require('../data/products.js');

let missingSpecsObj = 0;
let missingProcessor = 0;
productos.forEach(p => {
  if (!p.specsObj) missingSpecsObj++;
  else if (!p.specsObj.processor) missingProcessor++;
});

console.log('Total:', productos.length);
console.log('Missing specsObj:', missingSpecsObj);
console.log('Missing processor:', missingProcessor);

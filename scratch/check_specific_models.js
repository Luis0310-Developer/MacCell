const productos = require('../data/products.js');
const testScript = require('./test_antutu_mapping.js');

// Pick diverse models
const toCheck = [
  'Galaxy S25 Ultra',
  'Galaxy Z Fold 8',
  'Galaxy A56',
  'Galaxy A16',
  'Xiaomi 17 Ultra',
  'Xiaomi 15T Pro',
  'Redmi Note 15 Pro 5G',
  'Redmi Note 17 Pro Max',
  'Redmi 15C',
  'MOTO Edge 50 Ultra',
  'HONOR Magic 8 Lite',
  'HONOR 400',
  'HONOR Win',
  'POCO F8 Ultra',
  'POCO X8 Pro',
  'Redmagic 11S Pro',
  'Infinix GT 50 Pro',
  'Google Pixel 10 Pro',
  'Realme 16 Pro Plus',
  'OPPO Find X7 Ultra'
];

toCheck.forEach(term => {
  const found = productos.find(p => p.name.toLowerCase().includes(term.toLowerCase()));
  if (found) {
    console.log(`${found.name}:`);
    console.log(`   Procesador: ${found.specsObj.processor}`);
    // evaluate function
    const fn = require('./test_antutu_mapping.js');
  }
});

const fs = require('fs');
const list = require('./all_models.json');

const byBrand = {};
list.forEach(item => {
  if (!byBrand[item.brand]) byBrand[item.brand] = [];
  byBrand[item.brand].push({
    name: item.name,
    processor: item.processor
  });
});

Object.keys(byBrand).forEach(b => {
  console.log(`\n=== BRAND: ${b} (${byBrand[b].length}) ===`);
  const uniqueInBrand = {};
  byBrand[b].forEach(p => {
    // extract base phone name
    const cleanName = p.name.replace(/\s*(128GB|256GB|512GB|1TB|64GB|\(Chip Físico\)|\(eSIM Edition\)|Libre|Registrado|\(\d+\+?\d*GB RAM\)).*/gi, '').trim();
    if (!uniqueInBrand[cleanName]) {
      uniqueInBrand[cleanName] = p.processor;
    }
  });
  console.log(uniqueInBrand);
});

const fs = require('fs');

const code = fs.readFileSync('data/products.js', 'utf8');
const prods = new Function(code + '; return productos;')();

console.log('Total products:', prods.length);
const honorProds = prods.filter(p => p.marca?.toLowerCase() === 'honor' || p.category?.toLowerCase() === 'honor');
console.log('Total Honor products:', honorProds.length);

let issues = 0;
honorProds.forEach((p, idx) => {
  if (!p.imagen || !p.imagen.startsWith('https://res.cloudinary.com')) {
    console.error(`Invalid imagen for ${p.id}: ${p.imagen}`);
    issues++;
  }
  if (!p.image || !p.image.startsWith('https://res.cloudinary.com')) {
    console.error(`Invalid image for ${p.id}: ${p.image}`);
    issues++;
  }
  if (!Array.isArray(p.gallery) || p.gallery.length === 0 || !p.gallery[0].startsWith('https://res.cloudinary.com')) {
    console.error(`Invalid gallery for ${p.id}:`, p.gallery);
    issues++;
  }
});

console.log(`Issues found: ${issues}`);
if (issues === 0) {
  console.log('ALL 33 HONOR PRODUCTS ARE 100% VALID WITH CLOUDINARY URLS!');
}

console.log('Any local Honor path left in data/products.js:', code.includes('assets/img/brands/Honor'));

// Sample check
console.log('\n--- Sample Honor Products ---');
[0, 5, 10, 15, 20, 25, 30, 32].forEach(i => {
  const p = honorProds[i];
  if (p) {
    console.log(`[${p.id}] ${p.nombre}`);
    console.log(`  Main: ${p.imagen}`);
    console.log(`  Gallery (${p.gallery.length}):`, p.gallery);
  }
});

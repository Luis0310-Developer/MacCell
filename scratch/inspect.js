const fs = require('fs');

const content = fs.readFileSync('data/products.js', 'utf8');
console.log('Length:', content.length);

const brands = new Set();
const categories = new Set();
const regex = /"marca":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  brands.add(match[1]);
}
const catRegex = /"category":\s*"([^"]+)"/g;
while ((match = catRegex.exec(content)) !== null) {
  categories.add(match[1]);
}

console.log('Brands:', Array.from(brands));
console.log('Categories:', Array.from(categories));

// Count total products
const idMatches = content.match(/"id":\s*"([^"]+)"/g);
console.log('Total products count:', idMatches ? idMatches.length : 0);

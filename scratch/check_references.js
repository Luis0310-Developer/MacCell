const fs = require('fs');

const files = ['index.html', 'Inicio.html', 'pages/catalogo.html', 'pages/marcas.html', 'js/main.js', 'js/products-render.js'];

for (const file of files) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/xiaomi[^\s"'>]*/gi);
    if (matches) {
      console.log(`=== ${file} ===`);
      console.log(Array.from(new Set(matches)).slice(0, 10));
    }
  }
}

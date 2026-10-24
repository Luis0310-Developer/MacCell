const fs = require('fs');

const files = ['index.html', 'Inicio.html', 'pages/catalogo.html', 'pages/contacto.html', 'pages/marcas.html', 'pages/nosotros.html', 'pages/ubicacion.html'];
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/products\.js\?v=[^\"]+/g);
  if (matches) {
    console.log(f, matches);
  }
});

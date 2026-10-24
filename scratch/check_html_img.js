const fs = require('fs');
const files = ['index.html', 'Inicio.html', 'pages/catalogo.html', 'pages/contacto.html', 'pages/marcas.html', 'pages/nosotros.html', 'pages/ubicacion.html'];
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((line, idx) => {
    if (/xiaomi/i.test(line) && /img|src|url/i.test(line)) {
      console.log(`${f}:${idx+1} -> ${line.trim()}`);
    }
  });
});

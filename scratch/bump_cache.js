const fs = require('fs');

const files = [
  'pages/catalogo.html',
  'Inicio.html',
  'index.html'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/20261023-v35/g, '20261023-v36');
  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated cache version in ${f}`);
});

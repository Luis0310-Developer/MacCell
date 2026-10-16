const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-icon') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const data = JSON.parse(body);
      const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
      const filePath = path.join(__dirname, '..', data.path);
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
      console.log('Saved icon:', data.path);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ success: true }));
    });
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(5503, () => {
  console.log('PWA icon server on http://localhost:5503');
});

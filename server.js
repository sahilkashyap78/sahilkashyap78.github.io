const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.mp4':  'video/mp4',
  '.mind': 'application/octet-stream',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? '/index.html' : req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`\n  MarkerVideo AR running at:\n`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  Open the link above in your browser.`);
  console.log(`  For mobile: connect to the same Wi-Fi, then use your local IP.\n`);

  // Try to print local network IP
  try {
    const os = require('os');
    const nets = os.networkInterfaces();
    for (const iface of Object.values(nets).flat()) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`  Mobile URL: http://${iface.address}:${PORT}`);
      }
    }
  } catch (_) {}

  console.log('\n  Press Ctrl+C to stop.\n');
});

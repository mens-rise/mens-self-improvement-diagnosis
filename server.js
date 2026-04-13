const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const mimes = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer((req, res) => {
  let p = path.join(dir, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': mimes[path.extname(p)] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(3456, () => console.log('Running on http://localhost:3456'));

// utils/static.js
const fs = require('fs');

function serveStaticFile(res, filepath, contentType) {
  fs.readFile(filepath, (err, content) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Server Error');
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    }
  });
}

module.exports = { serveStaticFile };

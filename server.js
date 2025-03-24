// server.js
const http = require('http');
const path = require('path');
const { withDb } = require('./db');
const { serveStaticFile } = require('./utils/static');
const { createUser, readUsers, updateUser, deleteUser } = require('./routes/crud');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  // Serve static files from the public folder
  if (method === 'GET' && url === '/') {
    const filepath = path.join(__dirname, 'public', 'index.html');
    serveStaticFile(res, filepath, 'text/html');
  } else if (method === 'GET' && url === '/index.js') {
    const filepath = path.join(__dirname, 'public', 'index.js');
    serveStaticFile(res, filepath, 'application/javascript');
  }
  // Create user
  else if (method === 'POST' && url === '/create') {
    withDb(db => createUser(req, res, db)).catch(err => {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  }
  // Read users
  else if (method === 'GET' && url === '/read') {
    withDb(db => readUsers(req, res, db)).catch(err => {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  }
  // Update user
  else if (method === 'PUT' && url === '/update') {
    withDb(db => updateUser(req, res, db)).catch(err => {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  }
  // Delete user
  else if (method === 'DELETE' && url === '/delete') {
    withDb(db => deleteUser(req, res, db)).catch(err => {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  }
  // Unknown route
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // we will put sm else here
});

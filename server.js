// server.js
const path = require('path');
const { withDb } = require('./db');
const { serveStaticFile } = require('./utils/static');
const { createUser, readUsers, updateUser, deleteUser } = require('./routes/crud');

// Export a function (req, res) that Vercel will use as a serverless function.
module.exports = async (req, res) => {
  const { method, url } = req;
  
  // Serve static files for the home page and index.js
  if (method === 'GET' && url === '/') {
    const filepath = path.join(__dirname, 'public', 'index.html');
    return serveStaticFile(res, filepath, 'text/html');
  } else if (method === 'GET' && url === '/index.js') {
    const filepath = path.join(__dirname, 'public', 'index.js');
    return serveStaticFile(res, filepath, 'application/javascript');
  }
  // Create user endpoint
  else if (method === 'POST' && url === '/create') {
    return withDb(db => createUser(req, res, db)).catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  }
  // Read users endpoint
  else if (method === 'GET' && url === '/read') {
    return withDb(db => readUsers(req, res, db)).catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  }
  // Update user endpoint
  else if (method === 'PUT' && url === '/update') {
    return withDb(db => updateUser(req, res, db)).catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  }
  // Delete user endpoint
  else if (method === 'DELETE' && url === '/delete') {
    return withDb(db => deleteUser(req, res, db)).catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Database error', error: err.toString() }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not Found');
  }
};

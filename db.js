// db.js
const { MongoClient } = require('mongodb');

// Replace with your actual MongoDB connection string
const uri = process.env.MONGODB_URI;

async function withDb(operation) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("testDB");
    await operation(db);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

module.exports = { withDb };

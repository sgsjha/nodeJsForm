// db.js
const { MongoClient } = require('mongodb');

// Replace with your actual MongoDB connection string
const uri = "mongodb+srv://sarthakjhaa11:57I7mh0WmPLa1D0J@cluster0.ql78g.mongodb.net/testDB?retryWrites=true&w=majority";

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

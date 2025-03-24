// This file operates the CRUD operations for the app

// routes/crud.js
const { ObjectId } = require("mongodb");
const { parseRequestBody } = require("../utils/parseBody");

async function createUser(req, res, db) {
  try {
    const data = await parseRequestBody(req);
    const users = db.collection("users");
    const result = await users.insertOne({ name: data.name, age: data.age });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: 'User created successfully', id: result.insertedId }));

    console.log('User created successfully');

  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: 'Error creating user', error: err.toString() }));
  }
}

async function readUsers(req, res, db) {
  try {
    const users = db.collection("users");
    const userArray = await users.find({}).toArray();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ users: userArray }));
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: 'Error fetching users', error: err.toString() }));
  }
}

async function updateUser(req, res, db) {
  try {
    const data = await parseRequestBody(req);
    const { id, update } = data;
    const users = db.collection("users");
    const filter = { _id: ObjectId(id) };
    const result = await users.updateOne(filter, { $set: update });
    if (result.matchedCount > 0) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'User updated successfully' }));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: 'Error updating user', error: err.toString() }));
  }
}

async function deleteUser(req, res, db) {
  try {
    const data = await parseRequestBody(req);
    const { id } = data;
    const users = db.collection("users");
    const result = await users.deleteOne({ _id: ObjectId(id) });// always delete by id, because id is unique
    if (result.deletedCount > 0) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'User deleted successfully' }));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: 'Error deleting user', error: err.toString() }));
  }
}

module.exports = { createUser, readUsers, updateUser, deleteUser };

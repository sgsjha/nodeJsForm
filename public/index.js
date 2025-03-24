// public/index.js

// Create a new user
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('createName').value;
    const age = document.getElementById('createAge').value;
  
    const res = await fetch('/create', { // we will wait till the time the fetch request is completed
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: parseInt(age) })
    });
    const data = await res.json();
    document.getElementById('message').innerText = data.message;
  });
  
  // Update an existing user
  document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const age = document.getElementById('updateAge').value;
    const updateData = {};
    if (name) updateData.name = name;
    if (age) updateData.age = parseInt(age);
    if (Object.keys(updateData).length === 0) {
      document.getElementById('message').innerText = "Please provide at least one field to update.";
      return;
    }
    const res = await fetch('/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, update: updateData })
    });
    const data = await res.json();
    document.getElementById('message').innerText = data.message;
  });
  
  // Delete a user by ID
  document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;
    const res = await fetch('/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    document.getElementById('message').innerText = data.message;
  });
  
  // Read (list) all users
  document.getElementById('readBtn').addEventListener('click', async () => {
    const res = await fetch('/read'); // these are api end points
    const data = await res.json();
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear current list
    data.users.forEach(user => {
      const li = document.createElement('li');
      li.innerText = `ID: ${user._id}, Name: ${user.name}, Age: ${user.age}`;
      userList.appendChild(li);
    });
  });
  
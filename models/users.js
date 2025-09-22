// models/users.js
const bcrypt = require('bcrypt');

// For demo: create an admin user in memory.
// Password is 'password123' (hashed at runtime).
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Site Admin',
    role: 'admin'
  }
];

// find by email (simulate async DB)
function findByEmail(email) {
  return new Promise((resolve) => {
    const u = users.find(x => x.email.toLowerCase() === String(email).toLowerCase());
    resolve(u || null);
  });
}

// find by id
function findById(id) {
  return new Promise((resolve) => {
    const u = users.find(x => x.id === String(id));
    resolve(u || null);
  });
}

module.exports = { findByEmail, findById, users };

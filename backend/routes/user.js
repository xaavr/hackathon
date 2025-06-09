const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '../data/users.json');

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]', 'utf8');
}

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, stocks: [] });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'User registered' });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user });
});

module.exports = router;

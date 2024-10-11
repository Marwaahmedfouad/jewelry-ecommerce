const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

let users = [];

// Register route
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, email, password: hashedPassword };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'secretKey');
  res.json({ token });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey');
  res.json({ token });
});

module.exports = router;

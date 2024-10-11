// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
const User = require('../models/User'); // Your User model

const router = express.Router();

// POST login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the user exists by email (or username)
    const user = await User.findOne({ email }); // or { username: req.body.username }

    if (!user) {
      return res.status(400).json({ message: 'User not found. Please register first.' });
    }

    // 2. Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Generate a token if the password matches
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
      expiresIn: '1h', // Token expiration time
    });

    // 4. Send the token to the client
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
const express = require('express');
const authRoutes = require('./auth');
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

module.exports = router;

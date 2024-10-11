// server.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend origin
  methods: ['GET', 'POST'], // Allowed HTTP methods
  credentials: true, // If you're sending cookies or authentication headers
}));

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


app.use(cors({
  origin: 'http://localhost:3000', // Your frontend origin
  methods: ['GET', 'POST'], // Allowed HTTP methods
  credentials: true, // If you're sending cookies or authentication headers
}));

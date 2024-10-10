const express = require('express');
const fs = require('fs');  // File system to read JSON data
const app = express();
const PORT = 5000;

// Middleware to parse JSON requests (if you want to accept POST requests later)
app.use(express.json());

// Read mock data from products.json (we'll create this file next)
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint to get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

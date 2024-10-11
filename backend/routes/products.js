const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Load products from JSON file
let products = [];

// Load initial product data from products.json
fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading products.json:', err);
    return;
  }
  products = JSON.parse(data);
});

// Token authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Admin authorization middleware
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
}

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Add a new product
router.post('/', authenticateToken, isAdmin, (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

let products = [];

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
}

router.get('/', (req, res) => {
  res.json(products);
});

router.post('/', authenticateToken, isAdmin, (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});

module.exports = router;
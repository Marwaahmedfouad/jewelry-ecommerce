const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Temporary in-memory cart data (replace this with a database in a real app)
let carts = {};

// Temporary in-memory products data (replace with a database in a real app)
const products = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 100 },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 150 },
  // Add more products as needed
];

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from 'Bearer <token>'
  
  if (!token) return res.sendStatus(401); // If there's no token

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid or expired
    req.user = user; // Set user object in request for further usage
    next();
  });
}

// Add item to cart
router.post('/add', authenticateToken, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!carts[userId]) {
    carts[userId] = [];
  }

  // Fetch product details from the products array
  const product = products.find(item => item.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingProduct = carts[userId].find(item => item.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity; // Update quantity if already exists
  } else {
    // Add product details to the cart item
    carts[userId].push({ 
      productId: product.id, 
      quantity, 
      name: product.name, 
      description: product.description, 
      price: product.price 
    });
  }

  res.json(carts[userId]); // Respond with the updated cart for the user
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  if (!carts[userId]) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  carts[userId] = carts[userId].filter(item => item.productId !== parseInt(productId));
  res.json(carts[userId]);
});

// Update cart item quantity
router.put('/update/:productId', authenticateToken, (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  if (!carts[userId]) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const existingProduct = carts[userId].find(item => item.productId === parseInt(productId));

  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  existingProduct.quantity = quantity;
  res.json(carts[userId]);
});

// Get cart for a user
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  res.json(carts[userId] || []);
});

module.exports = router;

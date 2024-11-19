const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Temporary in-memory cart data (replace this with a database in a real app)
let carts = {};

// Temporary in-memory products data (replace with a database in a real app)
const products = [
  {
    "id": 1,
    "name": "Gold Necklace",
    "price": 299.99,
    "description": "A beautiful 24k gold necklace with intricate detailing.",
    "imageUrl": "https://example.com/images/gold-necklace.jpg",
    "category": "Necklaces"
  },
  {
    "id": 2,
    "name": "Silver Bracelet",
    "price": 199.99,
    "description": "A stylish silver bracelet with a modern design.",
    "imageUrl": "https://example.com/images/silver-bracelet.jpg",
    "category": "Bracelets"
  },
  {
    "id": 3,
    "name": "Diamond Ring",
    "price": 999.99,
    "description": "An elegant diamond ring that sparkles with every movement.",
    "imageUrl": "https://example.com/images/diamond-ring.jpg",
    "category": "Rings"
  },
  {
    "id": 4,
    "name": "Pearl Earrings",
    "price": 149.99,
    "description": "Classic pearl earrings that exude sophistication.",
    "imageUrl": "https://example.com/images/pearl-earrings.jpg",
    "category": "Earrings"
  },
  {
    "id": 5,
    "name": "Gold Bracelet",
    "price": 299.99,
    "description": "A solid gold bracelet with a timeless look.",
    "imageUrl": "https://example.com/images/gold-bracelet.jpg",
    "category": "Bracelets"
  },
  {
    "id": 6,
    "name": "Ruby Pendant",
    "price": 499.99,
    "description": "A stunning ruby pendant set in a gold chain.",
    "imageUrl": "https://example.com/images/ruby-pendant.jpg",
    "category": "Necklaces"
  },
  {
    "id": 7,
    "name": "Sapphire Necklace",
    "price": 599.99,
    "description": "A dazzling sapphire necklace that catches the light.",
    "imageUrl": "https://example.com/images/sapphire-necklace.jpg",
    "category": "Necklaces"
  },
  {
    "id": 8,
    "name": "Emerald Earrings",
    "price": 199.99,
    "description": "Emerald earrings that bring a pop of color to any outfit.",
    "imageUrl": "https://example.com/images/emerald-earrings.jpg",
    "category": "Earrings"
  },
  {
    "id": 9,
    "name": "Platinum Wedding Band",
    "price": 799.99,
    "description": "A sleek platinum wedding band for a modern look.",
    "imageUrl": "https://example.com/images/platinum-wedding-band.jpg",
    "category": "Rings"
  },
  {
    "id": 10,
    "name": "Diamond Stud Earrings",
    "price": 249.99,
    "description": "Beautiful diamond stud earrings that shine elegantly.",
    "imageUrl": "https://example.com/images/diamond-stud-earrings.jpg",
    "category": "Earrings"
  },
  {
    "id": 11,
    "name": "Gold Chain",
    "price": 149.99,
    "description": "A simple gold chain that pairs well with any pendant.",
    "imageUrl": "https://example.com/images/gold-chain.jpg",
    "category": "Necklaces"
  },
  {
    "id": 12,
    "name": "Rose Gold Ring",
    "price": 349.99,
    "description": "A delicate rose gold ring with a sparkling diamond.",
    "imageUrl": "https://example.com/images/rose-gold-ring.jpg",
    "category": "Rings"
  },
  {
    "id": 13,
    "name": "Charm Bracelet",
    "price": 129.99,
    "description": "A bracelet with beautiful charms for personalization.",
    "imageUrl": "https://example.com/images/charm-bracelet.jpg",
    "category": "Charms"
  },
  {
    "id": 14,
    "name": "Heart Locket Necklace",
    "price": 179.99,
    "description": "A locket necklace in the shape of a heart.",
    "imageUrl": "https://example.com/images/heart-locket.jpg",
    "category": "Necklaces"
  },
  {
    "id": 15,
    "name": "Star Earrings",
    "price": 99.99,
    "description": "Earrings with a celestial star design.",
    "imageUrl": "https://example.com/images/star-earrings.jpg",
    "category": "Earrings"
  },
  {
    "id": 16,
    "name": "Gold Charm",
    "price": 89.99,
    "description": "A gold charm for bracelets or necklaces.",
    "imageUrl": "https://example.com/images/gold-charm.jpg",
    "category": "Charms"
  },
  {
    "id": 17,
    "name": "Diamond Tennis Bracelet",
    "price": 499.99,
    "description": "A diamond-studded tennis bracelet.",
    "imageUrl": "https://example.com/images/diamond-tennis-bracelet.jpg",
    "category": "Bracelets"
  },
  {
    "id": 18,
    "name": "Charm Necklace",
    "price": 219.99,
    "description": "A necklace with multiple charms.",
    "imageUrl": "https://example.com/images/charm-necklace.jpg",
    "category": "Necklaces"
  },
  {
    "id": 19,
    "name": "Sapphire Engagement Ring",
    "price": 799.99,
    "description": "A beautiful sapphire ring for engagement.",
    "imageUrl": "https://example.com/images/sapphire-engagement-ring.jpg",
    "category": "Rings"
  },
  {
    "id": 20,
    "name": "Gold Hoop Earrings",
    "price": 129.99,
    "description": "Classic gold hoop earrings for daily wear.",
    "imageUrl": "https://example.com/images/gold-hoop-earrings.jpg",
    "category": "Earrings"
  },
  {
    "id": 21,
    "name": "Silver Charm",
    "price": 49.99,
    "description": "A simple silver charm for necklaces or bracelets.",
    "imageUrl": "https://example.com/images/silver-charm.jpg",
    "category": "Charms"
  },
  {
    "id": 22,
    "name": "Ruby Stud Earrings",
    "price": 149.99,
    "description": "Ruby stud earrings that add elegance to any outfit.",
    "imageUrl": "https://example.com/images/ruby-stud-earrings.jpg",
    "category": "Earrings"
  }
]


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

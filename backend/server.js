const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart'); // Import the cart routes

const app = express()

app.use(cors());
app.use(bodyParser.json());

// Use the defined routes
app.use('/api/auth', authRoutes);        // Authentication routes (register, login)
app.use('/api/products', productRoutes); // Product routes (CRUD operations)
app.use('/api/cart', cartRoutes);        // Cart routes

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
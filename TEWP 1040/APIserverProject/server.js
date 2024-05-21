// server.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Import route handlers
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');

// Define routes
app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

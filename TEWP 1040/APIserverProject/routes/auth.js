// routes/auth.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

router.post('/getToken', (req, res) => {
  const { username, password } = req.body;

  // Read user data from JSON file
  fs.readFile('./data/users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: 'Internal Server Error' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ errorMessage: 'Invalid credentials' });
    }

    // Validate password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Internal Server Error' });
      }

      if (!isMatch) {
        return res.status(401).json({ errorMessage: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

module.exports = router;

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ errorMessage: "No authorization header provided" });
  }

  // Check if the header starts with 'Bearer '
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errorMessage: "Invalid authorization format" });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ errorMessage: "Access denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded token to request object
    req.user = decoded;
    // Pass control to the next middleware/handler
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Invalid token" });
  }
};

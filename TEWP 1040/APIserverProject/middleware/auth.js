const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = (req, res, next) => {
    // Extract token from the Authorization header
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ errorMessage: "Access denied" });
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded token to request object
    req.user = decoded;
    //Pass control to the next middleware/handler
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Access denied" });
  }
};

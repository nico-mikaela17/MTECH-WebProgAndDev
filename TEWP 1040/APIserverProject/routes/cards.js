const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("/", (req, res) => res.send("Get all cards"));
router.post("/create", authMiddleware, (req, res) => res.send("Create a card"));
router.put("/:username", authMiddleware, (req, res) =>
  res.send("Update a card")
);
router.delete("/:username", authMiddleware, (req, res) =>
  res.send("Delete a card")
);

module.exports = router;

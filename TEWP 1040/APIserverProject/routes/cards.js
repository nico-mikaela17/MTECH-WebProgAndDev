const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const fs = require("fs");
const path = require('path');

router.get("/", (req, res) => {
  // Get query parameters for filtering
  const filters = req.query;
  fs.readFile("./data/cards.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
    let cards;
    try {
      cards = JSON.parse(data);
    } catch (parseErr) {
      return res
        .status(500)
        .json({ errorMessage: "Failed to parse card data" });
    }
    // Filter cards based on query parameters
    const filteredCards = cards.filter((card) => {
      return Object.keys(filters).every((key) => card[key] === filters[key]);
    });
    res.json(filteredCards);
    res.send(`Get all cards`);
  });
});

// Path to the cards JSON file
const cardsFilePath = path.join(__dirname, "../data/cards.json");

// Define the /cards/create endpoint
router.post("/create", (req, res) => {
  const newCard = req.body; // Get the new card data from the request body

  // Read card data from JSON file
  fs.readFile(cardsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: "Internal Server Error" });
    }

    let cards;
    try {
      cards = JSON.parse(data); // Parse the JSON data
    } catch (parseErr) {
      return res
        .status(500)
        .json({ errorMessage: "Failed to parse card data" });
    }

    // Ensure card ID is unique
    if (cards && cards.some((card) => card.id === newCard.id)) {
      return res.status(400).json({ errorMessage: "Card ID must be unique" });
    }

    // Validate the new card
    if (
      !newCard.id ||
      !newCard.name ||
      !newCard.type ||
      !newCard.power ||
      !newCard.toughness ||
      !newCard.set ||
      !newCard.rarity ||
      !newCard.cost
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Missing required card fields" });
    }

    // Add the new card to the list
    cards.push(newCard);

    // Write the updated card list back to the JSON file
    fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), (writeErr) => {
      if (writeErr) {
        return res
          .status(500)
          .json({ errorMessage: "Failed to save card data" });
      }

      res.json({ successMessage: "Card created successfully", card: newCard }); // Respond with the created card
    });
  });
});

router.put("/:username", authMiddleware, (req, res) =>
  res.send("Update a card")
);
router.delete("/:username", authMiddleware, (req, res) =>
  res.send("Delete a card")
);

module.exports = router;

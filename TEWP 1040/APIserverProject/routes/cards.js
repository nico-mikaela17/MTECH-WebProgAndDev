const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Path to the cards JSON file
const cardsFilePath = path.join(__dirname, "../data/cards.json");

// Load card data from JSON file
const loadCards = () => {
  const data = fs.readFileSync(cardsFilePath, "utf8");
  return JSON.parse(data);
};

// Save card data to JSON file
const saveCards = (cards, res) => {
  fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), (writeErr) => {
    if (writeErr) {
      return res.status(500).json({ errorMessage: "Failed to save card data" });
    }
  });
};

// Get all cards endpoint
router.get("/", (req, res) => {
  const filters = req.query;
  let cards;
  try {
    cards = loadCards();
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }

  // Filter cards based on query parameters
  const filteredCards = cards.filter((card) => {
    return Object.keys(filters).every((key) => card[key] === filters[key]);
  });

  res.json(filteredCards);
});

// Create card endpoint
router.post("/create", authMiddleware, (req, res) => {
  const newCard = req.body;
  let cards;
  try {
    cards = loadCards();
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }

  // Ensure card ID is unique
  if (cards.some((card) => card.id === newCard.id)) {
    return res.status(400).json({ errorMessage: "Card ID must be unique" });
  }
  // Generate a unique ID for the new card
  newCard.id = uuidv4();

  // Validate the new card
  if (
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

  // Save the updated card list back to the JSON file
  saveCards(cards, res);

  res.json({ successMessage: "Card created successfully", card: newCard });
});

// Update card endpoint
router.put("/:id", authMiddleware, (req, res) => {
  const cardId = parseInt(req.params.id);
  const updatedCardData = req.body;
  let cards;
  try {
    cards = loadCards();
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }

  // Find the card to update
  const cardIndex = cards.findIndex((card) => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: "Card not found" });
  }

  // Ensure updated card ID is unique
  if (
    updatedCardData.id &&
    cards.some((card) => card.id === updatedCardData.id && card.id !== cardId)
  ) {
    return res.status(400).json({ errorMessage: "Card ID must be unique" });
  }

  // Update the card data
  cards[cardIndex] = { ...cards[cardIndex], ...updatedCardData };

  // Save the updated card list back to the JSON file
  saveCards(cards, res);

  res.json({
    successMessage: "Card updated successfully",
    card: cards[cardIndex],
  });
});

// Delete card endpoint
router.delete("/:id", authMiddleware, (req, res) => {
  const cardId = parseInt(req.params.id);
  let cards;
  try {
    cards = loadCards();
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }

  // Find the card to delete
  const cardIndex = cards.findIndex((card) => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: "Card not found" });
  }

  // Remove the card from the list
  const deletedCard = cards.splice(cardIndex, 1);

  // Save the updated card list back to the JSON file
  saveCards(cards, res);

  res.json({
    successMessage: "Card deleted successfully",
    card: deletedCard[0],
  });
});

module.exports = router;

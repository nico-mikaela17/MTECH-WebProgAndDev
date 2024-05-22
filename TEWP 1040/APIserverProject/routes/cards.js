const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

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

router.put("/:username", authMiddleware, (req, res) => {
  const cardId = req.params.id;
  const updatedCardData = req.body;
  fs.readFile(cardsFilePath, "utf8", (err, data) => {
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
    // Find the card to update
    const cardIndex = cards.findIndex((card) => card.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ errorMessage: "Card not found" });
    }
    // Ensure updated card ID is unique
    if (
      updatedCardData.id &&
      cards.some(
        (card) => card.id === updatedCardData.id && card.id !== parseInt(cardId)
      )
    ) {
      return res.status(400).json({ errorMessage: "Card ID must be unique" });
    }
    // Update the card data
    cards[cardIndex] = { ...cards[cardIndex], ...updatedCardData };
  });
  // Write the updated card list back to the JSON file
  fs.appendFile(cardsFilePath, JSON.stringify(cards, null, 2), (writeErr) => {
    if (writeErr) {
      return res.status(500).json({ errorMessage: "Failed to save card data" });
    }
    res.json({
      successMessage: "Card updated successfully",
      card: cards[cardIndex],
    });
  });
});

router.delete("/:username", authMiddleware, (req, res) => {
  const cardId = req.params.id;
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
    // Find the card to delete
    const cardIndex = cards.findIndex((card) => card.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ errorMessage: "Card not found" });
    }
    // Remove the card from the list
    const deletedCard = cards.splice(cardIndex, 1);

    // Write the updated card list back to the JSON file
    fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), (writeErr) => {
      if (writeErr) {
        return res
          .status(500)
          .json({ errorMessage: "Failed to save card data" });
      }

      res.json({
        successMessage: "Card deleted successfully",
        card: deletedCard[0],
      });
    });
  });
});

module.exports = router;

//FIXME:make sure there's a formula when creating cards that makes the ID unique
//FIXME: update cards: err - cards is not defined???
//FIXME: delet doesn't work 🤡
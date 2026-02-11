const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const db = require("./model");
const Card = db.Cards; 
const app = express();

app.use(cors());
app.use(express.json());

// Route to save card
app.post("/api/save-card", async (req, res) => {
  try {
    const { cardNumber } = req.body;

    if (!cardNumber) {
      return res.status(400).json({ message: "Card number is required" });
    }

    await Card.create({ cardNumber });

    res.json({ message: "Card saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server d error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

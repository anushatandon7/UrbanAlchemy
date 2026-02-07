const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config(); // store API key in .env

const app = express();
app.use(cors());
app.use(express.json());

app.post("/wizard", async (req, res) => {
  const { item, choice, city } = req.body;

  try {
    const prompt = `You are a magical wizard teaching a player about sustainability.
Item: ${item}
Player's choice: ${choice} (either recycle or compost)
City: ${city}
Explain in a short, friendly, magical way if the choice is correct, why, and give a fun magical reaction.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ text: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate wizard response" });
  }
});

app.listen(3000, () => console.log("Wizard AI server running on port 3000"));


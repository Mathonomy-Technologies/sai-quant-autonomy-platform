import express from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// AI Strategy Generation Endpoint
router.post("/generate-strategy", async (req, res) => {
  const { goal, timeframe, riskTolerance } = req.body;

  try {
    const prompt = `
    You are an expert quantitative trading strategist.

    Build a technical trading strategy based on:
    - Goal: ${goal}
    - Timeframe: ${timeframe}
    - Risk Tolerance: ${riskTolerance}

    Output only in this format:

    Strategy Name:
    Indicators Used:
    Entry Conditions:
    Exit Conditions:
    Stop Loss Rules:
    Take Profit Rules:
    Notes:
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 500
    });

    const aiOutput = response.data.choices[0].message?.content;

    res.json({
      success: true,
      strategy: aiOutput
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;


import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize OpenAI with the new v4+ SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// AI Strategy Generation Endpoint
router.post("/generate-strategy", async (req, res) => {
  const { goal, timeframe, riskTolerance } = req.body;

  if (!goal || !timeframe || !riskTolerance) {
    return res.status(400).json({ 
      error: "Missing required fields: goal, timeframe, riskTolerance" 
    });
  }

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-2025-04-14",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 500
    });

    const aiOutput = completion.choices[0].message?.content;

    res.json({
      success: true,
      strategy: aiOutput
    });

  } catch (err: any) {
    console.error("OpenAI API Error:", err);
    res.status(500).json({ 
      error: "Failed to generate strategy",
      details: err.message 
    });
  }
});

// Market Analysis Endpoint
router.post("/analyze-market", async (req, res) => {
  const { symbol, period } = req.body;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  try {
    const prompt = `
    Analyze the current market conditions for ${symbol} over the ${period || "1 week"} period.
    Provide:
    1. Technical analysis
    2. Key support/resistance levels
    3. Market sentiment
    4. Trading recommendations
    Keep it concise and actionable.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-2025-04-14",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 400
    });

    const analysis = completion.choices[0].message?.content;

    res.json({
      success: true,
      analysis,
      symbol,
      period: period || "1 week"
    });

  } catch (err: any) {
    console.error("Market Analysis Error:", err);
    res.status(500).json({ 
      error: "Failed to analyze market",
      details: err.message 
    });
  }
});

export default router;

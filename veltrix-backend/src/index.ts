
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import aiStrategyRoute from "./routes/ai-strategy-generator.js";
import strategyRoutes from "./routes/strategies.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Validate required environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing required Supabase environment variables");
  console.error("Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file");
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY environment variable");
  console.error("Please add your OpenAI API key to the .env file");
  process.exit(1);
}

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "https://your-frontend-domain.com"],
  credentials: true
}));
app.use(express.json());

// Mount routes
app.use("/api/strategies", strategyRoutes);
app.use("/api/ai", aiStrategyRoute);

// Supabase client setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Veltrix Backend API is running 🚀",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.listen(port, () => {
  console.log(`✅ Veltrix backend server running at http://localhost:${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import aiStrategyRoute from "./routes/ai-strategy-generator.js";
import strategyRoutes from './routes/strategies';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/strategies', strategyRoutes);

// Supabase init (still ready for future expansion)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Health check
app.get("/", (req, res) => {
  res.send("Veltrix Backend API is running 🚀");
});

// Mount AI Strategy route
app.use("/api/ai", aiStrategyRoute);

app.listen(port, () => {
  console.log(`Veltrix backend server listening at http://localhost:${port}`);
});

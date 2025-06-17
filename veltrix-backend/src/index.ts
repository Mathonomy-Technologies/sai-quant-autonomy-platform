import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Health check route
app.get("/", (req, res) => {
  res.send("Veltrix Backend API is running 🚀");
});

// Example secured route (testing Supabase auth)
app.get("/profile", async (req, res) => {
  const { data, error } = await supabase.from("profiles").select("*").limit(10);
  
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Veltrix backend listening at http://localhost:${port}`);
});

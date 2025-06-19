
# Veltrix Backend

Backend services for the Veltrix Trading AI Platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Fill in your environment variables in the `.env` file:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `OPENAI_API_KEY`: Your OpenAI API key

4. Run the development server:
```bash
npm run dev
```

## Environment Variables

- `SUPABASE_URL`: Required. Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Required. Your Supabase service role key  
- `OPENAI_API_KEY`: Required. Your OpenAI API key
- `PORT`: Optional. Server port (default: 5000)
- `NODE_ENV`: Optional. Environment (default: development)

## API Endpoints

- `GET /`: Health check
- `POST /api/ai/generate-strategy`: Generate trading strategy using AI
- `POST /api/ai/analyze-market`: Analyze market conditions
- `GET /api/strategies`: Get all strategies
- `POST /api/strategies`: Create new strategy

## Development

The server uses TypeScript with ES modules. Make sure your Node.js version supports ES modules (Node.js 14+).

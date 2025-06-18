
import { supabase } from '@/integrations/supabase/client';

const BACKEND_URL = 'http://localhost:5000';

export interface AIStrategyRequest {
  goal: string;
  timeframe: string;
  riskTolerance: string;
}

export interface AIStrategyResponse {
  success: boolean;
  strategy: string;
}

export interface MarketAnalysisRequest {
  symbol: string;
  period?: string;
}

export interface MarketAnalysisResponse {
  success: boolean;
  analysis: string;
  symbol: string;
  period: string;
}

export const aiService = {
  async generateStrategy(request: AIStrategyRequest): Promise<AIStrategyResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/ai/generate-strategy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating AI strategy:', error);
      throw error;
    }
  },

  async analyzeMarket(request: MarketAnalysisRequest): Promise<MarketAnalysisResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/ai/analyze-market`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing market:', error);
      throw error;
    }
  },

  async saveAIGeneratedStrategy(strategy: {
    name: string;
    content: string;
    user_id: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('strategies')
        .insert({
          user_id: strategy.user_id,
          name: strategy.name,
          pine_script: strategy.content,
          timeframe: '1h',
          duration: '1_day',
          max_amount: 5000,
          is_active: false
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving AI strategy:', error);
      throw error;
    }
  }
};

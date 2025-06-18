
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, Save } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { aiService } from '@/services/aiService';
import { useToast } from "@/hooks/use-toast";

export const AIStrategyGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<string>('');
  const [formData, setFormData] = useState({
    goal: '',
    timeframe: '1h',
    riskTolerance: 'medium'
  });

  const handleGenerate = async () => {
    if (!formData.goal) {
      toast({
        title: "Missing Information",
        description: "Please provide your trading goal.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await aiService.generateStrategy(formData);
      setGeneratedStrategy(response.strategy);
      toast({
        title: "Strategy Generated",
        description: "AI has generated a new trading strategy for you."
      });
    } catch (error) {
      console.error('Error generating strategy:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate strategy. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !generatedStrategy) return;

    try {
      setLoading(true);
      await aiService.saveAIGeneratedStrategy({
        name: `AI Strategy - ${formData.goal}`,
        content: generatedStrategy,
        user_id: user.id
      });
      
      toast({
        title: "Strategy Saved",
        description: "AI-generated strategy has been saved to your strategies."
      });
      
      setGeneratedStrategy('');
      setFormData({ goal: '', timeframe: '1h', riskTolerance: 'medium' });
    } catch (error) {
      console.error('Error saving strategy:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save strategy. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Strategy Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Trading Goal</Label>
            <Input
              id="goal"
              placeholder="e.g., Generate consistent income from swing trading"
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeframe">Preferred Timeframe</Label>
            <Select value={formData.timeframe} onValueChange={(value) => setFormData({...formData, timeframe: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Minute</SelectItem>
                <SelectItem value="5m">5 Minutes</SelectItem>
                <SelectItem value="15m">15 Minutes</SelectItem>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="4h">4 Hours</SelectItem>
                <SelectItem value="1d">1 Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="risk">Risk Tolerance</Label>
            <Select value={formData.riskTolerance} onValueChange={(value) => setFormData({...formData, riskTolerance: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={loading || !formData.goal}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Strategy...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Strategy
            </>
          )}
        </Button>

        {generatedStrategy && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                AI has generated a strategy based on your requirements. Review it carefully before implementing.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label>Generated Strategy</Label>
              <Textarea
                value={generatedStrategy}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Strategy
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, StopCircle, BarChart3, Calendar } from "lucide-react";

export const BacktestingInterface = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-01");
  const [initialCapital, setInitialCapital] = useState("100000");

  const strategies = [
    { id: "momentum", name: "Momentum Strategy", description: "Buy high, sell higher" },
    { id: "meanRevert", name: "Mean Reversion", description: "Buy low, sell high" },
    { id: "breakout", name: "Breakout Strategy", description: "Trade on price breakouts" },
    { id: "arbitrage", name: "Statistical Arbitrage", description: "Pair trading strategy" }
  ];

  const backtestResults = {
    totalReturn: 23.5,
    sharpeRatio: 1.42,
    maxDrawdown: -8.2,
    winRate: 65.4,
    totalTrades: 247,
    profitableTrades: 162,
    avgTradeReturn: 0.8,
    volatility: 12.3
  };

  const handleRunBacktest = () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate backtesting progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleStopBacktest = () => {
    setIsRunning(false);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Strategy Backtesting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy">Strategy</Label>
              <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  {strategies.map(strategy => (
                    <SelectItem key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capital">Initial Capital ($)</Label>
              <Input
                id="capital"
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isRunning ? (
              <Button
                onClick={handleRunBacktest}
                disabled={!selectedStrategy}
                className="flex items-center gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                Run Backtest
              </Button>
            ) : (
              <Button
                onClick={handleStopBacktest}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <StopCircle className="h-4 w-4" />
                Stop Backtest
              </Button>
            )}
            
            {selectedStrategy && (
              <Badge variant="outline">
                {strategies.find(s => s.id === selectedStrategy)?.name}
              </Badge>
            )}
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backtesting Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Panel */}
      {progress === 100 && (
        <Card>
          <CardHeader>
            <CardTitle>Backtest Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {backtestResults.totalReturn}%
                </div>
                <div className="text-sm text-muted-foreground">Total Return</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {backtestResults.sharpeRatio}
                </div>
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {backtestResults.maxDrawdown}%
                </div>
                <div className="text-sm text-muted-foreground">Max Drawdown</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {backtestResults.winRate}%
                </div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {backtestResults.totalTrades}
                </div>
                <div className="text-sm text-muted-foreground">Total Trades</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {backtestResults.profitableTrades}
                </div>
                <div className="text-sm text-muted-foreground">Profitable</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {backtestResults.avgTradeReturn}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Trade</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {backtestResults.volatility}%
                </div>
                <div className="text-sm text-muted-foreground">Volatility</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

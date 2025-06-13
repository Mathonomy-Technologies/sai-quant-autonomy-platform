
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, Target } from "lucide-react";

export const RiskMetrics = () => {
  const riskData = {
    portfolioRisk: 65, // out of 100
    maxDrawdown: 8.5,
    sharpeRatio: 1.85,
    dayTradingBuyingPower: 85000,
    usedBuyingPower: 45230,
    riskPerTrade: 2.5,
    maxDailyLoss: 5000,
    currentDailyLoss: 0
  };

  const buyingPowerUsed = (riskData.usedBuyingPower / riskData.dayTradingBuyingPower) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Portfolio Risk Level</span>
              <span className="font-medium">{riskData.portfolioRisk}%</span>
            </div>
            <Progress value={riskData.portfolioRisk} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {riskData.portfolioRisk < 50 ? 'Conservative' : riskData.portfolioRisk < 75 ? 'Moderate' : 'Aggressive'}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Buying Power Used</span>
              <span className="font-medium">{buyingPowerUsed.toFixed(1)}%</span>
            </div>
            <Progress value={buyingPowerUsed} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              ${riskData.usedBuyingPower.toLocaleString()} / ${riskData.dayTradingBuyingPower.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
            <span className="font-medium text-green-500">{riskData.sharpeRatio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Max Drawdown</span>
            <span className="font-medium text-red-500">-{riskData.maxDrawdown}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Risk Per Trade</span>
            <span className="font-medium">{riskData.riskPerTrade}%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Daily Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Max Daily Loss</span>
            <span className="font-medium">${riskData.maxDailyLoss.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Current Loss</span>
            <span className="font-medium text-green-500">
              ${riskData.currentDailyLoss.toLocaleString()}
            </span>
          </div>
          <div>
            <Progress 
              value={(riskData.currentDailyLoss / riskData.maxDailyLoss) * 100} 
              className="h-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Risk limit utilization
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

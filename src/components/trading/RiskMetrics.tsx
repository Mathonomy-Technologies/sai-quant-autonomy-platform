
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
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4" />
            Risk Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Portfolio Risk</span>
              <span className="font-medium">{riskData.portfolioRisk}%</span>
            </div>
            <Progress value={riskData.portfolioRisk} className="h-1.5" />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Buying Power Used</span>
              <span className="font-medium">{buyingPowerUsed.toFixed(1)}%</span>
            </div>
            <Progress value={buyingPowerUsed} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Sharpe Ratio</span>
            <span className="font-medium text-green-500">{riskData.sharpeRatio}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Max Drawdown</span>
            <span className="font-medium text-red-500">-{riskData.maxDrawdown}%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Risk Per Trade</span>
            <span className="font-medium">{riskData.riskPerTrade}%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            Daily Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Max Loss</span>
            <span className="font-medium">${riskData.maxDailyLoss.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Current Loss</span>
            <span className="font-medium text-green-500">
              ${riskData.currentDailyLoss.toLocaleString()}
            </span>
          </div>
          <Progress 
            value={(riskData.currentDailyLoss / riskData.maxDailyLoss) * 100} 
            className="h-1.5" 
          />
        </CardContent>
      </Card>
    </div>
  );
};

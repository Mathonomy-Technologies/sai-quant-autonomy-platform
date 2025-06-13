
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Calculator, Trophy, Receipt } from "lucide-react";

export const PortfolioOverview = () => {
  const portfolioData = {
    totalValue: 125847.32,
    dailyPnL: 2456.78,
    dailyPnLPercent: 1.98,
    weeklyPnL: 8932.45,
    monthlyPnL: 15678.90,
    buyingPower: 45230.15,
    positions: 8,
    totalPnL: 23456.89,
    profitFactor: 2.34,
    profitableTrades: 142,
    totalTrades: 218,
    commissionFees: 1234.56
  };

  const profitableTradesPercent = ((portfolioData.profitableTrades / portfolioData.totalTrades) * 100).toFixed(1);

  const stats = [
    {
      title: "Portfolio Value",
      value: `$${portfolioData.totalValue.toLocaleString()}`,
      icon: DollarSign,
      change: null
    },
    {
      title: "Daily P&L",
      value: `$${portfolioData.dailyPnL.toLocaleString()}`,
      icon: portfolioData.dailyPnL >= 0 ? TrendingUp : TrendingDown,
      change: `${portfolioData.dailyPnLPercent > 0 ? '+' : ''}${portfolioData.dailyPnLPercent}%`,
      changeColor: portfolioData.dailyPnL >= 0 ? 'text-green-500' : 'text-red-500'
    },
    {
      title: "Total P&L",
      value: `$${portfolioData.totalPnL.toLocaleString()}`,
      icon: portfolioData.totalPnL >= 0 ? TrendingUp : TrendingDown,
      change: "All time",
      changeColor: portfolioData.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'
    },
    {
      title: "Active Positions",
      value: portfolioData.positions.toString(),
      icon: Activity,
      change: null
    },
    {
      title: "Profit Factor",
      value: portfolioData.profitFactor.toFixed(2),
      icon: Calculator,
      change: "Gross profit / loss",
      changeColor: portfolioData.profitFactor > 1 ? 'text-green-500' : 'text-red-500'
    },
    {
      title: "Profitable Trades",
      value: `${portfolioData.profitableTrades}`,
      icon: Trophy,
      change: `${profitableTradesPercent}% win rate`,
      changeColor: 'text-green-500'
    },
    {
      title: "Total Trades",
      value: portfolioData.totalTrades.toString(),
      icon: Target,
      change: "All executions",
      changeColor: 'text-muted-foreground'
    },
    {
      title: "Commission Fees",
      value: `$${portfolioData.commissionFees.toLocaleString()}`,
      icon: Receipt,
      change: "Total paid",
      changeColor: 'text-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            {stat.change && (
              <p className={`text-xs ${stat.changeColor} mt-1`}>
                {stat.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

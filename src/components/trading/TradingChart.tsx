
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TrendingUp, Settings } from "lucide-react";
import { TradingViewWidget } from './TradingViewWidget';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export const TradingChart = () => {
  const [useTradingView, setUseTradingView] = useState(true);
  
  // Simulated portfolio performance data for fallback chart
  const chartData = [
    { time: '09:30', value: 120000, pnl: 0 },
    { time: '10:00', value: 121500, pnl: 1500 },
    { time: '10:30', value: 119800, pnl: -200 },
    { time: '11:00', value: 123200, pnl: 3200 },
    { time: '11:30', value: 122800, pnl: 2800 },
    { time: '12:00', value: 124600, pnl: 4600 },
    { time: '12:30', value: 123900, pnl: 3900 },
    { time: '13:00', value: 125400, pnl: 5400 },
    { time: '13:30', value: 126200, pnl: 6200 },
    { time: '14:00', value: 125847, pnl: 5847 }
  ];

  if (useTradingView) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              id="chart-type"
              checked={useTradingView}
              onCheckedChange={setUseTradingView}
            />
            <Label htmlFor="chart-type" className="text-sm">
              Use TradingView Charts
            </Label>
            <Badge variant="default">Live Data</Badge>
          </div>
        </div>
        <TradingViewWidget 
          symbol="NASDAQ:AAPL" 
          theme="light" 
          height={400} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            id="chart-type"
            checked={useTradingView}
            onCheckedChange={setUseTradingView}
          />
          <Label htmlFor="chart-type" className="text-sm">
            Use TradingView Charts
          </Label>
          <Badge variant="secondary">Simulated Data</Badge>
        </div>
      </div>
      
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Portfolio Performance</span>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Portfolio Value</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Daily P&L</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'value' ? `$${value.toLocaleString()}` : `$${value >= 0 ? '+' : ''}${value.toLocaleString()}`,
                  name === 'value' ? 'Portfolio Value' : 'Daily P&L'
                ]}
                labelFormatter={(label) => `Time: ${label}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

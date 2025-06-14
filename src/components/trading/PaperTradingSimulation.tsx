
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, DollarSign, Activity, Target } from "lucide-react";

export const PaperTradingSimulation = () => {
  const [isActive, setIsActive] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const portfolioStats = {
    virtualBalance: 95750,
    totalEquity: 104320,
    dayPnL: 1250,
    unrealizedPnL: 2870,
    realizedPnL: 6700,
    buyingPower: 85000,
    positions: 7
  };

  const paperTrades = [
    {
      id: 1,
      symbol: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 175.50,
      time: "10:30:15",
      pnl: 450,
      status: "Filled"
    },
    {
      id: 2,
      symbol: "TSLA",
      side: "SELL",
      quantity: 50,
      price: 245.80,
      time: "11:15:42",
      pnl: -120,
      status: "Filled"
    },
    {
      id: 3,
      symbol: "NVDA",
      side: "BUY",
      quantity: 25,
      price: 485.20,
      time: "14:22:18",
      pnl: 920,
      status: "Filled"
    }
  ];

  const handlePlaceOrder = () => {
    if (!symbol || !quantity) return;
    
    console.log(`Paper trade placed: ${side.toUpperCase()} ${quantity} ${symbol} at ${orderType === 'market' ? 'market price' : `$${price}`}`);
    // Reset form
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Paper Trading Simulation
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {isActive ? "Active" : "Paused"}
              </span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                ${portfolioStats.virtualBalance.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Virtual Cash</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">
                ${portfolioStats.totalEquity.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Equity</div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${portfolioStats.dayPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${portfolioStats.dayPnL >= 0 ? '+' : ''}{portfolioStats.dayPnL.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Day P&L</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">
                {portfolioStats.positions}
              </div>
              <div className="text-sm text-muted-foreground">Positions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Entry */}
      {isActive && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Place Paper Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="AAPL"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="side">Side</Label>
                <Select value={side} onValueChange={setSide}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="order-type">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {orderType === "limit" && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              )}
              
              <div className="flex items-end">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!symbol || !quantity}
                  className="w-full"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Paper Trades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Paper Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paperTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge variant={trade.side === "BUY" ? "default" : "destructive"}>
                    {trade.side}
                  </Badge>
                  <div>
                    <div className="font-medium">{trade.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {trade.quantity} @ ${trade.price}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${trade.pnl >= 0 ? '+' : ''}{trade.pnl}
                    </div>
                    <div className="text-sm text-muted-foreground">{trade.time}</div>
                  </div>
                  <Badge variant="outline">{trade.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

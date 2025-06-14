
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Filter, Calendar, TrendingUp, TrendingDown } from "lucide-react";

export const TradeLoggingDashboard = () => {
  const [filterSymbol, setFilterSymbol] = useState("");
  const [filterStrategy, setFilterStrategy] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  const tradeLog = [
    {
      id: 1,
      timestamp: "2024-12-14 10:30:15",
      symbol: "AAPL",
      strategy: "Momentum",
      side: "BUY",
      quantity: 100,
      entryPrice: 175.50,
      exitPrice: 178.20,
      pnl: 270,
      commission: 2.50,
      duration: "2h 15m",
      status: "Closed",
      notes: "Strong breakout above resistance"
    },
    {
      id: 2,
      timestamp: "2024-12-14 11:45:32",
      symbol: "TSLA",
      strategy: "Mean Reversion",
      side: "SELL",
      quantity: 50,
      entryPrice: 245.80,
      exitPrice: 242.10,
      pnl: 185,
      commission: 1.75,
      duration: "1h 45m",
      status: "Closed",
      notes: "Oversold bounce as expected"
    },
    {
      id: 3,
      timestamp: "2024-12-14 14:22:18",
      symbol: "NVDA",
      strategy: "Breakout",
      side: "BUY",
      quantity: 25,
      entryPrice: 485.20,
      exitPrice: null,
      pnl: 125,
      commission: 1.25,
      duration: "Active",
      status: "Open",
      notes: "Volume confirmation on breakout"
    }
  ];

  const performanceMetrics = {
    totalTrades: 147,
    winningTrades: 89,
    losingTrades: 58,
    winRate: 60.5,
    averageWin: 285,
    averageLoss: -156,
    profitFactor: 1.83,
    largestWin: 1250,
    largestLoss: -890,
    totalCommissions: 347.50
  };

  const exportTrades = () => {
    console.log("Exporting trade log...");
    // Implementation for CSV/Excel export
  };

  const filteredTrades = tradeLog.filter(trade => {
    const symbolMatch = !filterSymbol || trade.symbol.toLowerCase().includes(filterSymbol.toLowerCase());
    const strategyMatch = filterStrategy === "all" || trade.strategy === filterStrategy;
    return symbolMatch && strategyMatch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Trade Logging & Reporting
            </span>
            <Button onClick={exportTrades} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="log" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="log">Trade Log</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="log" className="mt-6">
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Filter by symbol..."
                    value={filterSymbol}
                    onChange={(e) => setFilterSymbol(e.target.value)}
                  />
                </div>
                <Select value={filterStrategy} onValueChange={setFilterStrategy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Strategies</SelectItem>
                    <SelectItem value="Momentum">Momentum</SelectItem>
                    <SelectItem value="Mean Reversion">Mean Reversion</SelectItem>
                    <SelectItem value="Breakout">Breakout</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trade Log Table */}
              <div className="space-y-4">
                {filteredTrades.map((trade) => (
                  <Card key={trade.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {trade.side === "BUY" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          {trade.symbol}
                        </div>
                        <div className="text-sm text-muted-foreground">{trade.strategy}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Quantity</div>
                        <div className="font-medium">{trade.quantity}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Entry/Exit</div>
                        <div className="font-medium">
                          ${trade.entryPrice}
                          {trade.exitPrice && ` / $${trade.exitPrice}`}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">P&L</div>
                        <div className={`font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${trade.pnl >= 0 ? '+' : ''}{trade.pnl}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">{trade.duration}</div>
                      </div>
                      
                      <div>
                        <Badge variant={trade.status === "Open" ? "default" : "outline"}>
                          {trade.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {trade.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-sm text-muted-foreground">Notes: {trade.notes}</div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{performanceMetrics.totalTrades}</div>
                    <div className="text-sm text-muted-foreground">Total Trades</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{performanceMetrics.winRate}%</div>
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{performanceMetrics.profitFactor}</div>
                    <div className="text-sm text-muted-foreground">Profit Factor</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">${performanceMetrics.averageWin}</div>
                    <div className="text-sm text-muted-foreground">Avg Win</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{performanceMetrics.winningTrades}</div>
                    <div className="text-sm text-muted-foreground">Winning Trades</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{performanceMetrics.losingTrades}</div>
                    <div className="text-sm text-muted-foreground">Losing Trades</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">-${Math.abs(performanceMetrics.averageLoss)}</div>
                    <div className="text-sm text-muted-foreground">Avg Loss</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">${performanceMetrics.totalCommissions}</div>
                    <div className="text-sm text-muted-foreground">Total Fees</div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Daily Performance Report</div>
                      <div className="text-sm text-muted-foreground">
                        Detailed breakdown of today's trading activity
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Weekly Strategy Analysis</div>
                      <div className="text-sm text-muted-foreground">
                        Performance comparison across different strategies
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Risk Management Report</div>
                      <div className="text-sm text-muted-foreground">
                        Risk metrics and compliance summary
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

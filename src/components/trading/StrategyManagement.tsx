import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Settings, Code, DollarSign, Clock, Save, Edit, Trash2 } from "lucide-react";

interface Strategy {
  id: string;
  name: string;
  pineScript: string;
  isActive: boolean;
  maxAmount: number;
  timeframe: string;
  duration: string;
  createdAt: string;
  performance: {
    totalTrades: number;
    winRate: number;
    pnl: number;
  };
}

export const StrategyManagement = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: 'Moving Average Crossover',
      pineScript: '//@version=5\nstrategy("MA Crossover", overlay=true)\nema_short = ta.ema(close, 20)\nema_long = ta.ema(close, 50)\nif ta.crossover(ema_short, ema_long)\n    strategy.entry("Long", strategy.long)\nif ta.crossunder(ema_short, ema_long)\n    strategy.close("Long")',
      isActive: true,
      maxAmount: 10000,
      timeframe: '1h',
      duration: '1_week',
      createdAt: '2024-01-15',
      performance: {
        totalTrades: 45,
        winRate: 67,
        pnl: 2340
      }
    }
  ]);

  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [activeTab, setActiveTab] = useState("strategies");
  const [isCreating, setIsCreating] = useState(false);
  const [newStrategy, setNewStrategy] = useState({
    name: '',
    pineScript: '',
    maxAmount: 5000,
    timeframe: '1h',
    duration: '1_day'
  });

  const timeframes = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '2h', label: '2 Hours' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
    { value: '1w', label: '1 Week' }
  ];

  const durations = [
    { value: '1_hour', label: '1 Hour' },
    { value: '2_hours', label: '2 Hours' },
    { value: '1_day', label: '1 Day' },
    { value: '1_week', label: '1 Week' },
    { value: '1_month', label: '1 Month' },
    { value: 'until_stopped', label: 'Until Manually Stopped' }
  ];

  const handleCreateNewStrategy = () => {
    setIsCreating(true);
    setActiveTab("create");
    console.log('Create new strategy button clicked');
  };

  const handleSaveStrategy = () => {
    if (!newStrategy.name || !newStrategy.pineScript) return;

    const strategy: Strategy = {
      id: Date.now().toString(),
      name: newStrategy.name,
      pineScript: newStrategy.pineScript,
      isActive: false,
      maxAmount: newStrategy.maxAmount,
      timeframe: newStrategy.timeframe,
      duration: newStrategy.duration,
      createdAt: new Date().toISOString().split('T')[0],
      performance: {
        totalTrades: 0,
        winRate: 0,
        pnl: 0
      }
    };

    setStrategies([...strategies, strategy]);
    setNewStrategy({
      name: '',
      pineScript: '',
      maxAmount: 5000,
      timeframe: '1h',
      duration: '1_day'
    });
    setIsCreating(false);
    setActiveTab("strategies");
    console.log('Strategy saved:', strategy);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewStrategy({
      name: '',
      pineScript: '',
      maxAmount: 5000,
      timeframe: '1h',
      duration: '1_day'
    });
    setActiveTab("strategies");
  };

  const toggleStrategyActive = (strategyId: string) => {
    setStrategies(strategies.map(s => 
      s.id === strategyId ? { ...s, isActive: !s.isActive } : s
    ));
    console.log(`Strategy ${strategyId} toggled`);
  };

  const deleteStrategy = (strategyId: string) => {
    setStrategies(strategies.filter(s => s.id !== strategyId));
    console.log(`Strategy ${strategyId} deleted`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Strategy Management
            </span>
            <Button onClick={handleCreateNewStrategy}>
              <Save className="h-4 w-4 mr-2" />
              Create New Strategy
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="strategies">My Strategies</TabsTrigger>
              <TabsTrigger value="create">Create Strategy</TabsTrigger>
            </TabsList>

            <TabsContent value="strategies" className="mt-6">
              <div className="space-y-4">
                {strategies.map((strategy) => (
                  <Card key={strategy.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{strategy.name}</h3>
                          <Badge variant={strategy.isActive ? "default" : "secondary"}>
                            {strategy.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={strategy.isActive}
                            onCheckedChange={() => toggleStrategyActive(strategy.id)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedStrategy(strategy)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteStrategy(strategy.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Max Amount:</span>
                          <div className="font-medium">${strategy.maxAmount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timeframe:</span>
                          <div className="font-medium">{strategy.timeframe}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <div className="font-medium">
                            {durations.find(d => d.value === strategy.duration)?.label}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">P&L:</span>
                          <div className={`font-medium ${strategy.performance.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${strategy.performance.pnl >= 0 ? '+' : ''}{strategy.performance.pnl}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Trades:</span>
                          <span className="ml-2 font-medium">{strategy.performance.totalTrades}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Win Rate:</span>
                          <span className="ml-2 font-medium">{strategy.performance.winRate}%</span>
                        </div>
                      </div>

                      {strategy.isActive && (
                        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            Strategy is currently active and monitoring the market
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-6">
              {isCreating ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="strategy-name">Strategy Name</Label>
                        <Input
                          id="strategy-name"
                          placeholder="Enter strategy name"
                          value={newStrategy.name}
                          onChange={(e) => setNewStrategy({...newStrategy, name: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max-amount">Maximum Trading Amount ($)</Label>
                        <Input
                          id="max-amount"
                          type="number"
                          placeholder="5000"
                          value={newStrategy.maxAmount}
                          onChange={(e) => setNewStrategy({...newStrategy, maxAmount: Number(e.target.value)})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeframe">Timeframe</Label>
                        <Select value={newStrategy.timeframe} onValueChange={(value) => setNewStrategy({...newStrategy, timeframe: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeframes.map((tf) => (
                              <SelectItem key={tf.value} value={tf.value}>
                                {tf.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Trading Duration</Label>
                        <Select value={newStrategy.duration} onValueChange={(value) => setNewStrategy({...newStrategy, duration: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map((duration) => (
                              <SelectItem key={duration.value} value={duration.value}>
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pine-script">TradingView Pine Script</Label>
                      <Textarea
                        id="pine-script"
                        placeholder="//@version=5&#10;strategy(&quot;My Strategy&quot;, overlay=true)&#10;&#10;// Your Pine Script code here"
                        className="min-h-[300px] font-mono text-sm"
                        value={newStrategy.pineScript}
                        onChange={(e) => setNewStrategy({...newStrategy, pineScript: e.target.value})}
                      />
                      <p className="text-sm text-muted-foreground">
                        Paste your TradingView Pine Script strategy code here. Make sure it's a valid Pine Script v5 strategy.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleSaveStrategy} disabled={!newStrategy.name || !newStrategy.pineScript}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Strategy
                    </Button>
                    <Button variant="outline" onClick={handleCancelCreate}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Create Your First Strategy</h3>
                  <p className="text-muted-foreground mb-4">
                    Import your TradingView Pine Script strategies and configure trading parameters
                  </p>
                  <Button onClick={handleCreateNewStrategy}>
                    <Save className="h-4 w-4 mr-2" />
                    Create New Strategy
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

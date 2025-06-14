
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PieChart as PieIcon, BarChart3, Activity } from "lucide-react";

export const DataVisualization = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  const performanceData = [
    { time: '09:30', portfolio: 120000, benchmark: 119500 },
    { time: '10:00', portfolio: 121500, benchmark: 120200 },
    { time: '10:30', portfolio: 119800, benchmark: 119800 },
    { time: '11:00', portfolio: 123200, benchmark: 121000 },
    { time: '11:30', portfolio: 122800, benchmark: 120800 },
    { time: '12:00', portfolio: 124600, benchmark: 122100 },
    { time: '12:30', portfolio: 123900, benchmark: 121900 },
    { time: '13:00', portfolio: 125400, benchmark: 123200 },
    { time: '13:30', portfolio: 126200, benchmark: 124000 },
    { time: '14:00', portfolio: 125847, benchmark: 123800 }
  ];

  const sectorData = [
    { name: 'Technology', value: 35, color: '#8884d8' },
    { name: 'Healthcare', value: 20, color: '#82ca9d' },
    { name: 'Finance', value: 18, color: '#ffc658' },
    { name: 'Energy', value: 12, color: '#ff7300' },
    { name: 'Consumer', value: 10, color: '#0088fe' },
    { name: 'Other', value: 5, color: '#00c49f' }
  ];

  const volumeData = [
    { time: '09:30', volume: 1200000 },
    { time: '10:00', volume: 980000 },
    { time: '10:30', volume: 1450000 },
    { time: '11:00', volume: 860000 },
    { time: '11:30', volume: 1120000 },
    { time: '12:00', volume: 750000 },
    { time: '12:30', volume: 890000 },
    { time: '13:00', volume: 1340000 },
    { time: '13:30', volume: 920000 },
    { time: '14:00', volume: 1100000 }
  ];

  const drawdownData = [
    { time: '09:30', drawdown: 0 },
    { time: '10:00', drawdown: -1.2 },
    { time: '10:30', drawdown: -2.8 },
    { time: '11:00', drawdown: -0.5 },
    { time: '11:30', drawdown: -1.1 },
    { time: '12:00', drawdown: 0 },
    { time: '12:30', drawdown: -0.8 },
    { time: '13:00', drawdown: 0 },
    { time: '13:30', drawdown: 0 },
    { time: '14:00', drawdown: -0.3 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Data Visualization Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="sectors">Sectors</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Portfolio vs Benchmark
                    </span>
                    <div className="flex gap-2">
                      {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedTimeframe(period)}
                          className={`px-3 py-1 text-xs rounded ${
                            selectedTimeframe === period
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="time" className="text-xs" />
                        <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip
                          formatter={(value: number, name: string) => [
                            `$${value.toLocaleString()}`,
                            name === 'portfolio' ? 'Portfolio' : 'Benchmark'
                          ]}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="portfolio"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="benchmark"
                          stroke="#94a3b8"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sectors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieIcon className="h-4 w-4" />
                    Sector Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volume" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Trading Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="time" className="text-xs" />
                        <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                        <Tooltip
                          formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M`, 'Volume']}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="volume" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Drawdown Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={drawdownData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="time" className="text-xs" />
                        <YAxis className="text-xs" tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                          formatter={(value: number) => [`${value}%`, 'Drawdown']}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="drawdown"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserMenu } from "@/components/layout/UserMenu";
import { BrokerAccountManager } from "@/components/broker/BrokerAccountManager";
import { PortfolioOverview } from "@/components/trading/PortfolioOverview";
import { ActivePositions } from "@/components/trading/ActivePositions";
import { TradingChart } from "@/components/trading/TradingChart";
import { RecentTrades } from "@/components/trading/RecentTrades";
import { RiskMetrics } from "@/components/trading/RiskMetrics";
import { TradingControls } from "@/components/trading/TradingControls";
import { BacktestingInterface } from "@/components/trading/BacktestingInterface";
import { PaperTradingSimulation } from "@/components/trading/PaperTradingSimulation";
import { DataVisualization } from "@/components/trading/DataVisualization";
import { TradeLoggingDashboard } from "@/components/trading/TradeLoggingDashboard";
import { TradingViewIntegration } from "@/components/trading/TradingViewIntegration";
import { StrategyManagement } from "@/components/trading/StrategyManagement";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Veltrix Trading Dashboard</h1>
            <p className="text-muted-foreground">Autonomous Algo Trading Platform</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
            <UserMenu />
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="live">Live Trading</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="brokers">Brokers</TabsTrigger>
            <TabsTrigger value="charts">Live Charts</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-6 space-y-6">
            {/* Portfolio Overview */}
            <PortfolioOverview />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Trading Chart - Takes up 3 columns */}
              <div className="lg:col-span-3">
                <TradingChart />
              </div>
              
              {/* Controls and Risk - Takes up 1 column */}
              <div className="space-y-6">
                <TradingControls />
                <RiskMetrics />
              </div>
            </div>

            {/* Positions and Trades */}
            <Tabs defaultValue="positions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="positions">Active Positions</TabsTrigger>
                <TabsTrigger value="trades">Recent Trades</TabsTrigger>
              </TabsList>
              
              <TabsContent value="positions" className="mt-6">
                <ActivePositions />
              </TabsContent>
              
              <TabsContent value="trades" className="mt-6">
                <RecentTrades />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="strategies" className="mt-6">
            <StrategyManagement />
          </TabsContent>

          <TabsContent value="brokers" className="mt-6">
            <BrokerAccountManager />
          </TabsContent>

          <TabsContent value="charts" className="mt-6">
            <TradingViewIntegration />
          </TabsContent>

          <TabsContent value="simulation" className="mt-6">
            <Tabs defaultValue="backtesting" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="backtesting">Backtesting</TabsTrigger>
                <TabsTrigger value="paper">Paper Trading</TabsTrigger>
              </TabsList>
              
              <TabsContent value="backtesting" className="mt-6">
                <BacktestingInterface />
              </TabsContent>
              
              <TabsContent value="paper" className="mt-6">
                <PaperTradingSimulation />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <DataVisualization />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <TradeLoggingDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

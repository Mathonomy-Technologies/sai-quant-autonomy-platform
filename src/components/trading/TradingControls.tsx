
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, AlertTriangle } from "lucide-react";

export const TradingControls = () => {
  const [isTradingActive, setIsTradingActive] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handleTradingToggle = (checked: boolean) => {
    setIsTradingActive(checked);
    console.log(`Trading ${checked ? 'started' : 'paused'}`);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {isTradingActive ? (
                <Play className="h-5 w-5 text-green-500" />
              ) : (
                <Pause className="h-5 w-5 text-yellow-500" />
              )}
              Trading Controls
            </span>
            <Badge variant={isTradingActive ? "default" : "secondary"}>
              {isTradingActive ? "Active" : "Paused"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isTradingActive ? "Trading Active" : "Trading Paused"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isTradingActive 
                  ? "System is actively monitoring and executing trades"
                  : "All automated trading is currently paused"
                }
              </p>
            </div>
            <Switch
              checked={isTradingActive}
              onCheckedChange={handleTradingToggle}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            
            {!isTradingActive && (
              <div className="flex items-center gap-1 text-yellow-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs">Trading suspended</span>
              </div>
            )}
          </div>

          {showSettings && (
            <div className="border-t pt-4 space-y-3">
              <h4 className="text-sm font-medium">Quick Settings</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span>Max Position Size:</span>
                  <span className="font-medium">$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Per Trade:</span>
                  <span className="font-medium">2.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Loss Limit:</span>
                  <span className="font-medium">$5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Strategies:</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

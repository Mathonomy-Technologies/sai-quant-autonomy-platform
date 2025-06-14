
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BarChart3, TrendingUp } from "lucide-react";

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  height?: number;
}

export const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol = "NASDAQ:AAPL",
  theme = "light",
  height = 400
}) => {
  const [widgetType, setWidgetType] = useState<'free' | 'library'>('free');
  const [isLibraryAvailable, setIsLibraryAvailable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  // Check if TradingView Charting Library is available
  useEffect(() => {
    // This would check if you have the paid library loaded
    setIsLibraryAvailable(typeof window !== 'undefined' && (window as any).TradingView?.widget);
  }, []);

  // Free Widget Implementation
  useEffect(() => {
    if (widgetType === 'free' && containerRef.current) {
      // Clear previous widget
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.async = true;
      
      const config = {
        "autosize": false,
        "width": "100%",
        "height": height,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": theme,
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      };
      
      script.innerHTML = JSON.stringify(config);
      containerRef.current.appendChild(script);
    }
  }, [widgetType, symbol, theme, height]);

  // Paid Library Implementation
  useEffect(() => {
    if (widgetType === 'library' && containerRef.current && isLibraryAvailable) {
      // Clear previous widget
      containerRef.current.innerHTML = '';
      
      const widgetOptions = {
        symbol: symbol,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
        interval: "1D",
        container: containerRef.current,
        library_path: "/charting_library/",
        locale: "en",
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        fullscreen: false,
        autosize: true,
        theme: theme === 'dark' ? 'Dark' : 'Light'
      };

      try {
        widgetRef.current = new (window as any).TradingView.widget(widgetOptions);
      } catch (error) {
        console.error('TradingView Charting Library initialization failed:', error);
        setWidgetType('free'); // Fallback to free widget
      }
    }
  }, [widgetType, symbol, theme, isLibraryAvailable]);

  const handleWidgetTypeChange = (checked: boolean) => {
    const newType = checked ? 'library' : 'free';
    if (newType === 'library' && !isLibraryAvailable) {
      console.warn('TradingView Charting Library not available. Please ensure it is properly installed.');
      return;
    }
    setWidgetType(newType);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <span>Live Trading Chart</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={widgetType === 'free' ? 'default' : 'secondary'}>
              {widgetType === 'free' ? 'Free Widget' : 'Charting Library'}
            </Badge>
            <div className="flex items-center space-x-2">
              <Label htmlFor="widget-switch" className="text-sm">
                Use Library
              </Label>
              <Switch
                id="widget-switch"
                checked={widgetType === 'library'}
                onCheckedChange={handleWidgetTypeChange}
                disabled={!isLibraryAvailable}
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {!isLibraryAvailable && widgetType === 'library' && (
          <div className="p-4 bg-amber-50 border-l-4 border-amber-400">
            <p className="text-sm text-amber-700">
              TradingView Charting Library not detected. Please install the library files and ensure proper setup.
            </p>
          </div>
        )}
        <div
          ref={containerRef}
          style={{ height: height }}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TradingViewWidget } from './TradingViewWidget';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

export const TradingViewIntegration = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('NASDAQ:AAPL');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const popularSymbols = [
    { value: 'NASDAQ:AAPL', label: 'Apple Inc. (AAPL)' },
    { value: 'NASDAQ:GOOGL', label: 'Alphabet Inc. (GOOGL)' },
    { value: 'NASDAQ:MSFT', label: 'Microsoft Corporation (MSFT)' },
    { value: 'NASDAQ:TSLA', label: 'Tesla Inc. (TSLA)' },
    { value: 'AMEX:SPY', label: 'S&P 500 ETF (SPY)' },
    { value: 'NASDAQ:QQQ', label: 'Nasdaq 100 ETF (QQQ)' },
    { value: 'AMEX:IWM', label: 'Russell 2000 ETF (IWM)' },
    { value: 'BINANCE:BTCUSDT', label: 'Bitcoin/USDT (BTCUSDT)' },
    { value: 'BINANCE:ETHUSDT', label: 'Ethereum/USDT (ETHUSDT)' }
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            TradingView Integration Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Symbol</Label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a symbol" />
                </SelectTrigger>
                <SelectContent>
                  {popularSymbols.map((symbol) => (
                    <SelectItem key={symbol.value} value={symbol.value}>
                      {symbol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={(value: 'light' | 'dark') => setTheme(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> Some symbols may be restricted in TradingView's free widgets. 
              For full access to all symbols including direct S&P 500 index data, consider upgrading to TradingView's paid plan.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Widget Tabs */}
      <Tabs defaultValue="advanced" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="advanced">Advanced Chart</TabsTrigger>
          <TabsTrigger value="mini">Mini Chart</TabsTrigger>
          <TabsTrigger value="ticker">Ticker Tape</TabsTrigger>
          <TabsTrigger value="market">Market Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="advanced" className="mt-6">
          <TradingViewWidget 
            symbol={selectedSymbol} 
            theme={theme} 
            height={600} 
          />
        </TabsContent>

        <TabsContent value="mini" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Mini Chart Widget
                <Badge>Free</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="tradingview-widget-container" style={{ height: "350px", width: "100%" }}>
                <div className="tradingview-widget-container__widget"></div>
                <script 
                  type="text/javascript" 
                  src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "symbol": selectedSymbol,
                      "width": "100%",
                      "height": "350",
                      "locale": "en",
                      "dateRange": "12M",
                      "colorTheme": theme,
                      "isTransparent": false,
                      "autosize": false,
                      "largeChartUrl": ""
                    })
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ticker" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Ticker Tape Widget
                <Badge>Free</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="tradingview-widget-container" style={{ height: "100px", width: "100%" }}>
                <div className="tradingview-widget-container__widget"></div>
                <script 
                  type="text/javascript" 
                  src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "symbols": [
                        {
                          "proName": "AMEX:SPY",
                          "title": "S&P 500 ETF"
                        },
                        {
                          "proName": "NASDAQ:QQQ",
                          "title": "Nasdaq 100 ETF"
                        },
                        {
                          "proName": "FX_IDC:EURUSD",
                          "title": "EUR to USD"
                        },
                        {
                          "proName": "BINANCE:BTCUSD",
                          "title": "Bitcoin"
                        },
                        {
                          "proName": "BINANCE:ETHUSD",
                          "title": "Ethereum"
                        }
                      ],
                      "showSymbolLogo": true,
                      "colorTheme": theme,
                      "isTransparent": false,
                      "displayMode": "adaptive",
                      "locale": "en"
                    })
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Market Overview Widget
                <Badge>Free</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="tradingview-widget-container" style={{ height: "400px", width: "100%" }}>
                <div className="tradingview-widget-container__widget"></div>
                <script 
                  type="text/javascript" 
                  src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "colorTheme": theme,
                      "dateRange": "12M",
                      "showChart": true,
                      "locale": "en",
                      "width": "100%",
                      "height": "400",
                      "largeChartUrl": "",
                      "isTransparent": false,
                      "showSymbolLogo": true,
                      "showFloatingTooltip": false,
                      "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
                      "plotLineColorFalling": "rgba(41, 98, 255, 1)",
                      "gridLineColor": "rgba(240, 243, 250, 0)",
                      "scaleFontColor": "rgba(106, 109, 120, 1)",
                      "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
                      "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
                      "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
                      "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
                      "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
                      "tabs": [
                        {
                          "title": "Indices",
                          "symbols": [
                            {
                              "s": "AMEX:SPY",
                              "d": "S&P 500 ETF"
                            },
                            {
                              "s": "NASDAQ:QQQ",
                              "d": "Nasdaq 100 ETF"
                            },
                            {
                              "s": "AMEX:DIA",
                              "d": "Dow Jones ETF"
                            },
                            {
                              "s": "AMEX:IWM",
                              "d": "Russell 2000 ETF"
                            },
                            {
                              "s": "INDEX:DEU40",
                              "d": "DAX Index"
                            },
                            {
                              "s": "INDEX:NKY",
                              "d": "Nikkei 225"
                            }
                          ],
                          "originalTitle": "Indices"
                        },
                        {
                          "title": "Futures",
                          "symbols": [
                            {
                              "s": "CME_MINI:ES1!",
                              "d": "S&P 500 Futures"
                            },
                            {
                              "s": "CME:6E1!",
                              "d": "Euro Futures"
                            },
                            {
                              "s": "COMEX:GC1!",
                              "d": "Gold Futures"
                            },
                            {
                              "s": "NYMEX:CL1!",
                              "d": "Crude Oil Futures"
                            },
                            {
                              "s": "NYMEX:NG1!",
                              "d": "Natural Gas Futures"
                            },
                            {
                              "s": "CBOT:ZC1!",
                              "d": "Corn Futures"
                            }
                          ],
                          "originalTitle": "Futures"
                        },
                        {
                          "title": "Bonds",
                          "symbols": [
                            {
                              "s": "CME:GE1!",
                              "d": "Eurodollar"
                            },
                            {
                              "s": "CBOT:ZB1!",
                              "d": "T-Bond"
                            },
                            {
                              "s": "CBOT:UB1!",
                              "d": "Ultra T-Bond"
                            },
                            {
                              "s": "EUREX:FGBL1!",
                              "d": "Euro Bund"
                            },
                            {
                              "s": "EUREX:FBTP1!",
                              "d": "Euro BTP"
                            },
                            {
                              "s": "EUREX:FGBM1!",
                              "d": "Euro BOBL"
                            }
                          ],
                          "originalTitle": "Bonds"
                        },
                        {
                          "title": "Forex",
                          "symbols": [
                            {
                              "s": "FX:EURUSD",
                              "d": "EUR to USD"
                            },
                            {
                              "s": "FX:GBPUSD",
                              "d": "GBP to USD"
                            },
                            {
                              "s": "FX:USDJPY",
                              "d": "USD to JPY"
                            },
                            {
                              "s": "FX:USDCHF",
                              "d": "USD to CHF"
                            },
                            {
                              "s": "FX:AUDUSD",
                              "d": "AUD to USD"
                            },
                            {
                              "s": "FX:USDCAD",
                              "d": "USD to CAD"
                            }
                          ],
                          "originalTitle": "Forex"
                        }
                      ]
                    })
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

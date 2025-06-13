
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ActivePositions = () => {
  const positions = [
    {
      symbol: 'SPY',
      type: 'CALL',
      strike: '450',
      expiry: '2024-01-19',
      quantity: 5,
      avgPrice: 12.45,
      currentPrice: 14.20,
      pnl: 875.00,
      pnlPercent: 14.06
    },
    {
      symbol: 'QQQ',
      type: 'PUT',
      strike: '380',
      expiry: '2024-01-19',
      quantity: 3,
      avgPrice: 8.30,
      currentPrice: 6.75,
      pnl: -465.00,
      pnlPercent: -18.67
    },
    {
      symbol: 'AAPL',
      type: 'CALL',
      strike: '195',
      expiry: '2024-01-26',
      quantity: 10,
      avgPrice: 5.20,
      currentPrice: 7.80,
      pnl: 2600.00,
      pnlPercent: 50.00
    },
    {
      symbol: 'TSLA',
      type: 'PUT',
      strike: '240',
      expiry: '2024-01-19',
      quantity: 2,
      avgPrice: 15.60,
      currentPrice: 18.45,
      pnl: 570.00,
      pnlPercent: 18.27
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Strike/Expiry</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Avg Price</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{position.symbol}</TableCell>
                <TableCell>
                  <Badge variant={position.type === 'CALL' ? 'default' : 'secondary'}>
                    {position.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  <div>${position.strike}</div>
                  <div className="text-muted-foreground">{position.expiry}</div>
                </TableCell>
                <TableCell>{position.quantity}</TableCell>
                <TableCell>${position.avgPrice}</TableCell>
                <TableCell>${position.currentPrice}</TableCell>
                <TableCell className={position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                  ${position.pnl >= 0 ? '+' : ''}{position.pnl.toLocaleString()}
                </TableCell>
                <TableCell className={position.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

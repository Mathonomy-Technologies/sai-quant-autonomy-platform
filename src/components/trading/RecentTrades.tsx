
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const RecentTrades = () => {
  const trades = [
    {
      time: '14:25:30',
      symbol: 'SPY',
      action: 'BUY',
      type: 'CALL',
      strike: '450',
      expiry: '2024-01-19',
      quantity: 2,
      price: 14.20,
      status: 'FILLED'
    },
    {
      time: '13:45:15',
      symbol: 'QQQ',
      action: 'SELL',
      type: 'PUT',
      strike: '380',
      expiry: '2024-01-19',
      quantity: 1,
      price: 6.75,
      status: 'FILLED'
    },
    {
      time: '12:30:45',
      symbol: 'AAPL',
      action: 'BUY',
      type: 'CALL',
      strike: '195',
      expiry: '2024-01-26',
      quantity: 5,
      price: 7.80,
      status: 'FILLED'
    },
    {
      time: '11:15:20',
      symbol: 'MSFT',
      action: 'SELL',
      type: 'CALL',
      strike: '380',
      expiry: '2024-01-19',
      quantity: 3,
      price: 12.45,
      status: 'FILLED'
    },
    {
      time: '10:45:10',
      symbol: 'TSLA',
      action: 'BUY',
      type: 'PUT',
      strike: '240',
      expiry: '2024-01-19',
      quantity: 1,
      price: 18.45,
      status: 'PENDING'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Strike/Expiry</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade, index) => (
              <TableRow key={index}>
                <TableCell className="text-sm font-mono">{trade.time}</TableCell>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>
                  <Badge variant={trade.action === 'BUY' ? 'default' : 'destructive'}>
                    {trade.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={trade.type === 'CALL' ? 'default' : 'secondary'}>
                    {trade.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  <div>${trade.strike}</div>
                  <div className="text-muted-foreground">{trade.expiry}</div>
                </TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>${trade.price}</TableCell>
                <TableCell>
                  <Badge variant={trade.status === 'FILLED' ? 'outline' : 'secondary'}>
                    {trade.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

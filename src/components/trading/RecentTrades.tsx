
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
      exitPrice: 16.85,
      pnl: 530.00,
      commission: 2.10,
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
      exitPrice: 4.20,
      pnl: 255.00,
      commission: 1.05,
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
      exitPrice: 9.15,
      pnl: 675.00,
      commission: 5.25,
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
      exitPrice: 8.90,
      pnl: 1065.00,
      commission: 3.15,
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
      exitPrice: null,
      pnl: null,
      commission: 1.05,
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
              <TableHead>Entry Price</TableHead>
              <TableHead>Exit Price</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>Commission</TableHead>
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
                  {trade.exitPrice ? `$${trade.exitPrice}` : '-'}
                </TableCell>
                <TableCell>
                  {trade.pnl !== null ? (
                    <span className={trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                      ${trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString()}
                    </span>
                  ) : '-'}
                </TableCell>
                <TableCell className="text-red-500">
                  ${trade.commission}
                </TableCell>
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


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BrokerAccount {
  id: string;
  broker_name: string;
  account_id: string;
  is_active: boolean;
  is_paper_trading: boolean;
  balance: number;
  created_at: string;
}

export const BrokerAccountManager = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<BrokerAccount[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAccount, setNewAccount] = useState({
    broker_name: '',
    account_id: '',
    api_key: '',
    api_secret: '',
    is_paper_trading: true,
  });

  const brokerOptions = [
    { value: 'alpaca', label: 'Alpaca' },
    { value: 'interactive_brokers', label: 'Interactive Brokers' },
    { value: 'td_ameritrade', label: 'TD Ameritrade' },
    { value: 'schwab', label: 'Charles Schwab' },
  ];

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('broker_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (err) {
      console.error('Error fetching broker accounts:', err);
      setError('Failed to load broker accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!user || !newAccount.broker_name || !newAccount.account_id) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('broker_accounts')
        .insert({
          user_id: user.id,
          broker_name: newAccount.broker_name,
          account_id: newAccount.account_id,
          api_key_encrypted: newAccount.api_key, // In production, encrypt this
          api_secret_encrypted: newAccount.api_secret, // In production, encrypt this
          is_paper_trading: newAccount.is_paper_trading,
        });

      if (error) throw error;

      setNewAccount({
        broker_name: '',
        account_id: '',
        api_key: '',
        api_secret: '',
        is_paper_trading: true,
      });
      setIsCreating(false);
      fetchAccounts();
    } catch (err) {
      console.error('Error creating broker account:', err);
      setError('Failed to create broker account');
    }
  };

  const toggleAccountStatus = async (accountId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('broker_accounts')
        .update({ is_active: !isActive })
        .eq('id', accountId);

      if (error) throw error;
      fetchAccounts();
    } catch (err) {
      console.error('Error updating account status:', err);
      setError('Failed to update account status');
    }
  };

  const deleteAccount = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('broker_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;
      fetchAccounts();
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('Failed to delete account');
    }
  };

  if (loading) {
    return <div>Loading broker accounts...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Broker Accounts</span>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              Connect Broker
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isCreating && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Connect New Broker Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="broker">Broker</Label>
                    <Select value={newAccount.broker_name} onValueChange={(value) => setNewAccount({...newAccount, broker_name: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select broker" />
                      </SelectTrigger>
                      <SelectContent>
                        {brokerOptions.map((broker) => (
                          <SelectItem key={broker.value} value={broker.value}>
                            {broker.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-id">Account ID</Label>
                    <Input
                      id="account-id"
                      placeholder="Enter account ID"
                      value={newAccount.account_id}
                      onChange={(e) => setNewAccount({...newAccount, account_id: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter API key"
                      value={newAccount.api_key}
                      onChange={(e) => setNewAccount({...newAccount, api_key: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-secret">API Secret</Label>
                    <Input
                      id="api-secret"
                      type="password"
                      placeholder="Enter API secret"
                      value={newAccount.api_secret}
                      onChange={(e) => setNewAccount({...newAccount, api_secret: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="paper-trading"
                    checked={newAccount.is_paper_trading}
                    onCheckedChange={(checked) => setNewAccount({...newAccount, is_paper_trading: checked})}
                  />
                  <Label htmlFor="paper-trading">Paper Trading Mode</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreateAccount}>
                    Connect Account
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {accounts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No broker accounts connected. Connect your first broker to start trading.
              </div>
            ) : (
              accounts.map((account) => (
                <Card key={account.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold capitalize">
                            {account.broker_name.replace('_', ' ')}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Account: {account.account_id}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={account.is_active ? "default" : "secondary"}>
                            {account.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant={account.is_paper_trading ? "outline" : "destructive"}>
                            {account.is_paper_trading ? "Paper" : "Live"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={account.is_active}
                          onCheckedChange={() => toggleAccountStatus(account.id, account.is_active)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAccount(account.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {account.balance > 0 && (
                      <div className="mt-2 text-sm">
                        Balance: ${account.balance.toLocaleString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

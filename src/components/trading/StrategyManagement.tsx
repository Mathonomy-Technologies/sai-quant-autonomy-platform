
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Play, Pause, Settings, Code, DollarSign, Clock, Save, Edit, Trash2, Plus, History } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Strategy {
  id: string;
  name: string;
  pine_script: string;
  is_active: boolean;
  max_amount: number;
  timeframe: string;
  duration: string;
  version: number;
  created_at: string;
  user_id: string;
}

interface StrategyParameter {
  id: string;
  strategy_id: string;
  param_name: string;
  param_value: string;
  param_type: string;
  description: string;
}

export const StrategyManagement = () => {
  const { user } = useAuth();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [strategyParameters, setStrategyParameters] = useState<StrategyParameter[]>([]);
  const [activeTab, setActiveTab] = useState("strategies");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newStrategy, setNewStrategy] = useState({
    name: '',
    pine_script: '',
    max_amount: 5000,
    timeframe: '1h',
    duration: '1_day'
  });

  const [newParameter, setNewParameter] = useState({
    param_name: '',
    param_value: '',
    param_type: 'string',
    description: ''
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

  const parameterTypes = [
    { value: 'string', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'True/False' },
    { value: 'percentage', label: 'Percentage' }
  ];

  useEffect(() => {
    if (user) {
      fetchStrategies();
    }
  }, [user]);

  useEffect(() => {
    if (selectedStrategy) {
      fetchStrategyParameters(selectedStrategy.id);
    }
  }, [selectedStrategy]);

  const fetchStrategies = async () => {
    try {
      const { data, error } = await supabase
        .from('strategies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStrategies(data || []);
    } catch (err) {
      console.error('Error fetching strategies:', err);
      setError('Failed to load strategies');
    } finally {
      setLoading(false);
    }
  };

  const fetchStrategyParameters = async (strategyId: string) => {
    try {
      const { data, error } = await supabase
        .from('strategy_parameters')
        .select('*')
        .eq('strategy_id', strategyId);

      if (error) throw error;
      setStrategyParameters(data || []);
    } catch (err) {
      console.error('Error fetching strategy parameters:', err);
    }
  };

  const handleCreateStrategy = async () => {
    if (!user || !newStrategy.name || !newStrategy.pine_script) return;

    try {
      setError(null);
      const { data, error } = await supabase
        .from('strategies')
        .insert({
          user_id: user.id,
          name: newStrategy.name,
          pine_script: newStrategy.pine_script,
          max_amount: newStrategy.max_amount,
          timeframe: newStrategy.timeframe,
          duration: newStrategy.duration,
          version: 1
        })
        .select()
        .single();

      if (error) throw error;

      setNewStrategy({
        name: '',
        pine_script: '',
        max_amount: 5000,
        timeframe: '1h',
        duration: '1_day'
      });
      setIsCreating(false);
      setActiveTab("strategies");
      fetchStrategies();
      console.log('Strategy created:', data);
    } catch (err) {
      console.error('Error creating strategy:', err);
      setError('Failed to create strategy');
    }
  };

  const toggleStrategyActive = async (strategyId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('strategies')
        .update({ is_active: !isActive })
        .eq('id', strategyId);

      if (error) throw error;
      fetchStrategies();
      console.log(`Strategy ${strategyId} toggled`);
    } catch (err) {
      console.error('Error toggling strategy:', err);
      setError('Failed to update strategy');
    }
  };

  const deleteStrategy = async (strategyId: string) => {
    try {
      const { error } = await supabase
        .from('strategies')
        .delete()
        .eq('id', strategyId);

      if (error) throw error;
      fetchStrategies();
      console.log(`Strategy ${strategyId} deleted`);
    } catch (err) {
      console.error('Error deleting strategy:', err);
      setError('Failed to delete strategy');
    }
  };

  const createNewVersion = async (strategy: Strategy) => {
    try {
      const { error } = await supabase
        .from('strategies')
        .insert({
          user_id: strategy.user_id,
          name: strategy.name,
          pine_script: strategy.pine_script,
          max_amount: strategy.max_amount,
          timeframe: strategy.timeframe,
          duration: strategy.duration,
          version: strategy.version + 1,
          is_active: false
        });

      if (error) throw error;
      fetchStrategies();
    } catch (err) {
      console.error('Error creating strategy version:', err);
      setError('Failed to create new version');
    }
  };

  const addParameter = async () => {
    if (!selectedStrategy || !newParameter.param_name || !newParameter.param_value) return;

    try {
      const { error } = await supabase
        .from('strategy_parameters')
        .insert({
          strategy_id: selectedStrategy.id,
          param_name: newParameter.param_name,
          param_value: newParameter.param_value,
          param_type: newParameter.param_type,
          description: newParameter.description
        });

      if (error) throw error;

      setNewParameter({
        param_name: '',
        param_value: '',
        param_type: 'string',
        description: ''
      });
      fetchStrategyParameters(selectedStrategy.id);
    } catch (err) {
      console.error('Error adding parameter:', err);
      setError('Failed to add parameter');
    }
  };

  const deleteParameter = async (parameterId: string) => {
    try {
      const { error } = await supabase
        .from('strategy_parameters')
        .delete()
        .eq('id', parameterId);

      if (error) throw error;
      if (selectedStrategy) {
        fetchStrategyParameters(selectedStrategy.id);
      }
    } catch (err) {
      console.error('Error deleting parameter:', err);
      setError('Failed to delete parameter');
    }
  };

  if (loading) {
    return <div>Loading strategies...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Strategy Management
            </span>
            <Button onClick={() => {setIsCreating(true); setActiveTab("create");}}>
              <Save className="h-4 w-4 mr-2" />
              Create New Strategy
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategies">My Strategies</TabsTrigger>
              <TabsTrigger value="create">Create Strategy</TabsTrigger>
              <TabsTrigger value="parameters">Parameters</TabsTrigger>
            </TabsList>

            <TabsContent value="strategies" className="mt-6">
              <div className="space-y-4">
                {strategies.map((strategy) => (
                  <Card key={strategy.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{strategy.name}</h3>
                          <Badge variant={strategy.is_active ? "default" : "secondary"}>
                            {strategy.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">v{strategy.version}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => createNewVersion(strategy)}
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {setSelectedStrategy(strategy); setActiveTab("parameters");}}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Switch
                            checked={strategy.is_active}
                            onCheckedChange={() => toggleStrategyActive(strategy.id, strategy.is_active)}
                          />
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
                          <div className="font-medium">${strategy.max_amount.toLocaleString()}</div>
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
                          <span className="text-muted-foreground">Created:</span>
                          <div className="font-medium">
                            {new Date(strategy.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-6">
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
                        value={newStrategy.max_amount}
                        onChange={(e) => setNewStrategy({...newStrategy, max_amount: Number(e.target.value)})}
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
                      value={newStrategy.pine_script}
                      onChange={(e) => setNewStrategy({...newStrategy, pine_script: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleCreateStrategy} disabled={!newStrategy.name || !newStrategy.pine_script}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Strategy
                  </Button>
                  <Button variant="outline" onClick={() => {setIsCreating(false); setActiveTab("strategies");}}>
                    Cancel
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="parameters" className="mt-6">
              {selectedStrategy ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Parameters for {selectedStrategy.name}</h3>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Add New Parameter</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Parameter Name</Label>
                          <Input
                            placeholder="e.g., stop_loss_percent"
                            value={newParameter.param_name}
                            onChange={(e) => setNewParameter({...newParameter, param_name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Parameter Type</Label>
                          <Select value={newParameter.param_type} onValueChange={(value) => setNewParameter({...newParameter, param_type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {parameterTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Value</Label>
                          <Input
                            placeholder="Parameter value"
                            value={newParameter.param_value}
                            onChange={(e) => setNewParameter({...newParameter, param_value: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            placeholder="Optional description"
                            value={newParameter.description}
                            onChange={(e) => setNewParameter({...newParameter, description: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button onClick={addParameter} disabled={!newParameter.param_name || !newParameter.param_value}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Parameter
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    {strategyParameters.map((param) => (
                      <Card key={param.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{param.param_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Type: {param.param_type} | Value: {param.param_value}
                              </p>
                              {param.description && (
                                <p className="text-xs text-muted-foreground mt-1">{param.description}</p>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteParameter(param.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a strategy from the "My Strategies" tab to manage its parameters.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

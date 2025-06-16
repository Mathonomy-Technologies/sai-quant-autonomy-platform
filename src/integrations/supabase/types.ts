export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      broker_accounts: {
        Row: {
          account_id: string | null
          api_key_encrypted: string | null
          api_secret_encrypted: string | null
          balance: number | null
          broker_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          is_paper_trading: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id?: string | null
          api_key_encrypted?: string | null
          api_secret_encrypted?: string | null
          balance?: number | null
          broker_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_paper_trading?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string | null
          api_key_encrypted?: string | null
          api_secret_encrypted?: string | null
          balance?: number | null
          broker_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_paper_trading?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          average_loss: number | null
          average_win: number | null
          id: string
          largest_loss: number | null
          largest_win: number | null
          losing_trades: number | null
          profit_factor: number | null
          strategy_id: string | null
          total_commissions: number | null
          total_pnl: number | null
          total_trades: number | null
          updated_at: string | null
          user_id: string
          win_rate: number | null
          winning_trades: number | null
        }
        Insert: {
          average_loss?: number | null
          average_win?: number | null
          id?: string
          largest_loss?: number | null
          largest_win?: number | null
          losing_trades?: number | null
          profit_factor?: number | null
          strategy_id?: string | null
          total_commissions?: number | null
          total_pnl?: number | null
          total_trades?: number | null
          updated_at?: string | null
          user_id: string
          win_rate?: number | null
          winning_trades?: number | null
        }
        Update: {
          average_loss?: number | null
          average_win?: number | null
          id?: string
          largest_loss?: number | null
          largest_win?: number | null
          losing_trades?: number | null
          profit_factor?: number | null
          strategy_id?: string | null
          total_commissions?: number | null
          total_pnl?: number | null
          total_trades?: number | null
          updated_at?: string | null
          user_id?: string
          win_rate?: number | null
          winning_trades?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      strategies: {
        Row: {
          created_at: string | null
          duration: string | null
          id: string
          is_active: boolean | null
          max_amount: number | null
          name: string
          pine_script: string
          timeframe: string | null
          updated_at: string | null
          user_id: string
          version: number | null
        }
        Insert: {
          created_at?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          max_amount?: number | null
          name: string
          pine_script: string
          timeframe?: string | null
          updated_at?: string | null
          user_id: string
          version?: number | null
        }
        Update: {
          created_at?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          max_amount?: number | null
          name?: string
          pine_script?: string
          timeframe?: string | null
          updated_at?: string | null
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      strategy_parameters: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          param_name: string
          param_type: string | null
          param_value: string
          strategy_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          param_name: string
          param_type?: string | null
          param_value: string
          strategy_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          param_name?: string
          param_type?: string | null
          param_value?: string
          strategy_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_parameters_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_logs: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          message: string | null
          metadata: Json | null
          trade_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          message?: string | null
          metadata?: Json | null
          trade_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          trade_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trade_logs_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          commission: number | null
          created_at: string | null
          entry_price: number
          exit_price: number | null
          expiry: string | null
          id: string
          notes: string | null
          pnl: number | null
          quantity: number
          side: string
          status: string | null
          strategy_id: string | null
          strike: number | null
          symbol: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          commission?: number | null
          created_at?: string | null
          entry_price: number
          exit_price?: number | null
          expiry?: string | null
          id?: string
          notes?: string | null
          pnl?: number | null
          quantity: number
          side: string
          status?: string | null
          strategy_id?: string | null
          strike?: number | null
          symbol: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          commission?: number | null
          created_at?: string | null
          entry_price?: number
          exit_price?: number | null
          expiry?: string | null
          id?: string
          notes?: string | null
          pnl?: number | null
          quantity?: number
          side?: string
          status?: string | null
          strategy_id?: string | null
          strike?: number | null
          symbol?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

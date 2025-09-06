export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          address: string | null
          business_name: string
          business_type: string
          cashback_percentage: number | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          phone: string | null
          referral_level_1_percentage: number | null
          referral_level_2_percentage: number | null
          referral_level_3_percentage: number | null
          subscription_plan: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type: string
          cashback_percentage?: number | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          phone?: string | null
          referral_level_1_percentage?: number | null
          referral_level_2_percentage?: number | null
          referral_level_3_percentage?: number | null
          subscription_plan?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string
          cashback_percentage?: number | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          phone?: string | null
          referral_level_1_percentage?: number | null
          referral_level_2_percentage?: number | null
          referral_level_3_percentage?: number | null
          subscription_plan?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      customer_balances: {
        Row: {
          available_balance: number | null
          business_id: string
          created_at: string
          customer_id: string
          id: string
          total_earned: number | null
          total_redeemed: number | null
          updated_at: string
        }
        Insert: {
          available_balance?: number | null
          business_id: string
          created_at?: string
          customer_id: string
          id?: string
          total_earned?: number | null
          total_redeemed?: number | null
          updated_at?: string
        }
        Update: {
          available_balance?: number | null
          business_id?: string
          created_at?: string
          customer_id?: string
          id?: string
          total_earned?: number | null
          total_redeemed?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_balances_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_balances_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_balances_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          referral_code: string
          referred_by_code: string | null
          referred_by_customer_id: string | null
          total_cashback_earned: number | null
          total_referral_earnings: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          referral_code: string
          referred_by_code?: string | null
          referred_by_customer_id?: string | null
          total_cashback_earned?: number | null
          total_referral_earnings?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          referral_code?: string
          referred_by_code?: string | null
          referred_by_customer_id?: string | null
          total_cashback_earned?: number | null
          total_referral_earnings?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_referred_by_customer_id_fkey"
            columns: ["referred_by_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_earnings: {
        Row: {
          amount: number
          business_id: string
          created_at: string
          id: string
          level: Database["public"]["Enums"]["referral_level"]
          percentage: number
          referred_customer_id: string
          referrer_customer_id: string
          transaction_id: string
        }
        Insert: {
          amount: number
          business_id: string
          created_at?: string
          id?: string
          level: Database["public"]["Enums"]["referral_level"]
          percentage: number
          referred_customer_id: string
          referrer_customer_id: string
          transaction_id: string
        }
        Update: {
          amount?: number
          business_id?: string
          created_at?: string
          id?: string
          level?: Database["public"]["Enums"]["referral_level"]
          percentage?: number
          referred_customer_id?: string
          referrer_customer_id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_earnings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_earnings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_earnings_referred_customer_id_fkey"
            columns: ["referred_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_earnings_referrer_customer_id_fkey"
            columns: ["referrer_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_earnings_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          business_id: string
          cashback_amount: number
          cashback_percentage: number
          created_at: string
          customer_id: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          transaction_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          business_id: string
          cashback_amount?: number
          cashback_percentage: number
          created_at?: string
          customer_id: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_type?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          business_id?: string
          cashback_amount?: number
          cashback_percentage?: number
          created_at?: string
          customer_id?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
    }
    Views: {
      businesses_public: {
        Row: {
          business_name: string | null
          business_type: string | null
          created_at: string | null
          description: string | null
          id: string | null
          is_active: boolean | null
          logo_url: string | null
        }
        Insert: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          is_active?: boolean | null
          logo_url?: string | null
        }
        Update: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          is_active?: boolean | null
          logo_url?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      referral_level: "level_1" | "level_2" | "level_3"
      transaction_status: "pending" | "completed" | "cancelled"
      user_type: "customer" | "business"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      referral_level: ["level_1", "level_2", "level_3"],
      transaction_status: ["pending", "completed", "cancelled"],
      user_type: ["customer", "business"],
    },
  },
} as const

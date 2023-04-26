import { PostgrestSingleResponse } from "@supabase/supabase-js";
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      text_completions: {
        Row: {
          completion: string | null;
          created_at: string | null;
          id: string;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          completion?: string | null;
          created_at?: string | null;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          completion?: string | null;
          created_at?: string | null;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type TextCompletionsType = PostgrestSingleResponse<
  {
    completion: string | null;
    created_at: string | null;
    id: number;
    title: string | null;
  }[]
>;

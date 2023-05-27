/* eslint-disable no-unused-vars */

import { PostgrestSingleResponse } from '@supabase/supabase-js'
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      text_completions: {
        Row: {
          completion: string | null
          created_at: string | null
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          completion?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          completion?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
      }
      image_generations: {
        Row: {
          image_url: string | null
          created_at: string | null
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          image_url?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          image_url?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
      }
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

export type TextCompletionsType = PostgrestSingleResponse<
  {
    completion: string | null
    created_at: string | null
    id: number
    title: string | null
  }[]
>

export type ImageGenerationsType = PostgrestSingleResponse<
  {
    image_url: string | null
    created_at: string | null
    id: number
    title: string | null
  }[]
>

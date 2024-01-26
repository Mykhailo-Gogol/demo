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
      completions: {
        Row: {
          completion: string | null
          completion_slug: string | null
          id: number
          inserted_at: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completion?: string | null
          completion_slug?: string | null
          id?: number
          inserted_at?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completion?: string | null
          completion_slug?: string | null
          id?: number
          inserted_at?: string
          title?: string | null
          updated_at?: string
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

export type TextCompletionsType = {
  completion: string | null
  completion_slug: string | null
  id: number
  inserted_at: string
  title: string | null
  updated_at: string
  user_id: string | null
}[]

export type ImageGenerationsType = PostgrestSingleResponse<
  {
    image_url: string | null
    created_at: string | null
    id: number
    title: string | null
  }[]
>

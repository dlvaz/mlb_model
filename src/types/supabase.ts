export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      mlb_model_output: {
        Row: {
          game_id: number
          home_team: string
          away_team: string
          game_date: string
          home_pitcher: string
          away_pitcher: string
          home_pitcher_era: number
          away_pitcher_era: number
          home_team_runs_per_game: number
          away_team_runs_per_game: number
          home_team_odds: number
          away_team_odds: number
          predicted_home_team_win_probability: number
          predicted_away_team_win_probability: number
          expected_value: number
          recommended_bet: string
          bet_amount: number
          is_published: boolean
          created_at: string
          updated_at: string
          is_top_pick: boolean
        }
        Insert: {
          game_id: number
          home_team: string
          away_team: string
          game_date: string
          home_pitcher: string
          away_pitcher: string
          home_pitcher_era: number
          away_pitcher_era: number
          home_team_runs_per_game: number
          away_team_runs_per_game: number
          home_team_odds: number
          away_team_odds: number
          predicted_home_team_win_probability: number
          predicted_away_team_win_probability: number
          expected_value: number
          recommended_bet: string
          bet_amount: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
          is_top_pick?: boolean
        }
        Update: {
          game_id?: number
          home_team?: string
          away_team?: string
          game_date?: string
          home_pitcher?: string
          away_pitcher?: string
          home_pitcher_era?: number
          away_pitcher_era?: number
          home_team_runs_per_game?: number
          away_team_runs_per_game?: number
          home_team_odds?: number
          away_team_odds?: number
          predicted_home_team_win_probability?: number
          predicted_away_team_win_probability?: number
          expected_value?: number
          recommended_bet?: string
          bet_amount?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
          is_top_pick?: boolean
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
  }
} 
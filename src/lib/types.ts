export interface Game {
  game_id: string
  game_date: string
  home_team: string
  away_team: string
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
} 
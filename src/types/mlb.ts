export interface MLBGame {
  game_id: number;
  home_team: string;
  away_team: string;
  home_team_id: number;
  away_team_id: number;
  home_pitcher: string;
  away_pitcher: string;
  home_pitcher_id: number;
  away_pitcher_id: number;
  home_pitcher_era: number;
  home_pitcher_fip: number;
  home_pitcher_whip: number;
  away_pitcher_era: number;
  away_pitcher_fip: number;
  away_pitcher_whip: number;
  offense_ops_home: number;
  offense_ops_away: number;
  bullpen_era_home: number;
  bullpen_whip_home: number;
  bullpen_era_away: number;
  bullpen_whip_away: number;
  moneyline_home: number;
  moneyline_away: number;
  ev_home: number;
  ev_away: number;
  model_win_prob_home: number;
  model_win_prob_away: number;
  model_certainty: number;
  best_bet: string;
  best_bet_odds: number;
  best_bet_ev: number;
  top_pick: boolean;
  published: boolean;
  reviewed: boolean;
  published_at: string | null;
  as_of: string;
  created_at: string;
}

export interface TeamStats {
  teamName: string;
  pitcher: {
    name: string;
    era: number;
    fip: number;
    whip: number;
  };
  offense: {
    ops: number;
  };
  bullpen: {
    era: number;
    whip: number;
  };
  odds: {
    moneyline: number;
    ev: number;
    winProb: number;
  };
}

export interface GameComparison {
  id: number;
  home: {
    teamName: string;
    pitcher: {
      name: string;
      era: number;
      fip: number;
      whip: number;
    };
    offense: {
      ops: number;
    };
    bullpen: {
      era: number;
      whip: number;
    };
    odds: {
      winProb: number;
      moneyline: number;
    };
  };
  away: {
    teamName: string;
    pitcher: {
      name: string;
      era: number;
      fip: number;
      whip: number;
    };
    offense: {
      ops: number;
    };
    bullpen: {
      era: number;
      whip: number;
    };
    odds: {
      winProb: number;
      moneyline: number;
    };
  };
  bestBet: {
    team: 'home' | 'away';
    odds: number;
    ev: number;
  };
  modelCertainty: number;
  isTopPick: boolean;
  asOf: string;
} 
import { MLBGame, GameComparison, TeamStats } from '@/types/mlb'

export function transformGameData(game: any): GameComparison {
  console.log('Transforming game data:', game)
  try {
    const transformed = {
      id: game.game_id,
      home: {
        teamName: game.home_team || '',
        pitcher: {
          name: game.home_pitcher || '',
          era: game.home_pitcher_era || 0,
          fip: game.home_pitcher_fip || 0,
          whip: game.home_pitcher_whip || 0,
        },
        offense: {
          ops: game.offense_ops_home || 0,
        },
        bullpen: {
          era: game.bullpen_era_home || 0,
          whip: game.bullpen_whip_home || 0,
        },
        odds: {
          winProb: game.model_win_prob_home || 0,
          moneyline: game.moneyline_home || 0,
        },
      },
      away: {
        teamName: game.away_team || '',
        pitcher: {
          name: game.away_pitcher || '',
          era: game.away_pitcher_era || 0,
          fip: game.away_pitcher_fip || 0,
          whip: game.away_pitcher_whip || 0,
        },
        offense: {
          ops: game.offense_ops_away || 0,
        },
        bullpen: {
          era: game.bullpen_era_away || 0,
          whip: game.bullpen_whip_away || 0,
        },
        odds: {
          winProb: game.model_win_prob_away || 0,
          moneyline: game.moneyline_away || 0,
        },
      },
      bestBet: {
        team: (game.best_bet === game.home_team ? 'home' : 'away') as 'home' | 'away',
        odds: game.best_bet_odds || 0,
        ev: game.best_bet_ev || 0,
      },
      modelCertainty: game.model_certainty || 0,
      isTopPick: game.top_pick || false,
      asOf: game.as_of || new Date().toISOString(),
    }
    console.log('Successfully transformed game data')
    return transformed
  } catch (error) {
    console.error('Error transforming game data:', error)
    throw error
  }
}

export function formatOdds(odds: number | null | undefined): string {
  if (odds == null) return '0'
  if (odds > 0) return `+${odds}`
  return odds.toString()
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return '0%'
  // Check if the value is already in percentage form (> 1)
  const percentValue = value > 1 ? value : value * 100
  return `${percentValue.toFixed(1)}%`
}

export function formatDecimal(value: number | null | undefined): string {
  if (value == null) return '0.000'
  return value.toFixed(3)
}

export function getStatComparison(a: number | null | undefined, b: number | null | undefined): 'better' | 'worse' | 'neutral' {
  if (a == null || b == null) return 'neutral'
  const threshold = 0.1 // 10% difference threshold
  const diff = Math.abs(a - b) / ((a + b) / 2)
  
  if (diff < threshold) return 'neutral'
  return a < b ? 'better' : 'worse'
} 
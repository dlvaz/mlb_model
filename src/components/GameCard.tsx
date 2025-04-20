import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Game } from "@/lib/types"
import { formatCurrency, formatDate, formatPercentage, formatOdds } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface GameCardProps {
  game: Game
  showAdminControls?: boolean
  onTogglePublish?: (gameId: string) => void
}

export function GameCard({ game, showAdminControls = false, onTogglePublish }: GameCardProps) {
  const isPositiveEV = game.expected_value > 0

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {game.away_team} @ {game.home_team}
          </CardTitle>
          <Badge variant={isPositiveEV ? "default" : "destructive"}>
            EV: {formatCurrency(game.expected_value)}
          </Badge>
        </div>
        <CardDescription>{formatDate(game.game_date)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Pitchers</h4>
              <p className="text-sm text-muted-foreground">
                {game.away_pitcher} ({game.away_pitcher_era} ERA) vs<br />
                {game.home_pitcher} ({game.home_pitcher_era} ERA)
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Team Stats</h4>
              <p className="text-sm text-muted-foreground">
                {game.away_team}: {game.away_team_runs_per_game} R/G<br />
                {game.home_team}: {game.home_team_runs_per_game} R/G
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-1">Model Prediction</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Away Win: {formatPercentage(game.predicted_away_team_win_probability)}</p>
                <p className="text-muted-foreground">Odds: {formatOdds(game.away_team_odds)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Home Win: {formatPercentage(game.predicted_home_team_win_probability)}</p>
                <p className="text-muted-foreground">Odds: {formatOdds(game.home_team_odds)}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-1">Recommended Bet</h4>
            <p className="text-sm text-muted-foreground">
              {game.recommended_bet} - {formatCurrency(game.bet_amount)}
            </p>
          </div>

          {showAdminControls && onTogglePublish && (
            <button
              onClick={() => onTogglePublish(game.game_id)}
              className="w-full px-4 py-2 text-sm font-medium text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {game.is_published ? "Unpublish" : "Publish"}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 
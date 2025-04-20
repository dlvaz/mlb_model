'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GameComparison } from '@/types/mlb'
import { formatDecimal, formatOdds, formatPercent, getStatComparison } from '@/lib/transforms'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Check, ChevronDown, ChevronUp, TrendingDown, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { formatTimeEST } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface StatRowProps {
  label: string
  homeValue: number
  awayValue: number
  format?: (value: number) => string
  lowerIsBetter?: boolean
}

function StatRow({ label, homeValue, awayValue, format = formatDecimal, lowerIsBetter = false }: StatRowProps) {
  const homeComparison = getStatComparison(
    lowerIsBetter ? homeValue : -homeValue,
    lowerIsBetter ? awayValue : -awayValue
  )
  const awayComparison = getStatComparison(
    lowerIsBetter ? awayValue : -awayValue,
    lowerIsBetter ? homeValue : -homeValue
  )

  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-2 text-xs font-mono">
      <div className={cn(
        'text-right tabular-nums',
        homeComparison === 'better' && 'text-green-500',
        homeComparison === 'worse' && 'text-red-500'
      )}>
        {format(homeValue)}
      </div>
      <div className="text-center text-muted-foreground">{label}</div>
      <div className={cn(
        'text-left tabular-nums',
        awayComparison === 'better' && 'text-green-500',
        awayComparison === 'worse' && 'text-red-500'
      )}>
        {format(awayValue)}
      </div>
    </div>
  )
}

interface GameCardProps {
  game: GameComparison
  showPublishControls?: boolean
  showAsOf?: boolean
  index?: number
  onPublish?: (gameId: number) => Promise<void>
}

export function GameCard({ game, showPublishControls = false, showAsOf = true, index = 0, onPublish }: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const isBestBetHome = game.bestBet.team === 'home'
  const isPositiveEV = game.bestBet.ev >= 0

  const handlePublish = async () => {
    if (onPublish) {
      try {
        await onPublish(game.id)
        toast.success('Game published successfully')
      } catch (error) {
        toast.error('Failed to publish game')
        console.error('Error publishing game:', error)
      }
    }
  }

  return (
    <Card 
      className={cn(
        "w-full hover:shadow-lg transition-all duration-300",
        "backdrop-blur-sm supports-[backdrop-filter]:bg-card/50",
        "border border-border/50",
        "rounded-lg overflow-hidden"
      )}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {game.isTopPick && (
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                TOP
              </Badge>
            )}
            <Badge
              variant="outline"
              className={cn(
                'font-mono',
                isPositiveEV ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
              )}
            >
              {isPositiveEV ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              EV: {game.bestBet.ev >= 0 ? '+' : ''}{formatPercent(game.bestBet.ev)}
            </Badge>
          </div>
          <Badge variant="outline" className="font-mono">
            {formatOdds(game.bestBet.odds)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4">
        {/* Teams Section */}
        <div className="space-y-2">
          <div className={cn(
            "flex justify-between font-mono p-2 rounded-md",
            isBestBetHome && "bg-green-500/5 border border-green-500/20"
          )}>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-6 flex items-center">
                  {isBestBetHome && <Check className="w-4 h-4 text-green-500" />}
                </div>
                <span className={cn("text-sm", isBestBetHome && "font-bold")}>
                  {game.home.teamName}
                </span>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                {game.home.pitcher.name}
              </div>
            </div>
            <div className="text-sm text-muted-foreground tabular-nums self-start">
              {formatPercent(game.home.odds.winProb)}
            </div>
          </div>
          <div className={cn(
            "flex justify-between font-mono p-2 rounded-md",
            !isBestBetHome && "bg-green-500/5 border border-green-500/20"
          )}>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-6 flex items-center">
                  {!isBestBetHome && <Check className="w-4 h-4 text-green-500" />}
                </div>
                <span className={cn("text-sm", !isBestBetHome && "font-bold")}>
                  {game.away.teamName}
                </span>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                {game.away.pitcher.name}
              </div>
            </div>
            <div className="text-sm text-muted-foreground tabular-nums self-start">
              {formatPercent(game.away.odds.winProb)}
            </div>
          </div>
        </div>

        {/* Stats Sections */}
        <div className="space-y-4">
          <div>
            <div className="text-xs text-muted-foreground mb-2">Pitcher Stats</div>
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 text-xs font-mono mb-1">
              <div className="text-right text-muted-foreground">{game.home.teamName}</div>
              <div />
              <div className="text-left text-muted-foreground">{game.away.teamName}</div>
            </div>
            <StatRow label="ERA" homeValue={game.home.pitcher.era} awayValue={game.away.pitcher.era} lowerIsBetter />
            <StatRow label="FIP" homeValue={game.home.pitcher.fip} awayValue={game.away.pitcher.fip} lowerIsBetter />
            <StatRow label="WHIP" homeValue={game.home.pitcher.whip} awayValue={game.away.pitcher.whip} lowerIsBetter />
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Team Stats</div>
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 text-xs font-mono mb-1">
              <div className="text-right text-muted-foreground">{game.home.teamName}</div>
              <div />
              <div className="text-left text-muted-foreground">{game.away.teamName}</div>
            </div>
            <StatRow label="OPS" homeValue={game.home.offense.ops} awayValue={game.away.offense.ops} />
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Bullpen Stats</div>
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 text-xs font-mono mb-1">
              <div className="text-right text-muted-foreground">{game.home.teamName}</div>
              <div />
              <div className="text-left text-muted-foreground">{game.away.teamName}</div>
            </div>
            <StatRow label="ERA" homeValue={game.home.bullpen.era} awayValue={game.away.bullpen.era} lowerIsBetter />
            <StatRow label="WHIP" homeValue={game.home.bullpen.whip} awayValue={game.away.bullpen.whip} lowerIsBetter />
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Odds</div>
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 text-xs font-mono mb-1">
              <div className="text-right text-muted-foreground">{game.home.teamName}</div>
              <div />
              <div className="text-left text-muted-foreground">{game.away.teamName}</div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr,auto,1fr] gap-2 text-xs font-mono">
                <div className={cn(
                  'text-right tabular-nums flex items-center justify-end gap-1',
                  isBestBetHome && 'text-green-500 font-medium'
                )}>
                  {isBestBetHome && <Check className="w-3 h-3" />}
                  {formatOdds(game.home.odds.moneyline)}
                </div>
                <div className="text-center text-muted-foreground">ML</div>
                <div className={cn(
                  'text-left tabular-nums flex items-center gap-1',
                  !isBestBetHome && 'text-green-500 font-medium'
                )}>
                  {!isBestBetHome && <Check className="w-3 h-3" />}
                  {formatOdds(game.away.odds.moneyline)}
                </div>
              </div>
              <div className={cn(
                "mt-2 text-xs font-bold text-center p-1.5 rounded-md border",
                "bg-green-500/5 border-green-500/20 text-green-500"
              )}>
                Good to {formatOdds(game.bestBet.maxOdds)}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center text-xs text-muted-foreground border-t">
          <div>Certainty: {formatPercent(game.modelCertainty)}</div>
          {showAsOf && (
            <div>{formatTimeEST(game.asOf)}</div>
          )}
        </div>

        {showPublishControls && onPublish && (
          <Button 
            onClick={handlePublish}
            className="w-full"
            variant="outline"
          >
            Publish Game
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 
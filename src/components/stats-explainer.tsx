'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Brain, Calculator, BarChart, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StatsExplainer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Info className="h-5 w-5" />
          <span className="sr-only">Stats Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Info className="w-6 h-6" />
            What Do These Stats Mean?
          </DialogTitle>
          <p className="text-muted-foreground text-center mt-2">
            Our custom model analyzes every MLB game using real player and team stats — including starting pitcher performance, 
            offensive power, bullpen strength, and matchup context — to estimate which team has the edge.
          </p>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Model Outputs (per game)
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Model Win Probability (Home/Away)</h4>
                <p className="text-sm text-muted-foreground">
                  The model's estimated chance that each team will win the game, based on a weighted blend of:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2">
                  <li>Starting pitcher FIP & WHIP</li>
                  <li>Team OPS (offensive strength)</li>
                  <li>Bullpen ERA & WHIP</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  (For example: 62.5% means the model gives that team a 62.5% chance to win)
                </p>
              </div>

              <div>
                <h4 className="font-medium">Expected Value (EV)</h4>
                <p className="text-sm text-muted-foreground">
                  The percentage edge a bettor gains based on the difference between the model's win probability and the implied odds from sportsbooks.
                  (Positive EV = a bet the model sees as underpriced)
                </p>
              </div>

              <div>
                <h4 className="font-medium">Best Bet</h4>
                <p className="text-sm text-muted-foreground">
                  The team (home or away) with the higher EV, meaning it's the more statistically favorable bet based on current odds.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Best Bet EV</h4>
                <p className="text-sm text-muted-foreground">
                  How much value is in the best bet, shown as a percent.
                  (The higher, the better. Anything {'>'} 0 is a positive EV bet.)
                </p>
              </div>

              <div>
                <h4 className="font-medium">Best Bet Odds</h4>
                <p className="text-sm text-muted-foreground">
                  The current sportsbook odds used when calculating the best bet (the most favorable line available from major books).
                </p>
              </div>

              <div>
                <h4 className="font-medium">Max Odds to Bet</h4>
                <p className="text-sm text-muted-foreground">
                  The worst odds you can still take and expect a positive value, based on the model's probability.
                  (If the line moves past this, the bet is no longer +EV.)
                </p>
              </div>

              <div>
                <h4 className="font-medium">Model Confidence</h4>
                <p className="text-sm text-muted-foreground">
                  How far the model's win probability is from a 50/50 coin flip — essentially a confidence score for the pick.
                  (Higher = more confident prediction.)
                </p>
              </div>

              <div>
                <h4 className="font-medium">Top Pick</h4>
                <p className="text-sm text-muted-foreground">
                  The top 3 best bets of the day (ranked by EV), flagged to help you focus on the strongest plays.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Where Does the Model Come From?
            </h3>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This model is built from real MLB data, including:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                <li>Starting pitcher metrics like ERA, FIP, and WHIP</li>
                <li>Team offensive stats like OPS (on-base + slugging)</li>
                <li>Bullpen performance (ERA & WHIP)</li>
                <li>Live odds from top sportsbooks</li>
              </ul>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  A proprietary scoring formula that weights:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                  <li>Pitching (40%)</li>
                  <li>Offense (30%)</li>
                  <li>Bullpen (30%)</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground font-medium mt-4">
                The result: a clear, data-driven way to spot smart bets — not just picks.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
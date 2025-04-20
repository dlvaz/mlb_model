'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"

export function StatsExplainer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:opacity-80 transition-opacity">
          <HelpCircle className="w-6 h-6 text-muted-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">How It Works</DialogTitle>
          <DialogDescription className="space-y-6 text-left">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                🧠 How My Model Works
              </h3>
              <p className="mt-2">
                This page showcases the top MLB bets today based on my custom-built statistical model.
              </p>
              <p className="mt-4">Each game is scored using a combination of:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><span className="font-medium">Starting Pitching:</span> ERA, FIP, and WHIP are used to measure effectiveness</li>
                <li><span className="font-medium">Offensive Power:</span> OPS (on-base + slugging) is averaged per team</li>
                <li><span className="font-medium">Bullpen Strength:</span> ERA and WHIP from relievers</li>
                <li><span className="font-medium">Market Odds:</span> The best available pregame odds from top sportsbooks</li>
              </ul>
              <p className="mt-4">
                The model calculates a win probability for each team, then compares it to the market's implied odds to find bets with positive expected value (EV).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                🎯 What Makes a "Best Bet"?
              </h3>
              <p className="mt-2">To qualify as a Best Bet, the team must:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Be favored to win by the model</li>
                <li>Offer positive expected value</li>
                <li>Be priced at -150 or better (no heavy favorites)</li>
              </ul>
              <p className="mt-4">
                If no value bet meets those conditions, the model falls back to the most likely winner based on performance — this is noted with a fallback_best_bet tag.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                📊 What Do These Numbers Mean?
              </h3>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><span className="font-medium">Model Win Probability:</span> The chance my model believes the team will win</li>
                <li><span className="font-medium">Best Bet EV:</span> How much edge the model sees (in %)</li>
                <li><span className="font-medium">Best Bet Odds:</span> The best current odds available from sportsbooks</li>
                <li><span className="font-medium">Max Bettable Odds:</span> The worst odds you should accept before the bet loses value</li>
                <li><span className="font-medium">Model Certainty:</span> How far the model's confidence deviates from a 50/50 coin flip</li>
              </ul>
              <p className="mt-4">
                Only the top 3 best bets (with the highest EV) are marked as Top Pick.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
} 
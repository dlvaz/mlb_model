"use client"

import { formatDate } from "@/lib/utils"

interface RawDataAccordionProps {
  games: any[] // Temporarily using any[] until we update the Game type
  title: string
}

export function RawDataAccordion({ games, title }: RawDataAccordionProps) {
  if (!games || games.length === 0) return null

  const handleExportCSV = () => {
    const headers = [
      "Game ID",
      "Home Team",
      "Away Team",
      "Best Bet",
      "Best Bet Odds",
      "Expected Value",
      "Model Certainty",
      "As Of",
    ]

    const csvData = games.map((game) => [
      game.game_id,
      game.home_team,
      game.away_team,
      game.best_bet,
      game.best_bet_odds,
      game.best_bet_ev,
      game.model_certainty,
      formatDate(game.as_of),
    ])

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "-")}-raw-data.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Raw Data</h3>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Teams</th>
              <th className="text-left py-2">Best Bet</th>
              <th className="text-right py-2">Odds</th>
              <th className="text-right py-2">EV</th>
              <th className="text-right py-2">Certainty</th>
              <th className="text-right py-2">As Of</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="border-b">
                <td className="py-2">{game.away_team} @ {game.home_team}</td>
                <td className="py-2">{game.best_bet}</td>
                <td className="text-right py-2">{game.best_bet_odds}</td>
                <td className="text-right py-2">{Number(game.best_bet_ev).toFixed(1)}%</td>
                <td className="text-right py-2">{Number(game.model_certainty).toFixed(1)}%</td>
                <td className="text-right py-2">{formatDate(game.as_of)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
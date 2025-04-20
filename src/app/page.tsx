import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GameCard } from '@/components/game-card'
import { getTopPicks, getAllPublishedGames } from '@/lib/supabase'
import { transformGameData } from '@/lib/transforms'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { VersionBadge } from '@/components/version-badge'
import { StatsExplainer } from '@/components/stats-explainer'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable static page regeneration

export default async function Home() {
  const [topPicks, allGames] = await Promise.all([
    getTopPicks(),
    getAllPublishedGames(),
  ])

  const transformedTopPicks = topPicks.map(transformGameData)
  const transformedAllGames = allGames.map(transformGameData)

  // Get the latest update time from all games
  const latestUpdateTime = transformedAllGames.length > 0
    ? Math.max(...transformedAllGames.map(game => new Date(game.asOf).getTime()))
    : null

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold animate-in fade-in slide-in-from-top duration-700">
              davaz MLB Locks Dashboard
            </h1>
            <VersionBadge />
            <StatsExplainer />
          </div>
          <div className="space-y-2 animate-in fade-in duration-1000">
            {latestUpdateTime && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last updated: {formatDate(new Date(latestUpdateTime))}</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-4">
              <Image 
                src="/KEKW.png" 
                alt="KEKW emote" 
                width={48} 
                height={48} 
              />
              <Image 
                src="/PogO.png" 
                alt="PogO emote" 
                width={48} 
                height={48} 
              />
              <Image 
                src="/KEKL.gif" 
                alt="KEKL emote" 
                width={48} 
                height={48} 
                unoptimized
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="top-picks" className="w-full mt-8 animate-in fade-in-50 duration-1000">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <TabsTrigger value="top-picks">Top Picks</TabsTrigger>
              <TabsTrigger value="all-games">All Games</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="top-picks" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {transformedTopPicks.map((game, index) => (
                <div key={`top-${index}`} className="w-full">
                  <GameCard game={game} index={index} showAsOf={false} />
                </div>
              ))}
            </div>
            {transformedTopPicks.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No top picks available at the moment.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="all-games" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {transformedAllGames.map((game, index) => (
                <div key={`all-${index}`} className="w-full">
                  <GameCard game={game} index={index} showAsOf={false} />
                </div>
              ))}
            </div>
            {transformedAllGames.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No published games available.
              </p>
            )}
            {transformedAllGames.length > 0 && (
              <div className="overflow-x-auto mt-8 rounded-lg border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <h3 className="text-lg font-mono font-semibold p-4 border-b">Market Data</h3>
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-2 px-4">Teams</th>
                      <th className="text-left py-2 px-4">Best Bet</th>
                      <th className="text-right py-2 px-4">Odds</th>
                      <th className="text-right py-2 px-4">EV</th>
                      <th className="text-right py-2 px-4">Certainty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transformedAllGames.map((game) => (
                      <tr key={game.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-2 px-4">{game.away.teamName} @ {game.home.teamName}</td>
                        <td className="py-2 px-4">{game.bestBet.team === 'home' ? game.home.teamName : game.away.teamName}</td>
                        <td className="text-right py-2 px-4 tabular-nums">{game.bestBet.odds > 0 ? `+${game.bestBet.odds}` : game.bestBet.odds}</td>
                        <td className={`text-right py-2 px-4 tabular-nums ${game.bestBet.ev >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {game.bestBet.ev >= 0 ? '+' : ''}{Number(game.bestBet.ev).toFixed(1)}%
                        </td>
                        <td className="text-right py-2 px-4 tabular-nums">{Number(game.modelCertainty).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

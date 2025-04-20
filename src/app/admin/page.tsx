'use client'

import { GameCard } from '@/components/game-card'
import { getUnpublishedGames } from '@/lib/supabase'
import { transformGameData } from '@/lib/transforms'
import { RefreshButton } from '@/components/refresh-button'
import { PublishAllButton } from '@/components/publish-all-button'
import { VersionBadge } from '@/components/version-badge'
import { Clock, LogOut } from 'lucide-react'
import { publishGame } from './actions'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { createBrowserSupabaseClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'

export const revalidate = 60 // Revalidate every minute

export default function AdminPage() {
  const router = useRouter()
  const [games, setGames] = useState<Awaited<ReturnType<typeof getUnpublishedGames>>>([])
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const supabase = createBrowserSupabaseClient()

  const loadGames = async () => {
    try {
      const unpublishedGames = await getUnpublishedGames()
      setGames(unpublishedGames)
    } catch (error) {
      console.error('Error loading games:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load games on mount
  useEffect(() => {
    loadGames()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }

  const handlePublish = async (gameId: number) => {
    try {
      const result = await publishGame(gameId)
      if (result.success) {
        await loadGames()
        router.refresh()
      }
    } catch (error) {
      console.error('Error publishing game:', error)
      toast.error('Failed to publish game')
    }
  }

  const handlePublishAll = async () => {
    if (publishing || games.length === 0) return
    
    setPublishing(true)
    try {
      let successCount = 0
      for (const game of games) {
        const result = await publishGame(game.game_id)
        if (result.success) {
          successCount++
        }
      }
      
      toast.success(`Published ${successCount} games successfully`)
      await loadGames()
      router.refresh()
    } catch (error) {
      console.error('Error publishing all games:', error)
      toast.error('Failed to publish all games')
    } finally {
      setPublishing(false)
    }
  }

  const transformedGames = games.map(transformGameData)

  // Get the latest update time from all games
  const latestUpdateTime = transformedGames.length > 0
    ? Math.max(...transformedGames.map(game => new Date(game.asOf).getTime()))
    : null

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold">davaz MLB Model</h1>
              <VersionBadge />
            </div>
            <div className="flex items-center gap-2">
              <PublishAllButton onPublishAll={handlePublishAll} disabled={publishing || games.length === 0} />
              <RefreshButton />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
          {latestUpdateTime && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date(latestUpdateTime).toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {transformedGames.map((game, index) => (
            <div key={game.id} className="mx-auto w-full">
              <GameCard 
                game={game} 
                index={index} 
                showPublishControls={true}
                showAsOf={false}
                onPublish={handlePublish}
              />
            </div>
          ))}
        </div>
        
        {transformedGames.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No unpublished games available.
          </p>
        )}
      </div>
    </main>
  )
} 
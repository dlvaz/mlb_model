import { NextResponse } from 'next/server'
import { publishAllGames } from '@/lib/supabase'

export async function POST() {
  try {
    const publishedCount = await publishAllGames()
    
    return NextResponse.json({ 
      message: 'Successfully published all games',
      count: publishedCount
    })
  } catch (error) {
    console.error('Error publishing all games:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to publish all games'
      },
      { status: 500 }
    )
  }
} 
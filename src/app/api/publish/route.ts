import { NextResponse } from 'next/server'
import { updateGameStatus } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const { gameId } = await request.json()
    
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      )
    }

    await updateGameStatus(gameId, {
      published: true,
      published_at: new Date().toISOString(),
    })

    // Force revalidate both paths
    revalidatePath('/', 'layout')
    revalidatePath('/admin', 'layout')
    
    const response = NextResponse.json({ message: 'Game published successfully' })
    response.headers.set('Cache-Control', 'no-store')
    return response
  } catch (error) {
    console.error('Error publishing game:', error)
    return NextResponse.json(
      { error: 'Failed to publish game' },
      { status: 500 }
    )
  }
} 
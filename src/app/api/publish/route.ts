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

    revalidatePath('/admin')
    revalidatePath('/')
    
    return NextResponse.json({ message: 'Game published successfully' })
  } catch (error) {
    console.error('Error publishing game:', error)
    return NextResponse.json(
      { error: 'Failed to publish game' },
      { status: 500 }
    )
  }
} 
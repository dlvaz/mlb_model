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
      reviewed: true,
    })

    revalidatePath('/admin')
    
    return NextResponse.json({ message: 'Game marked as reviewed' })
  } catch (error) {
    console.error('Error reviewing game:', error)
    return NextResponse.json(
      { error: 'Failed to mark game as reviewed' },
      { status: 500 }
    )
  }
} 
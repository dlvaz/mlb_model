'use server'

import { updateGameStatus } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function publishGame(gameId: number) {
  try {
    await updateGameStatus(gameId, {
      published: true,
      published_at: new Date().toISOString(),
    })
    return { success: true }
  } catch (error) {
    console.error('Error publishing game:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to publish game' 
    }
  }
}

export async function reviewGame(gameId: number) {
  try {
    await updateGameStatus(gameId, {
      reviewed: true,
    })
    return { success: true }
  } catch (error) {
    console.error('Error reviewing game:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to mark game as reviewed' 
    }
  }
}

export async function triggerModelRefresh() {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error('N8N webhook URL not configured')
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to trigger model refresh')
    }

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error triggering model refresh:', error)
    throw error
  }
} 
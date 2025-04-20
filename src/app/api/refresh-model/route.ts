import { NextResponse } from 'next/server'
import { deleteAllGames, verifyTableEmpty } from '@/lib/supabase'

export async function POST() {
  try {
    // Step 1: Delete all existing records
    await deleteAllGames()

    // Step 2: Verify the table is empty
    await verifyTableEmpty()

    // Step 3: Trigger the n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      throw new Error('N8N_WEBHOOK_URL is not configured')
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to trigger webhook: ${response.statusText}`)
    }

    return NextResponse.json({ 
      message: 'Model refresh triggered successfully',
      steps: {
        deleteGames: 'completed',
        verifyEmpty: 'completed',
        triggerWebhook: 'completed'
      }
    })
  } catch (error) {
    console.error('Error in refresh process:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to refresh model',
        steps: {
          deleteGames: error instanceof Error && error.message.includes('deleting') ? 'failed' : 'unknown',
          verifyEmpty: error instanceof Error && error.message.includes('not empty') ? 'failed' : 'unknown',
          triggerWebhook: error instanceof Error && error.message.includes('webhook') ? 'failed' : 'unknown'
        }
      },
      { status: 500 }
    )
  }
} 
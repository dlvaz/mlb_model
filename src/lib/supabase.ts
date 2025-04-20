import { createClient } from '@supabase/supabase-js'
import { Game } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
})

export async function fetchPublishedGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from('mlb_model_output')
    .select('*')
    .eq('is_published', true)
    .order('expected_value', { ascending: false })

  if (error) {
    console.error('Error fetching published games:', error)
    throw error
  }

  return data || []
}

export async function fetchUnpublishedGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from('mlb_model_output')
    .select('*')
    .eq('is_published', false)
    .order('expected_value', { ascending: false })

  if (error) {
    console.error('Error fetching unpublished games:', error)
    throw error
  }

  return data || []
}

export async function updateGamePublishedStatus(gameId: string, isPublished: boolean): Promise<void> {
  const { error } = await supabase
    .from('mlb_model_output')
    .update({ is_published: isPublished })
    .eq('game_id', gameId)

  if (error) {
    console.error('Error updating game published status:', error)
    throw error
  }
}

export async function getAllPublishedGames() {
  console.log('Fetching all published games...')
  const { data, error } = await supabase
    .from('mlb_model_output')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching published games:', error)
    throw error
  }

  console.log(`Found ${data?.length || 0} published games`)
  return data || []
}

export async function getTopPicks() {
  console.log('Fetching top picks...')
  const { data, error } = await supabase
    .from('mlb_model_output')
    .select('*')
    .eq('published', true)
    .eq('top_pick', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching top picks:', error)
    throw error
  }

  console.log(`Found ${data?.length || 0} top picks`)
  return data || []
}

export async function getUnpublishedGames() {
  console.log('Fetching unpublished games...')
  try {
    const { data, error } = await supabase
      .from('mlb_model_output')
      .select('*')
      .eq('published', false)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching unpublished games:', error)
      throw error
    }

    console.log(`Found ${data?.length || 0} unpublished games`)
    if (data?.length === 0) {
      console.log('No unpublished games found in the database')
    }
    return data || []
  } catch (error) {
    console.error('Unexpected error in getUnpublishedGames:', error)
    throw error
  }
}

export async function updateGameStatus(gameId: number, updates: { published?: boolean, published_at?: string, reviewed?: boolean }) {
  console.log(`Updating game ${gameId} with:`, updates)
  const { error } = await supabase
    .from('mlb_model_output')
    .update(updates)
    .eq('game_id', gameId)

  if (error) {
    console.error('Error updating game status:', error)
    throw error
  }
  console.log(`Successfully updated game ${gameId}`)
}

export async function triggerModelRefresh(webhookUrl: string) {
  console.log('Triggering model refresh...')
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to trigger model refresh')
  }

  console.log('Model refresh triggered successfully')
  return response.json()
}

export async function deleteAllGames() {
  console.log('Deleting all games from the database...')
  const { error } = await supabase
    .from('mlb_model_output')
    .delete()
    .neq('game_id', 0) // This ensures we're deleting all records

  if (error) {
    console.error('Error deleting all games:', error)
    throw error
  }
  console.log('Successfully deleted all games')
}

export async function verifyTableEmpty() {
  console.log('Verifying table is empty...')
  const { data, error, count } = await supabase
    .from('mlb_model_output')
    .select('*', { count: 'exact' })

  if (error) {
    console.error('Error verifying table is empty:', error)
    throw error
  }

  if (count && count > 0) {
    throw new Error(`Table is not empty. Found ${count} records.`)
  }

  console.log('Verified table is empty')
  return true
}

export async function publishAllGames() {
  console.log('Publishing all unpublished games...')
  const { error, data } = await supabase
    .from('mlb_model_output')
    .update({ is_published: true })
    .eq('is_published', false)
    .select()

  if (error) {
    console.error('Error publishing all games:', error)
    throw error
  }

  const count = data?.length || 0
  console.log(`Successfully published ${count} games`)
  return count
} 
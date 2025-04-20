'use client'

import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function RefreshButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/refresh-model', {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to refresh model')
      }

      // Show success toast with step details
      toast.success('Model refresh completed', {
        description: (
          <div className="mt-2 text-sm">
            <div>✓ Cleared existing data</div>
            <div>✓ Verified table empty</div>
            <div>✓ Triggered model update</div>
          </div>
        ),
      })

      // Refresh the page data
      router.refresh()
    } catch (error) {
      // Show error toast with step details if available
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh model'
      toast.error('Model refresh failed', {
        description: (
          <div className="mt-2 text-sm">
            <div>{errorMessage}</div>
          </div>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className="h-4 w-4" />
      )}
      {isLoading ? 'Refreshing...' : 'Refresh Model'}
    </Button>
  )
} 
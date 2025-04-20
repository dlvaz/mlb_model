'use client'

import { Button } from '@/components/ui/button'
import { Loader2, Upload } from 'lucide-react'
import { useState } from 'react'

interface PublishAllButtonProps {
  onPublishAll: () => Promise<void>
  disabled?: boolean
}

export function PublishAllButton({ onPublishAll, disabled }: PublishAllButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onPublishAll()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isLoading || disabled}
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Upload className="h-4 w-4" />
      )}
      {isLoading ? 'Publishing...' : 'Publish All'}
    </Button>
  )
} 
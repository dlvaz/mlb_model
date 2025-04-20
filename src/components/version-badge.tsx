import { Badge } from '@/components/ui/badge'
import { VERSION } from '@/lib/version'

export function VersionBadge() {
  return (
    <Badge 
      variant="outline" 
      className="text-xs font-mono bg-background/50 backdrop-blur-sm"
    >
      v{VERSION}
    </Badge>
  )
} 
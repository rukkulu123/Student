import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardBody } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { Space } from '@/types'

export function SpaceCard({ space }: { space: Space }) {
  return (
    <Link to={`/app/spaces/${space.id}`}>
      <Card className="hover:shadow-panel transition-shadow h-full">
        <CardBody className="space-y-3">
          <div>
            <h3 className="text-base font-semibold text-ink">{space.name}</h3>
            <p className="text-sm text-ink-faint line-clamp-2 mt-0.5">{space.description}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-ink-faint">
            <span>{space.projectCount} project{space.projectCount === 1 ? '' : 's'}</span>
            <span>Active {formatDistanceToNow(new Date(space.lastActivityAt), { addSuffix: true })}</span>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-ink-soft mb-1">
              <span>Overall mastery</span>
              <span className="font-medium">{space.overallMastery}%</span>
            </div>
            <ProgressBar value={space.overallMastery} />
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

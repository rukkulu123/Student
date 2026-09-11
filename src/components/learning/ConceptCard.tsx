import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { RadialGauge } from '@/components/ui/RadialGauge'
import { MasteryStatusBadge } from './MasteryBadge'
import type { Concept } from '@/types'

const trendIcon = { up: ArrowUp, down: ArrowDown, flat: Minus }
const trendColor = { up: 'text-signal', down: 'text-rust', flat: 'text-ink-faint' }

export function ConceptCard({ concept, onClick }: { concept: Concept; onClick?: () => void }) {
  const TrendIcon = trendIcon[concept.trend]
  return (
    <Card onClick={onClick} className={onClick ? 'cursor-pointer hover:shadow-panel transition-shadow' : undefined}>
      <CardBody className="flex flex-col items-center text-center gap-3 pt-6">
        <RadialGauge value={concept.mastery} size={76} strokeWidth={6} tone={concept.mastery < 50 ? 'amber' : 'signal'} />
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-1.5">
            <h4 className="text-sm font-medium text-ink">{concept.name}</h4>
            <TrendIcon className={`w-3.5 h-3.5 shrink-0 ${trendColor[concept.trend]}`} />
          </div>
          <MasteryStatusBadge status={concept.status} />
        </div>
      </CardBody>
    </Card>
  )
}

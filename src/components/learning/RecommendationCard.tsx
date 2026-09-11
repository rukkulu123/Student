import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Recommendation } from '@/types'

const actionMap = {
  tutor: { label: 'Learn with Tutor', suffix: 'tutor' },
  quiz: { label: 'Take targeted quiz', suffix: 'quiz' },
  material_review: { label: 'Review material', suffix: 'materials' },
}

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const action = actionMap[recommendation.action]
  return (
    <Card accent="indigo">
      <CardBody className="space-y-3">
        <div className="flex items-center gap-2 text-indigo-strong text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Recommended next step</span>
        </div>
        <h3 className="text-base font-display">{recommendation.title}</h3>
        <p className="text-sm text-ink-soft">{recommendation.reason}</p>
        <p className="text-xs text-ink-faint">{recommendation.evidence}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link to={`/app/projects/${recommendation.projectId}/${action.suffix}`}>
            <Button size="sm">{action.label}</Button>
          </Link>
          <Link to={`/app/projects/${recommendation.projectId}/overview`}>
            <Button size="sm" variant="secondary">View project</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

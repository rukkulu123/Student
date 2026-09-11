import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { AIEvaluationScore } from '@/types'

export function EvaluationPanel({ scores }: { scores: AIEvaluationScore[] }) {
  const categories = Array.from(new Set(scores.map((s) => s.category)))
  return (
    <div className="space-y-5">
      {categories.map((category) => (
        <Card key={category}>
          <CardBody className="space-y-3">
            <p className="text-sm font-semibold text-ink">{category} evaluation</p>
            <div className="space-y-2.5">
              {scores.filter((s) => s.category === category).map((s) => (
                <div key={s.metric} className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{s.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-ink font-medium">{s.score}%</span>
                    <Badge tone={s.score >= s.target ? 'signal' : 'amber'}>
                      {s.score >= s.target ? 'On target' : `Target ${s.target}%`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

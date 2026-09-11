import { Card, CardBody } from '@/components/ui/Card'
import type { Concept, Project } from '@/types'

export function LearningContext({ project, concepts }: { project: Project; concepts: Concept[] }) {
  const strengths = concepts.filter((c) => c.status === 'mastered').slice(0, 3)
  const attention = concepts.filter((c) => c.status === 'needs_attention').slice(0, 3)

  return (
    <Card>
      <CardBody className="space-y-4">
        <div>
          <p className="text-xs text-ink-faint mb-1">You are currently learning</p>
          <p className="text-sm text-ink">{project.learningGoal}</p>
        </div>
        {strengths.length > 0 && (
          <div>
            <p className="text-xs text-ink-faint mb-1.5">Known strengths</p>
            <ul className="space-y-1">
              {strengths.map((c) => (
                <li key={c.id} className="text-sm text-ink-soft flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal" /> {c.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {attention.length > 0 && (
          <div>
            <p className="text-xs text-ink-faint mb-1.5">Needs attention</p>
            <ul className="space-y-1">
              {attention.map((c) => (
                <li key={c.id} className="text-sm text-ink-soft flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" /> {c.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

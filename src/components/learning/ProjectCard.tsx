import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardBody } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import type { Project, LearningStatus } from '@/types'

const statusLabel: Record<LearningStatus, string> = {
  getting_started: 'Getting started', learning: 'Learning', improving: 'Improving',
  strong: 'Strong', needs_attention: 'Needs attention',
}
const statusTone: Record<LearningStatus, 'signal' | 'amber' | 'indigo' | 'rust' | 'neutral'> = {
  getting_started: 'neutral', learning: 'indigo', improving: 'signal', strong: 'signal', needs_attention: 'amber',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/app/projects/${project.id}/overview`}>
      <Card className="hover:shadow-panel transition-shadow h-full">
        <CardBody className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs text-ink-faint">{project.spaceName}</p>
              <h3 className="text-base font-semibold text-ink truncate">{project.name}</h3>
            </div>
            <Badge tone={statusTone[project.status]}>{statusLabel[project.status]}</Badge>
          </div>
          <p className="text-sm text-ink-faint line-clamp-2">{project.learningGoal}</p>
          <div>
            <div className="flex items-center justify-between text-xs text-ink-soft mb-1">
              <span>Mastery {project.overallMastery}%</span>
              <span>{formatDistanceToNow(new Date(project.lastActivityAt), { addSuffix: true })}</span>
            </div>
            <ProgressBar value={project.overallMastery} />
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

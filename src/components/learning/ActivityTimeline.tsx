import { formatDistanceToNow } from 'date-fns'
import {
  FileText, MessageCircle, ListChecks, PenLine, TrendingUp, Sparkles, FolderPlus, Layers, AlertTriangle,
} from 'lucide-react'
import type { LearningEvent, LearningEventType } from '@/types'

const iconMap: Record<LearningEventType, any> = {
  SPACE_CREATED: Layers,
  PROJECT_CREATED: FolderPlus,
  PROJECT_ACCESSED: FolderPlus,
  MATERIAL_UPLOADED: FileText,
  MATERIAL_PROCESSING_STARTED: FileText,
  MATERIAL_PROCESSED: FileText,
  MATERIAL_PROCESSING_FAILED: AlertTriangle,
  TUTOR_CONVERSATION_STARTED: MessageCircle,
  TUTOR_QUESTION_ASKED: MessageCircle,
  TUTOR_INTERACTION_COMPLETED: MessageCircle,
  QUIZ_STARTED: ListChecks,
  QUESTION_ANSWERED: ListChecks,
  QUIZ_COMPLETED: ListChecks,
  ASSESSMENT_COMPLETED: PenLine,
  MASTERY_UPDATED: TrendingUp,
  RECOMMENDATION_GENERATED: Sparkles,
}

export function ActivityTimeline({ events, showProject = false }: { events: LearningEvent[]; showProject?: boolean }) {
  if (events.length === 0) return null
  return (
    <ol className="space-y-4">
      {events.map((event) => {
        const Icon = iconMap[event.type] ?? Sparkles
        const isFailure = event.type === 'MATERIAL_PROCESSING_FAILED'
        return (
          <li key={event.id} className="flex gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isFailure ? 'bg-rust-soft text-rust' : 'bg-signal-soft text-signal-strong'}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 pb-0.5">
              <p className="text-sm text-ink">{event.summary}</p>
              <p className="text-xs text-ink-faint">
                {showProject && event.projectName ? `${event.projectName} · ` : ''}
                {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

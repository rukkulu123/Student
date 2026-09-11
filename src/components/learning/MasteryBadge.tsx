import { Badge } from '@/components/ui/Badge'
import type { ConceptStatus } from '@/types'

const map: Record<ConceptStatus, { label: string; tone: 'signal' | 'amber' | 'rust' | 'indigo' | 'neutral' }> = {
  mastered: { label: 'Mastered', tone: 'signal' },
  improving: { label: 'Improving', tone: 'indigo' },
  needs_attention: { label: 'Needs attention', tone: 'amber' },
  not_started: { label: 'Not started', tone: 'neutral' },
}

export function MasteryStatusBadge({ status }: { status: ConceptStatus }) {
  const cfg = map[status]
  return <Badge tone={cfg.tone}>{cfg.label}</Badge>
}

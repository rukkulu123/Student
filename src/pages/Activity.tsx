import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Card, CardBody } from '@/components/ui/Card'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { ActivityTimeline } from '@/components/learning/ActivityTimeline'
import { getActivity } from '@/api/activity'
import type { LearningEventType } from '@/types'

const typeOptions: { value: LearningEventType | 'all'; label: string }[] = [
  { value: 'all', label: 'All activity' },
  { value: 'MATERIAL_PROCESSED', label: 'Materials' },
  { value: 'TUTOR_QUESTION_ASKED', label: 'Tutor' },
  { value: 'QUIZ_COMPLETED', label: 'Quiz' },
  { value: 'ASSESSMENT_COMPLETED', label: 'Assessment' },
  { value: 'MASTERY_UPDATED', label: 'Mastery' },
  { value: 'RECOMMENDATION_GENERATED', label: 'Recommendations' },
]

export default function ActivityPage() {
  const [type, setType] = useState<string>('all')
  const { data: events, isLoading } = useQuery({
    queryKey: ['activity-all', type],
    queryFn: () => getActivity(type === 'all' ? undefined : { type }),
  })

  return (
    <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/app/dashboard' }, { label: 'Activity' }]} />}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-xl font-display">Activity</h1>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded border border-line bg-paper-raised px-3 py-1.5 text-sm"
        >
          {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {isLoading && <SkeletonTable />}
      {!isLoading && (
        <Card>
          <CardBody>
            <ActivityTimeline events={events ?? []} showProject />
          </CardBody>
        </Card>
      )}
    </AppShell>
  )
}

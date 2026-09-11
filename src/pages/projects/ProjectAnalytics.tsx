import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useProject } from '@/hooks/useProject'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { MetricCard } from '@/components/analytics/MetricCard'
import { TrendChart } from '@/components/analytics/TrendChart'
import { AnalyticsFilters } from '@/components/analytics/AnalyticsFilters'
import { getProjectAnalytics } from '@/api/analytics'

export default function ProjectAnalytics() {
  const { project } = useProject()
  const [range, setRange] = useState('30d')

  const { data: a, isLoading } = useQuery({
    queryKey: ['project-analytics', project?.id, range],
    queryFn: () => getProjectAnalytics(project!.id, range),
    enabled: !!project,
  })

  if (!project || isLoading || !a) return <SkeletonCard />

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-display">Project analytics</h2>
        <AnalyticsFilters value={range} onChange={setRange} />
      </div>

      <section>
        <p className="text-xs text-ink-faint mb-3">Activity</p>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard label="Sessions" value={a.sessions} />
          <MetricCard label="Tutor questions" value={a.tutorQuestions} />
          <MetricCard label="Quiz attempts" value={a.quizAttempts} />
          <MetricCard label="Questions answered" value={a.questionsAnswered} />
          <MetricCard label="Material interactions" value={a.materialInteractions} />
        </div>
      </section>

      <section>
        <p className="text-xs text-ink-faint mb-3">Performance</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Quiz accuracy" value={`${a.quizAccuracy}%`} />
          <MetricCard label="Current mastery" value={`${a.currentMastery}%`} />
          <MetricCard label="Concepts mastered" value={a.conceptsMastered} />
          <MetricCard label="Needing attention" value={a.conceptsNeedingAttention} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Mastery trend</CardTitle></CardHeader>
          <CardBody><TrendChart data={a.masteryTrend} color="#3F7A5C" valueLabel="Mastery" /></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Assessment trend</CardTitle></CardHeader>
          <CardBody><TrendChart data={a.assessmentTrend} color="#5B4FE8" valueLabel="Score" /></CardBody>
        </Card>
      </section>

      <section>
        <p className="text-xs text-ink-faint mb-3">AI activity</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Tutor interactions" value={a.tutorInteractions} />
          <MetricCard label="AI assessments generated" value={a.aiAssessmentsGenerated} />
          <MetricCard label="AI evaluations" value={a.aiEvaluations} />
          <MetricCard label="Recommendations generated" value={a.recommendationsGenerated} />
        </div>
      </section>
    </div>
  )
}

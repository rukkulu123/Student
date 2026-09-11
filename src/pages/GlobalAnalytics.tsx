import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { MetricCard } from '@/components/analytics/MetricCard'
import { TrendChart } from '@/components/analytics/TrendChart'
import { AnalyticsFilters } from '@/components/analytics/AnalyticsFilters'
import { getGlobalAnalytics } from '@/api/analytics'

export default function GlobalAnalytics() {
  const [range, setRange] = useState('30d')
  const { data: a, isLoading } = useQuery({ queryKey: ['global-analytics', range], queryFn: () => getGlobalAnalytics(range) })

  return (
    <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/app/dashboard' }, { label: 'Analytics' }]} />}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display">Global analytics</h1>
        <AnalyticsFilters value={range} onChange={setRange} />
      </div>

      {isLoading || !a ? <SkeletonCard /> : (
        <div className="space-y-8">
          <section>
            <p className="text-xs text-ink-faint mb-3">Overall learning</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard label="Total activity" value={a.totalActivity} />
              <MetricCard label="Active days" value={a.activeDays} />
              <MetricCard label="Spaces" value={a.spaces} />
              <MetricCard label="Projects" value={a.projects} />
            </div>
          </section>

          <section>
            <p className="text-xs text-ink-faint mb-3">Learning performance</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard label="Overall mastery" value={`${a.overallMastery}%`} />
              <MetricCard label="Avg. assessment score" value={`${a.avgAssessmentScore}%`} />
              <MetricCard label="Improving concepts" value={a.improvingConcepts} />
              <MetricCard label="Needing attention" value={a.conceptsNeedingAttention} />
            </div>
          </section>

          <section>
            <p className="text-xs text-ink-faint mb-3">AI usage</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard label="Tutor interactions" value={a.tutorInteractions} />
              <MetricCard label="Questions asked" value={a.questionsAsked} />
              <MetricCard label="Quiz activity" value={a.quizActivity} />
              <MetricCard label="AI feedback generated" value={a.aiFeedbackGenerated} />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader><CardTitle>Activity over time</CardTitle></CardHeader>
              <CardBody><TrendChart data={a.activityTrend} color="#B8843A" valueLabel="Sessions" /></CardBody>
            </Card>
            <Card>
              <CardHeader><CardTitle>Mastery over time</CardTitle></CardHeader>
              <CardBody><TrendChart data={a.masteryTrend} color="#3F7A5C" valueLabel="Mastery" /></CardBody>
            </Card>
            <Card>
              <CardHeader><CardTitle>Assessment performance</CardTitle></CardHeader>
              <CardBody><TrendChart data={a.assessmentTrend} color="#5B4FE8" valueLabel="Score" /></CardBody>
            </Card>
          </section>
        </div>
      )}
    </AppShell>
  )
}

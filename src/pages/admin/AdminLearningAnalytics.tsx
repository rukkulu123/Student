import { AdminShell } from '@/components/admin/AdminShell'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { MetricCard } from '@/components/analytics/MetricCard'
import { TrendChart } from '@/components/analytics/TrendChart'
import { globalAnalytics } from '@/mocks/data'

export default function AdminLearningAnalytics() {
  return (
    <AdminShell title="Learning Analytics">
      <div className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Avg. engagement" value="4.2 sessions/wk" />
          <MetricCard label="Avg. assessment score" value={`${globalAnalytics.avgAssessmentScore}%`} />
          <MetricCard label="Avg. mastery" value={`${globalAnalytics.overallMastery}%`} />
          <MetricCard label="Active projects" value={globalAnalytics.projects} />
        </div>
        <Card>
          <CardHeader><CardTitle>Platform mastery trend</CardTitle></CardHeader>
          <CardBody><TrendChart data={globalAnalytics.masteryTrend} color="#3F7A5C" valueLabel="Mastery" /></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Common struggle areas</CardTitle></CardHeader>
          <CardBody className="text-sm text-ink-soft space-y-1.5">
            <p>Retrieval Ranking — most frequently flagged as "needs attention" across projects.</p>
            <p>Vector Search — second most common area of repeated quiz mistakes.</p>
          </CardBody>
        </Card>
      </div>
    </AdminShell>
  )
}

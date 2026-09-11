import { useQuery } from '@tanstack/react-query'
import { AdminShell } from '@/components/admin/AdminShell'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { MetricCard } from '@/components/analytics/MetricCard'
import { TrendChart } from '@/components/analytics/TrendChart'
import { AIUsageTable } from '@/components/admin/AIUsageTable'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { listAIUsage } from '@/api/aiUsage'
import { globalAnalytics } from '@/mocks/data'

export default function AdminAIUsage() {
  const { data: records, isLoading } = useQuery({ queryKey: ['ai-usage'], queryFn: listAIUsage })
  const totalCost = records?.reduce((s, r) => s + r.costUsd, 0) ?? 0
  const avgLatency = records && records.length > 0 ? Math.round(records.reduce((s, r) => s + r.latencyMs, 0) / records.length) : 0

  return (
    <AdminShell title="AI Usage">
      <div className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Tutor requests" value={globalAnalytics.tutorInteractions} />
          <MetricCard label="Avg. latency" value={`${avgLatency} ms`} />
          <MetricCard label="Estimated cost" value={`$${totalCost.toFixed(2)}`} />
          <MetricCard label="Model" value="claude-sonnet-4-6" />
        </div>
        <Card>
          <CardHeader><CardTitle>Requests over time</CardTitle></CardHeader>
          <CardBody><TrendChart data={globalAnalytics.activityTrend} color="#5B4FE8" valueLabel="Requests" /></CardBody>
        </Card>
        {isLoading ? <SkeletonTable /> : <AIUsageTable records={records ?? []} />}
      </div>
    </AdminShell>
  )
}

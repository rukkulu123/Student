import { useQuery } from '@tanstack/react-query'
import { AdminShell } from '@/components/admin/AdminShell'
import { MetricCard } from '@/components/analytics/MetricCard'
import { TrendChart } from '@/components/analytics/TrendChart'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { listAdminUsers } from '@/api/admin'
import { globalAnalytics } from '@/mocks/data'

export default function AdminDashboard() {
  const { data: users, isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: listAdminUsers })

  return (
    <AdminShell title="Dashboard">
      {isLoading ? <SkeletonCard /> : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Total users" value={users?.length ?? 0} />
            <MetricCard label="Active users" value={users?.filter((u) => u.status === 'active').length ?? 0} />
            <MetricCard label="Total spaces" value={globalAnalytics.spaces} />
            <MetricCard label="Total projects" value={globalAnalytics.projects} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Materials uploaded" value={5} />
            <MetricCard label="Tutor activity" value={globalAnalytics.tutorInteractions} />
            <MetricCard label="Quiz activity" value={globalAnalytics.quizActivity} />
            <MetricCard label="AI error rate" value="1.4%" />
          </div>
          <Card>
            <CardHeader><CardTitle>Platform activity</CardTitle></CardHeader>
            <CardBody><TrendChart data={globalAnalytics.activityTrend} color="#3F7A5C" valueLabel="Sessions" /></CardBody>
          </Card>
        </div>
      )}
    </AdminShell>
  )
}

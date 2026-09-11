import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AdminShell } from '@/components/admin/AdminShell'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { getAdminUser } from '@/api/admin'
import { formatDistanceToNow } from 'date-fns'

const journeySteps = [
  'Created Project', 'Uploaded Material', 'Material Processed', 'Asked Tutor Question',
  'Started Quiz', 'Completed Assessment', 'Mastery Updated',
]

export default function AdminUserDetail() {
  const { userId = '' } = useParams()
  const { data: user, isLoading, isError, refetch } = useQuery({ queryKey: ['admin-user', userId], queryFn: () => getAdminUser(userId) })

  if (isLoading) return <AdminShell title="User"><SkeletonCard /></AdminShell>
  if (isError || !user) return <AdminShell title="User"><ErrorState onRetry={() => refetch()} /></AdminShell>

  return (
    <AdminShell title={user.name}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>User overview</CardTitle></CardHeader>
            <CardBody className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-ink-faint">Email</p><p className="text-ink">{user.email}</p></div>
              <div><p className="text-xs text-ink-faint">Status</p><p className="text-ink capitalize">{user.status}</p></div>
              <div><p className="text-xs text-ink-faint">Registered</p><p className="text-ink">{formatDistanceToNow(new Date(user.registeredAt), { addSuffix: true })}</p></div>
              <div><p className="text-xs text-ink-faint">Last active</p><p className="text-ink">{formatDistanceToNow(new Date(user.lastActiveAt), { addSuffix: true })}</p></div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Learning journey</CardTitle></CardHeader>
            <CardBody>
              <ol className="space-y-2">
                {journeySteps.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-signal-soft text-signal-strong text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Learning overview</CardTitle></CardHeader>
            <CardBody className="space-y-3">
              <div><p className="text-xs text-ink-faint">Spaces</p><p className="text-lg font-display">{user.spaces}</p></div>
              <div><p className="text-xs text-ink-faint">Projects</p><p className="text-lg font-display">{user.projects}</p></div>
              <div>
                <div className="flex justify-between text-xs text-ink-soft mb-1"><span>Overall progress</span><span>{user.overallProgress}%</span></div>
                <ProgressBar value={user.overallProgress} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}

import { useQuery } from '@tanstack/react-query'
import { AdminShell } from '@/components/admin/AdminShell'
import { Card, CardBody } from '@/components/ui/Card'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { ActivityTimeline } from '@/components/learning/ActivityTimeline'
import { getActivity } from '@/api/activity'

export default function AdminActivity() {
  const { data: events, isLoading } = useQuery({ queryKey: ['admin-activity'], queryFn: () => getActivity() })
  return (
    <AdminShell title="Activity">
      {isLoading ? <SkeletonTable /> : (
        <Card><CardBody><ActivityTimeline events={events ?? []} showProject /></CardBody></Card>
      )}
    </AdminShell>
  )
}

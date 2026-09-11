import { useQuery } from '@tanstack/react-query'
import { AdminShell } from '@/components/admin/AdminShell'
import { SystemHealthPanel } from '@/components/admin/SystemHealthPanel'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { getSystemHealth, getSystemFailures } from '@/api/health'

export default function AdminSystemHealth() {
  const { data: services, isLoading: l1 } = useQuery({ queryKey: ['system-health'], queryFn: getSystemHealth })
  const { data: failures, isLoading: l2 } = useQuery({ queryKey: ['system-failures'], queryFn: getSystemFailures })
  return (
    <AdminShell title="System Health">
      {l1 || l2 ? <SkeletonCard /> : <SystemHealthPanel services={services ?? []} failures={failures ?? []} />}
    </AdminShell>
  )
}

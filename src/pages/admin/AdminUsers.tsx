import { useQuery } from '@tanstack/react-query'
import { AdminShell } from '@/components/admin/AdminShell'
import { UserTable } from '@/components/admin/UserTable'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { listAdminUsers } from '@/api/admin'

export default function AdminUsers() {
  const { data: users, isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: listAdminUsers })
  return (
    <AdminShell title="Users">
      {isLoading ? <SkeletonTable /> : <UserTable users={users ?? []} />}
    </AdminShell>
  )
}

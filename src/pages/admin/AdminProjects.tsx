import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { AdminShell } from '@/components/admin/AdminShell'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { listProjects } from '@/api/projects'

export default function AdminProjects() {
  const { data: projects, isLoading } = useQuery({ queryKey: ['all-projects'], queryFn: () => listProjects() })

  return (
    <AdminShell title="Spaces & Projects">
      {isLoading ? <SkeletonTable /> : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-ink-faint">
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Space</th>
                <th className="px-4 py-3 font-medium">Progress</th>
                <th className="px-4 py-3 font-medium">Last activity</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-ink font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{p.spaceName}</td>
                  <td className="px-4 py-3 w-40"><ProgressBar value={p.progress} /></td>
                  <td className="px-4 py-3 text-ink-faint">{formatDistanceToNow(new Date(p.lastActivityAt), { addSuffix: true })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  )
}

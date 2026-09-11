import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { AdminUserRow } from '@/types'

export function UserTable({ users }: { users: AdminUserRow[] }) {
  return (
    <div className="surface-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-ink-faint">
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Registered</th>
            <th className="px-4 py-3 font-medium">Last active</th>
            <th className="px-4 py-3 font-medium">Spaces</th>
            <th className="px-4 py-3 font-medium">Projects</th>
            <th className="px-4 py-3 font-medium">Progress</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-line last:border-0 hover:bg-paper-sunken/50">
              <td className="px-4 py-3">
                <Link to={`/admin/users/${u.id}`} className="text-ink font-medium hover:text-signal-strong">{u.name}</Link>
                <p className="text-xs text-ink-faint">{u.email}</p>
              </td>
              <td className="px-4 py-3 text-ink-soft">{formatDistanceToNow(new Date(u.registeredAt), { addSuffix: true })}</td>
              <td className="px-4 py-3 text-ink-soft">{formatDistanceToNow(new Date(u.lastActiveAt), { addSuffix: true })}</td>
              <td className="px-4 py-3 text-ink-soft">{u.spaces}</td>
              <td className="px-4 py-3 text-ink-soft">{u.projects}</td>
              <td className="px-4 py-3 w-32"><ProgressBar value={u.overallProgress} /></td>
              <td className="px-4 py-3"><Badge tone={u.status === 'active' ? 'signal' : 'neutral'}>{u.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

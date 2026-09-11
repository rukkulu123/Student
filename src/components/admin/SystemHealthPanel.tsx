import { format } from 'date-fns'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { SystemHealthStatus, SystemFailure } from '@/types'

const tone = { healthy: 'signal', degraded: 'amber', down: 'rust' } as const

export function SystemHealthPanel({ services, failures }: { services: SystemHealthStatus[]; failures: SystemFailure[] }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <Card key={s.service}>
            <CardBody className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink">{s.service}</p>
                <Badge tone={tone[s.status]}>{s.status}</Badge>
              </div>
              {s.latencyMs !== undefined && <p className="text-xs text-ink-faint">{s.latencyMs} ms avg latency</p>}
              {s.errorRate !== undefined && <p className="text-xs text-ink-faint">{s.errorRate}% error rate</p>}
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="surface-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-ink-faint">
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Operation</th>
              <th className="px-4 py-3 font-medium">Error</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {failures.map((f) => (
              <tr key={f.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 text-ink-soft whitespace-nowrap">{format(new Date(f.time), 'MMM d, HH:mm')}</td>
                <td className="px-4 py-3 text-ink">{f.service}</td>
                <td className="px-4 py-3 text-ink-faint font-mono text-xs">{f.operation}</td>
                <td className="px-4 py-3 text-ink-soft">{f.error}</td>
                <td className="px-4 py-3"><Badge tone={f.status === 'resolved' ? 'signal' : f.status === 'retried' ? 'indigo' : 'amber'}>{f.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

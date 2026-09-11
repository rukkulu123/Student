import { format } from 'date-fns'
import { Badge } from '@/components/ui/Badge'
import type { AIUsageRecord } from '@/types'

export function AIUsageTable({ records }: { records: AIUsageRecord[] }) {
  return (
    <div className="surface-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-ink-faint">
            <th className="px-4 py-3 font-medium">Timestamp</th>
            <th className="px-4 py-3 font-medium">Feature</th>
            <th className="px-4 py-3 font-medium">Model</th>
            <th className="px-4 py-3 font-medium">Latency</th>
            <th className="px-4 py-3 font-medium">Tokens</th>
            <th className="px-4 py-3 font-medium">Cost</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b border-line last:border-0 hover:bg-paper-sunken/50">
              <td className="px-4 py-3 text-ink-soft whitespace-nowrap">{format(new Date(r.timestamp), 'MMM d, HH:mm')}</td>
              <td className="px-4 py-3 text-ink capitalize">{r.feature.replace('_', ' ')}</td>
              <td className="px-4 py-3 text-ink-faint font-mono text-xs">{r.model}</td>
              <td className="px-4 py-3 text-ink-soft">{r.latencyMs} ms</td>
              <td className="px-4 py-3 text-ink-soft">{r.inputTokens + r.outputTokens}</td>
              <td className="px-4 py-3 text-ink-soft">${r.costUsd.toFixed(3)}</td>
              <td className="px-4 py-3"><Badge tone={r.status === 'success' ? 'signal' : 'rust'}>{r.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { cn } from '@/lib/utils'

const ranges = [
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: '90d', label: '90 days' },
  { key: 'all', label: 'All time' },
]

export function AnalyticsFilters({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex rounded border border-line bg-paper-raised p-0.5">
      {ranges.map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          className={cn(
            'px-3 py-1 text-xs rounded transition-colors',
            value === r.key ? 'bg-ink text-paper-raised' : 'text-ink-faint hover:text-ink',
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}

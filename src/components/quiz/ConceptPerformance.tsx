import { ProgressBar } from '@/components/ui/ProgressBar'

export function ConceptPerformance({ data }: { data: { concept: string; accuracy: number }[] }) {
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.concept}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-ink">{d.concept}</span>
            <span className="text-ink-faint">{d.accuracy}%</span>
          </div>
          <ProgressBar value={d.accuracy} tone={d.accuracy < 60 ? 'amber' : 'signal'} />
        </div>
      ))}
    </div>
  )
}

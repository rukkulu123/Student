import { Check, Loader2 } from 'lucide-react'
import type { ProcessingStage } from '@/types'

const stages: { key: ProcessingStage; label: string }[] = [
  { key: 'uploading', label: 'Uploading' },
  { key: 'extracting_text', label: 'Extracting text' },
  { key: 'creating_knowledge', label: 'Creating knowledge' },
  { key: 'preparing_search', label: 'Preparing search' },
  { key: 'ready', label: 'Ready' },
]

export function ProcessingStatus({ stage }: { stage: ProcessingStage }) {
  const currentIndex = stages.findIndex((s) => s.key === stage)
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {stages.map((s, i) => {
        const done = i < currentIndex || stage === 'ready'
        const active = i === currentIndex && stage !== 'ready'
        return (
          <div key={s.key} className="flex items-center gap-1.5">
            <div
              className={`flex items-center gap-1 text-xs rounded-full px-2 py-0.5 ${
                done ? 'bg-signal-soft text-signal-strong' : active ? 'bg-indigo-soft text-indigo' : 'bg-paper-sunken text-ink-faint'
              }`}
            >
              {done ? <Check className="w-3 h-3" /> : active ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
              {s.label}
            </div>
            {i < stages.length - 1 && <span className="text-line">—</span>}
          </div>
        )
      })}
    </div>
  )
}

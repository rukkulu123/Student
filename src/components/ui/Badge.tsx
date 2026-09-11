import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'signal' | 'amber' | 'rust' | 'indigo' | 'neutral'

export function Badge({ tone = 'neutral', className, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  const tones: Record<Tone, string> = {
    signal: 'bg-signal-soft text-signal-strong',
    amber: 'bg-amber-soft text-amber',
    rust: 'bg-rust-soft text-rust',
    indigo: 'bg-indigo-soft text-indigo-strong',
    neutral: 'bg-paper-sunken text-ink-soft',
  }
  return (
    <span
      className={cn('inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium', tones[tone], className)}
      {...props}
    />
  )
}

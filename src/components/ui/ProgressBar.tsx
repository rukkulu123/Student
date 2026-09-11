import { cn } from '@/lib/utils'

export function ProgressBar({ value, tone = 'signal', className }: { value: number; tone?: 'signal' | 'amber'; className?: string }) {
  return (
    <div className={cn('h-1.5 w-full rounded-full bg-paper-sunken overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', tone === 'signal' ? 'bg-signal' : 'bg-amber')}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

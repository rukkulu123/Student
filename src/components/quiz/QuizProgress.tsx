export function QuizProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-ink-faint">Question {current} of {total}</p>
      <div className="h-1.5 w-full rounded-full bg-paper-sunken overflow-hidden">
        <div className="h-full bg-signal rounded-full transition-all duration-300" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  )
}

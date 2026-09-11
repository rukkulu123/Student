import { cn } from '@/lib/utils'

const toneColor = {
  signal: '#3F7A5C',
  amber: '#C98A2E',
  indigo: '#5B4FE8',
  rust: '#B23A2E',
}

export function RadialGauge({
  value,
  size = 96,
  strokeWidth = 8,
  tone = 'signal',
  label,
  className,
}: {
  value: number
  size?: number
  strokeWidth?: number
  tone?: keyof typeof toneColor
  label?: string
  className?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  const offset = circumference * (1 - clamped / 100)
  const color = toneColor[tone]

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#EBE7DD" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-lg leading-none text-ink">{Math.round(clamped)}%</span>
        {label && <span className="text-[10px] text-ink-faint mt-1 text-center leading-tight px-1">{label}</span>}
      </div>
    </div>
  )
}

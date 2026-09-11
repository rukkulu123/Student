import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

export function TabNav({ tabs }: { tabs: { label: string; to: string; end?: boolean }[] }) {
  return (
    <div className="flex gap-1 border-b border-line overflow-x-auto">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            cn(
              'px-3.5 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
              isActive ? 'border-signal text-ink' : 'border-transparent text-ink-faint hover:text-ink-soft',
            )
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  )
}

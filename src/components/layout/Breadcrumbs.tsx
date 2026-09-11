import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-faint min-w-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 min-w-0">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-ink truncate">{item.label}</Link>
          ) : (
            <span className="text-ink truncate">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

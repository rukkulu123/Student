import { Search, Bell } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import type { ReactNode } from 'react'

export function Topbar({ breadcrumbs }: { breadcrumbs?: ReactNode }) {
  const { user, logout } = useAuth()
  return (
    <header className="h-14 border-b border-line bg-paper-raised/90 backdrop-blur sticky top-0 z-10 flex items-center gap-4 px-4 md:px-6">
      <div className="flex-1 min-w-0">{breadcrumbs}</div>

      <div className="hidden sm:flex items-center gap-1.5 text-ink-faint text-sm bg-paper-sunken rounded px-2.5 py-1.5 w-56">
        <Search className="w-3.5 h-3.5" />
        <span>Search...</span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-indigo-strong bg-indigo-soft rounded-full px-2.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse" />
        <span className="hidden md:inline">AI grounded</span>
      </div>

      <button className="text-ink-faint hover:text-ink" aria-label="Notifications">
        <Bell className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 pl-2 border-l border-line">
        <div className="w-7 h-7 rounded-full bg-ink text-paper-raised flex items-center justify-center text-xs font-medium font-display">
          {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div className="hidden lg:block leading-tight">
          <div className="text-sm text-ink">{user?.name}</div>
        </div>
        <button onClick={logout} className="text-xs text-ink-faint hover:text-ink ml-1">Log out</button>
      </div>
    </header>
  )
}

import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, FolderKanban, Activity, BarChart3, Sparkles, ShieldCheck, HeartPulse, ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Spaces & Projects', icon: FolderKanban },
  { to: '/admin/activity', label: 'Activity', icon: Activity },
  { to: '/admin/analytics', label: 'Learning Analytics', icon: BarChart3 },
  { to: '/admin/ai-usage', label: 'AI Usage', icon: Sparkles },
  { to: '/admin/ai-evaluation', label: 'AI Evaluation', icon: ShieldCheck },
  { to: '/admin/system-health', label: 'System Health', icon: HeartPulse },
]

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-rail h-screen sticky top-0 shadow-rail">
        <div className="px-4 h-14 flex items-center gap-2 border-b border-rail-line">
          <span className="font-display text-[16px] text-white">Aurelia</span>
          <span className="text-[10px] font-mono uppercase tracking-wide text-amber bg-amber/15 rounded px-1.5 py-0.5">Admin</span>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-0.5 ml-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn('group flex items-center gap-2.5 rounded px-2.5 py-1.5 text-[13px] relative', isActive ? 'text-white font-medium' : 'text-rail-text hover:text-white')
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  {isActive && <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-amber" />}
                  <item.icon className={cn('w-4 h-4', isActive ? 'text-amber' : 'text-rail-text group-hover:text-white')} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-rail-line ml-3">
          <NavLink to="/app/dashboard" className="flex items-center gap-2 text-xs text-rail-text hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to app
          </NavLink>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="h-14 border-b border-line bg-paper-raised flex items-center px-6">
          <h1 className="text-base font-display">{title}</h1>
        </header>
        <main className="px-4 md:px-8 py-6 max-w-[1200px] mx-auto">{children}</main>
      </div>
    </div>
  )
}

import { NavLink, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import {
  Home, Layers, BarChart3, BookOpen, FileText, MessageCircle, ListChecks,
  PenLine, TrendingUp, PieChart, Activity, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getProject } from '@/api/projects'

function NavItem({ to, icon: Icon, label, end }: { to: string; icon: any; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-2.5 rounded px-2.5 py-1.5 text-[13px] transition-colors relative',
          isActive ? 'text-white font-medium' : 'text-rail-text hover:text-white',
        )
      }
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          {isActive && <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-indigo" />}
          <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-indigo' : 'text-rail-text group-hover:text-white')} />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="px-2.5 pt-5 pb-1.5 eyebrow text-white/35">{children}</div>
}

export function Sidebar() {
  const { projectId } = useParams()
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId!),
    enabled: !!projectId,
  })

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-rail h-screen sticky top-0 shadow-rail">
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-rail-line">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9.5" stroke="#5B4FE8" strokeWidth="1.6" />
          <path d="M11 5.5V11L14.5 14" stroke="#5B4FE8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="font-display text-[16px] text-white tracking-tight">Aurelia</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 ml-3">
        <NavItem to="/app/dashboard" icon={Home} label="Home" />
        <NavItem to="/app/spaces" icon={Layers} label="Spaces" />
        <NavItem to="/app/analytics" icon={BarChart3} label="Analytics" />

        {project && (
          <>
            <SectionLabel>{project.name}</SectionLabel>
            <NavItem to={`/app/projects/${project.id}/overview`} icon={BookOpen} label="Overview" end />
            <NavItem to={`/app/projects/${project.id}/materials`} icon={FileText} label="Materials" />
            <NavItem to={`/app/projects/${project.id}/tutor`} icon={MessageCircle} label="Tutor" />
            <NavItem to={`/app/projects/${project.id}/quiz`} icon={ListChecks} label="Quiz" />
            <NavItem to={`/app/projects/${project.id}/assessment`} icon={PenLine} label="Assessment" />
            <NavItem to={`/app/projects/${project.id}/growth`} icon={TrendingUp} label="Growth" />
            <NavItem to={`/app/projects/${project.id}/analytics`} icon={PieChart} label="Project Analytics" />
          </>
        )}

        <SectionLabel>System</SectionLabel>
        <NavItem to="/app/activity" icon={Activity} label="Activity" />
        <NavItem to="/app/settings" icon={Settings} label="Settings" />
      </nav>
    </aside>
  )
}

import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppShell({ breadcrumbs, children }: { breadcrumbs?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar breadcrumbs={breadcrumbs} />
        <main className="flex-1 px-4 md:px-8 py-6 max-w-[1200px] w-full mx-auto">{children}</main>
      </div>
    </div>
  )
}

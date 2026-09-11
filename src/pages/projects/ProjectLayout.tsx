import { Outlet, useParams } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { TabNav } from '@/components/ui/Tabs'
import { ProjectProvider } from '@/context/ProjectContext'
import { useProject } from '@/hooks/useProject'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SkeletonCard } from '@/components/ui/Skeleton'

function ProjectHeader() {
  const { project, isLoading } = useProject()
  if (isLoading || !project) return <SkeletonCard />
  return (
    <div className="mb-5 space-y-3">
      <div>
        <p className="text-xs text-ink-faint">{project.spaceName}</p>
        <h1 className="text-xl font-display text-ink">{project.name}</h1>
        <p className="text-sm text-ink-faint mt-0.5 max-w-xl">{project.learningGoal}</p>
      </div>
      <div className="flex items-center gap-4 max-w-xs">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-ink-soft mb-1">
            <span>Mastery</span><span>{project.overallMastery}%</span>
          </div>
          <ProgressBar value={project.overallMastery} />
        </div>
      </div>
    </div>
  )
}

export default function ProjectLayout() {
  const { projectId = '' } = useParams()
  return (
    <ProjectProvider>
      <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Spaces', to: '/app/spaces' }, { label: 'Project' }]} />}>
        <ProjectHeader />
        <TabNav
          tabs={[
            { label: 'Overview', to: `/app/projects/${projectId}/overview`, end: true },
            { label: 'Materials', to: `/app/projects/${projectId}/materials` },
            { label: 'Tutor', to: `/app/projects/${projectId}/tutor` },
            { label: 'Quiz', to: `/app/projects/${projectId}/quiz` },
            { label: 'Assessment', to: `/app/projects/${projectId}/assessment` },
            { label: 'Growth', to: `/app/projects/${projectId}/growth` },
            { label: 'Analytics', to: `/app/projects/${projectId}/analytics` },
          ]}
        />
        <div className="pt-6">
          <Outlet />
        </div>
      </AppShell>
    </ProjectProvider>
  )
}

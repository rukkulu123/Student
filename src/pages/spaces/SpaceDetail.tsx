import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Card, CardBody } from '@/components/ui/Card'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProjectCard } from '@/components/learning/ProjectCard'
import { getSpace } from '@/api/spaces'
import { listProjects } from '@/api/projects'
import { FolderPlus } from 'lucide-react'

export default function SpaceDetail() {
  const { spaceId = '' } = useParams()
  const { data: space, isLoading, isError, refetch } = useQuery({ queryKey: ['space', spaceId], queryFn: () => getSpace(spaceId) })
  const { data: projects, isLoading: projectsLoading } = useQuery({ queryKey: ['projects', spaceId], queryFn: () => listProjects(spaceId) })

  if (isError) {
    return (
      <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Spaces', to: '/app/spaces' }]} />}>
        <ErrorState onRetry={() => refetch()} />
      </AppShell>
    )
  }

  return (
    <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Spaces', to: '/app/spaces' }, { label: space?.name ?? '...' }]} />}>
      {isLoading && <SkeletonCard />}
      {space && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-display">{space.name}</h1>
            <p className="text-ink-faint mt-1 max-w-xl">{space.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg">
            <Card><CardBody><p className="text-xs text-ink-faint">Projects</p><p className="text-xl font-display">{space.projectCount}</p></CardBody></Card>
            <Card><CardBody><p className="text-xs text-ink-faint">Mastery</p><p className="text-xl font-display">{space.overallMastery}%</p></CardBody></Card>
            <Card><CardBody><p className="text-xs text-ink-faint">Status</p><p className="text-xl font-display capitalize">{space.status}</p></CardBody></Card>
          </div>

          <div>
            <h2 className="text-base font-display mb-3">Projects</h2>
            {projectsLoading && <SkeletonCard />}
            {!projectsLoading && projects?.length === 0 && (
              <EmptyState icon={<FolderPlus className="w-6 h-6" />} title="Create a focused learning project to begin." description="Projects turn a broad topic into a measurable learning journey with materials, a tutor, and mastery tracking." />
            )}
            {!projectsLoading && projects && projects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}

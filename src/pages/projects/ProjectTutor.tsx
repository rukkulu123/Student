import { useProject } from '@/hooks/useProject'
import { TutorChat } from '@/components/tutor/TutorChat'
import { ContextPanel } from '@/components/tutor/ContextPanel'
import { SkeletonCard } from '@/components/ui/Skeleton'

export default function ProjectTutor() {
  const { project, concepts, isLoading } = useProject()

  if (isLoading || !project) return <SkeletonCard />

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      <div className="order-2 lg:order-1">
        <ContextPanel project={project} concepts={concepts} />
      </div>
      <div className="order-1 lg:order-2">
        <TutorChat projectId={project.id} />
      </div>
    </div>
  )
}

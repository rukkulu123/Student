import { useQuery, useMutation } from '@tanstack/react-query'
import { useProject } from '@/hooks/useProject'
import { AssessmentEditor } from '@/components/assessment/AssessmentEditor'
import { AssessmentResultView } from '@/components/assessment/AssessmentResult'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { getAssessment, submitAssessment } from '@/api/assessment'

export default function ProjectAssessment() {
  const { project } = useProject()

  const { data: assessment, isLoading, isError, refetch } = useQuery({
    queryKey: ['assessment', project?.id],
    queryFn: () => getAssessment(project!.id),
    enabled: !!project,
  })

  const submitMutation = useMutation({
    mutationFn: (answer: string) => submitAssessment(assessment!.id, answer),
  })

  if (!project) return null
  if (isLoading) return <SkeletonCard />
  if (isError || !assessment) return <ErrorState message="Unable to generate an assessment right now." onRetry={() => refetch()} />

  if (submitMutation.data) {
    return <AssessmentResultView result={submitMutation.data} projectId={project.id} />
  }

  return (
    <AssessmentEditor
      assessment={assessment}
      submitting={submitMutation.isPending}
      onSubmit={(answer) => submitMutation.mutate(answer)}
    />
  )
}

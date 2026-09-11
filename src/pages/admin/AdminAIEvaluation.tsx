import { useQuery } from '@tanstack/react-query'
import { AdminShell } from '@/components/admin/AdminShell'
import { EvaluationPanel } from '@/components/admin/EvaluationPanel'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { listEvaluationScores } from '@/api/evaluation'

export default function AdminAIEvaluation() {
  const { data: scores, isLoading } = useQuery({ queryKey: ['ai-evaluation'], queryFn: listEvaluationScores })
  return (
    <AdminShell title="AI Evaluation">
      {isLoading ? <SkeletonCard /> : <EvaluationPanel scores={scores ?? []} />}
    </AdminShell>
  )
}

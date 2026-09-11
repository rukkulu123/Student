import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useProject } from '@/hooks/useProject'
import { QuizHeader } from '@/components/quiz/QuizHeader'
import { QuizProgress } from '@/components/quiz/QuizProgress'
import { QuizQuestionCard } from '@/components/quiz/QuizQuestion'
import { QuizResultView } from '@/components/quiz/QuizResult'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { getAdaptiveQuiz, submitQuiz } from '@/api/quiz'
import type { QuizAnswer } from '@/types'

type Phase = 'intro' | 'question' | 'complete'

export default function ProjectQuiz() {
  const { project } = useProject()
  const [phase, setPhase] = useState<Phase>('intro')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])

  const { data: quiz, isLoading, isError, refetch } = useQuery({
    queryKey: ['quiz', project?.id],
    queryFn: () => getAdaptiveQuiz(project!.id),
    enabled: !!project,
  })

  const submitMutation = useMutation({
    mutationFn: (finalAnswers: QuizAnswer[]) => submitQuiz(quiz!.id, finalAnswers),
    onSuccess: () => setPhase('complete'),
  })

  if (!project) return null
  if (isLoading) return <SkeletonCard />
  if (isError || !quiz) return <ErrorState message="Unable to generate a quiz right now." onRetry={() => refetch()} />

  const question = quiz.questions[index]

  function selectChoice(choiceId: string) {
    if (revealed) return
    setSelected(choiceId)
  }

  function next() {
    if (!revealed) {
      const correct = selected === question.correctChoiceId
      setAnswers((prev) => [...prev, { questionId: question.id, choiceId: selected!, correct }])
      setRevealed(true)
      return
    }
    if (index + 1 < quiz.questions.length) {
      setIndex((i) => i + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      submitMutation.mutate(answers)
    }
  }

  if (phase === 'intro') {
    return <QuizHeader quiz={quiz} onStart={() => setPhase('question')} />
  }

  if (phase === 'complete' && submitMutation.data) {
    return <QuizResultView result={submitMutation.data} projectId={project.id} />
  }

  return (
    <Card>
      <CardBody className="space-y-6">
        <QuizProgress current={index + 1} total={quiz.questions.length} />
        <QuizQuestionCard question={question} selected={selected} revealed={revealed} onSelect={selectChoice} />
        <div className="flex justify-end">
          <Button onClick={next} disabled={!selected && !revealed}>
            {!revealed ? 'Submit answer' : index + 1 < quiz.questions.length ? 'Next question' : submitMutation.isPending ? 'Scoring...' : 'Finish quiz'}
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useProject } from '@/hooks/useProject'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { RadialGauge } from '@/components/ui/RadialGauge'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { ConceptCard } from '@/components/learning/ConceptCard'
import { RecommendationCard } from '@/components/learning/RecommendationCard'
import { ActivityTimeline } from '@/components/learning/ActivityTimeline'
import { MasteryChart } from '@/components/learning/MasteryChart'
import { listMaterials } from '@/api/materials'
import { getMasteryHistory } from '@/api/mastery'
import { getQuizHistory } from '@/api/quiz'
import { getConversation } from '@/api/tutor'

const statusCopy: Record<string, string> = {
  getting_started: 'Getting Started', learning: 'Learning', improving: 'Improving',
  strong: 'Strong', needs_attention: 'Needs Attention',
}

export default function ProjectOverview() {
  const { project, concepts, recentActivity, recommendation, isLoading } = useProject()
  const { data: materials } = useQuery({ queryKey: ['materials', project?.id], queryFn: () => listMaterials(project!.id), enabled: !!project })
  const { data: masteryHistory } = useQuery({ queryKey: ['mastery-history', project?.id], queryFn: () => getMasteryHistory(project!.id), enabled: !!project })
  const { data: quizHistory } = useQuery({ queryKey: ['quiz-history', project?.id], queryFn: () => getQuizHistory(project!.id), enabled: !!project })
  const { data: conversation } = useQuery({ queryKey: ['tutor-conversation', project?.id], queryFn: () => getConversation(project!.id), enabled: !!project })

  if (isLoading || !project) return <SkeletonCard />

  const tutorQuestions = conversation?.filter((m) => m.role === 'user').length ?? 0
  const lastQuiz = quizHistory?.[0]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card accent="indigo"><CardBody className="flex items-center gap-4">
            <RadialGauge value={project.overallMastery} size={56} strokeWidth={5} tone="indigo" />
            <div>
              <p className="text-xs text-ink-faint">Current mastery</p>
              <p className="text-2xl font-display numeral">{project.overallMastery}%</p>
            </div>
          </CardBody></Card>
          <Card><CardBody>
            <p className="text-xs text-ink-faint">Learning status</p>
            <Badge tone="indigo">{statusCopy[project.status]}</Badge>
          </CardBody></Card>
        </div>

        <div>
          <h2 className="text-base font-display mb-3">Concepts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {concepts.map((c) => <ConceptCard key={c.id} concept={c} />)}
          </div>
        </div>

        {recommendation && <RecommendationCard recommendation={recommendation} />}

        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <CardBody><ActivityTimeline events={recentActivity.slice(0, 6)} /></CardBody>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Growth snapshot</CardTitle></CardHeader>
          <CardBody>
            {masteryHistory && masteryHistory.length > 0 ? (
              <MasteryChart data={masteryHistory} height={140} />
            ) : (
              <p className="text-sm text-ink-faint">No mastery history yet.</p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Materials</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            <p className="text-sm text-ink-soft">{materials?.filter((m) => m.status === 'ready').length ?? 0} ready · {materials?.length ?? 0} total</p>
            <Link to={`/app/projects/${project.id}/materials`}><Button size="sm" variant="secondary">View materials</Button></Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tutor summary</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            <p className="text-sm text-ink-soft">You have asked {tutorQuestions} question{tutorQuestions === 1 ? '' : 's'} in this project.</p>
            <Link to={`/app/projects/${project.id}/tutor`}><Button size="sm" variant="secondary">Open Tutor</Button></Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Quiz performance</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            <p className="text-sm text-ink-soft">{lastQuiz ? `Last quiz: ${lastQuiz.score}%` : 'No quiz attempts yet.'}</p>
            <Link to={`/app/projects/${project.id}/quiz`}><Button size="sm" variant="secondary">Take a quiz</Button></Link>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

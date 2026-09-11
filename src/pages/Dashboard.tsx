import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers, CalendarCheck, Target } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RadialGauge } from '@/components/ui/RadialGauge'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { ProjectCard } from '@/components/learning/ProjectCard'
import { RecommendationCard } from '@/components/learning/RecommendationCard'
import { ActivityTimeline } from '@/components/learning/ActivityTimeline'
import { useAuth } from '@/hooks/useAuth'
import { listProjects } from '@/api/projects'
import { getRecommendations } from '@/api/recommendations'
import { getActivity } from '@/api/activity'
import { concepts as mockConcepts } from '@/mocks/data'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  const { data: projects, isLoading: projectsLoading } = useQuery({ queryKey: ['projects'], queryFn: () => listProjects() })
  const { data: recommendations } = useQuery({ queryKey: ['recommendations'], queryFn: () => getRecommendations() })
  const { data: activity } = useQuery({ queryKey: ['activity'], queryFn: () => getActivity() })

  const continueProject = projects?.[0]
  const topRecommendation = recommendations?.[0]
  const attentionConcepts = mockConcepts.filter((c) => c.status === 'needs_attention').slice(0, 2)

  const overallMastery = projects && projects.length > 0
    ? Math.round(projects.reduce((s, p) => s + p.overallMastery, 0) / projects.length)
    : 0

  return (
    <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Home' }]} />}>
      <div className="space-y-8">
        <div>
          <p className="eyebrow mb-1.5">{greeting()}</p>
          <h1 className="text-3xl md:text-[2.25rem] font-display italic text-ink leading-[1.1]">
            {user?.name?.split(' ')[0]}.
          </h1>
          {continueProject && (
            <p className="text-ink-faint mt-2 max-w-md">Continue building your understanding of {continueProject.name}.</p>
          )}
        </div>

        {/* Continue Learning */}
        {projectsLoading && <SkeletonCard />}
        {continueProject && (
          <Card className="bg-ink text-paper-raised border-none">
            <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <RadialGauge value={continueProject.progress} size={72} strokeWidth={6} tone="indigo" />
                <div>
                  <p className="text-xs text-paper-raised/55 mb-1">{continueProject.spaceName}</p>
                  <h2 className="text-xl font-display mb-1.5">{continueProject.name}</h2>
                  <p className="text-sm text-paper-raised/75 max-w-md">{continueProject.learningGoal}</p>
                </div>
              </div>
              <Link to={`/app/projects/${continueProject.id}/overview`}>
                <Button variant="secondary" className="bg-paper-raised text-ink whitespace-nowrap border-none">
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardBody>
          </Card>
        )}

        {/* Overall progress */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card accent="indigo"><CardBody className="space-y-1">
            <div className="flex items-center gap-1.5 text-ink-faint text-xs"><Target className="w-3.5 h-3.5" /> Overall mastery</div>
            <p className="text-2xl font-display numeral">{overallMastery}%</p>
          </CardBody></Card>
          <Card accent="signal"><CardBody className="space-y-1">
            <div className="flex items-center gap-1.5 text-ink-faint text-xs"><Layers className="w-3.5 h-3.5" /> Active projects</div>
            <p className="text-2xl font-display numeral">{projects?.length ?? 0}</p>
          </CardBody></Card>
          <Card accent="amber"><CardBody className="space-y-1">
            <div className="flex items-center gap-1.5 text-ink-faint text-xs"><CalendarCheck className="w-3.5 h-3.5" /> Active learning days</div>
            <p className="text-2xl font-display numeral">19</p>
          </CardBody></Card>
          <Card><CardBody className="space-y-1">
            <div className="flex items-center gap-1.5 text-ink-faint text-xs">Assessment avg.</div>
            <p className="text-2xl font-display numeral">71%</p>
          </CardBody></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-display">Recent projects</h2>
                <Link to="/app/spaces" className="text-xs text-signal-strong hover:underline">View all spaces</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectsLoading && <><SkeletonCard /><SkeletonCard /></>}
                {projects?.slice(0, 4).map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
            </div>

            {attentionConcepts.length > 0 && (
              <div>
                <h2 className="text-base font-display mb-3">Areas to improve</h2>
                <div className="space-y-3">
                  {attentionConcepts.map((c) => (
                    <Card key={c.id}>
                      <CardBody className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-ink">{c.name}</p>
                          <p className="text-xs text-ink-faint mt-0.5">Mastery: {c.mastery}%</p>
                          <p className="text-xs text-ink-faint">Repeated mistakes in {c.name.toLowerCase()} questions.</p>
                        </div>
                        <Link to={`/app/projects/pr_rag/quiz`}>
                          <Button size="sm" variant="secondary">Practice now</Button>
                        </Link>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {topRecommendation && <RecommendationCard recommendation={topRecommendation} />}
            <Card>
              <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
              <CardBody>
                <ActivityTimeline events={(activity ?? []).slice(0, 6)} showProject />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

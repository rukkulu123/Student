import { useQuery } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import { useProject } from '@/hooks/useProject'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { MasteryChart } from '@/components/learning/MasteryChart'
import { TrendChart } from '@/components/analytics/TrendChart'
import { getGrowthInsights, getGrowthSummary } from '@/api/growth'
import { getMasteryHistory } from '@/api/mastery'
import { getProjectAnalytics } from '@/api/analytics'

const insightTone = { positive: 'text-signal-strong', attention: 'text-amber', pattern: 'text-indigo' }

export default function ProjectGrowth() {
  const { project, concepts } = useProject()

  const { data: history } = useQuery({ queryKey: ['mastery-history', project?.id], queryFn: () => getMasteryHistory(project!.id), enabled: !!project })
  const { data: insights } = useQuery({ queryKey: ['growth-insights', project?.id], queryFn: () => getGrowthInsights(project!.id), enabled: !!project })
  const { data: summary } = useQuery({ queryKey: ['growth-summary', project?.id], queryFn: () => getGrowthSummary(project!.id), enabled: !!project })
  const { data: analytics } = useQuery({ queryKey: ['project-analytics', project?.id, 'growth'], queryFn: () => getProjectAnalytics(project!.id, '30d'), enabled: !!project })

  if (!project) return <SkeletonCard />

  const strongest = [...concepts].sort((a, b) => b.mastery - a.mastery).slice(0, 3)
  const attention = [...concepts].sort((a, b) => a.mastery - b.mastery).filter((c) => c.status === 'needs_attention').slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody className="text-center py-6">
            <p className="text-xs text-ink-faint">Overall growth ({summary?.windowDays ?? 14} days)</p>
            <p className="text-4xl font-display italic text-signal-strong">+{summary?.overallMasteryDelta ?? 0}%</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Mastery over time</CardTitle></CardHeader>
          <CardBody>{history && <MasteryChart data={history} height={140} />}</CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Strongest concepts</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            {strongest.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span className="text-ink">{i + 1}. {c.name}</span>
                <span className="text-ink-faint">{c.mastery}%</span>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Concepts needing attention</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            {attention.length === 0 && <p className="text-sm text-ink-faint">No concepts currently need attention.</p>}
            {attention.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span className="text-ink">{i + 1}. {c.name}</span>
                <span className="text-ink-faint">{c.mastery}%</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Assessment trend</CardTitle></CardHeader>
          <CardBody>{analytics && <TrendChart data={analytics.assessmentTrend} color="#5B4FE8" valueLabel="Score" />}</CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Learning activity</CardTitle></CardHeader>
          <CardBody>{analytics && <TrendChart data={analytics.activityTrend} color="#B8843A" valueLabel="Sessions" />}</CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>AI learning insights</CardTitle></CardHeader>
        <CardBody className="space-y-3">
          {insights?.map((insight) => (
            <div key={insight.id} className="flex items-start gap-2.5">
              <Sparkles className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${insightTone[insight.kind]}`} />
              <p className="text-sm text-ink-soft">{insight.text}</p>
            </div>
          ))}
        </CardBody>
      </Card>

      {summary && (
        <Card>
          <CardBody>
            <p className="text-sm text-ink leading-relaxed">{summary.narrative}</p>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

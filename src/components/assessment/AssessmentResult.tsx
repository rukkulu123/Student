import { Link } from 'react-router-dom'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { FeedbackSection } from './FeedbackSection'
import type { AssessmentResult as AssessmentResultType } from '@/types'

const understandingTone = { strong: 'signal', developing: 'indigo', needs_attention: 'amber' } as const
const understandingLabel = { strong: 'Strong', developing: 'Developing', needs_attention: 'Needs attention' }

export function AssessmentResultView({ result, projectId }: { result: AssessmentResultType; projectId: string }) {
  const breakdown = [
    { label: 'Accuracy', value: result.accuracy },
    { label: 'Completeness', value: result.completeness },
    { label: 'Reasoning', value: result.reasoning },
    { label: 'Concept understanding', value: result.conceptUnderstanding },
  ]
  return (
    <div className="space-y-5">
      <Card>
        <CardBody className="text-center py-8 space-y-2">
          <p className="text-xs text-ink-faint">Overall score</p>
          <p className="text-4xl font-display italic">{result.overallScore}%</p>
          <Badge tone={understandingTone[result.understanding]}>{understandingLabel[result.understanding]}</Badge>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          {breakdown.map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-ink">{b.label}</span>
                <span className="text-ink-faint">{b.value}%</span>
              </div>
              <ProgressBar value={b.value} tone={b.value < 60 ? 'amber' : 'signal'} />
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <FeedbackSection title="What you understood" text={result.whatYouUnderstood} />
          <FeedbackSection title="What is missing" text={result.whatIsMissing} />
          <FeedbackSection title="How to improve" text={result.howToImprove} />
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-3">
          <p className="text-sm text-ink">{result.recommendedNextStep}</p>
          <div className="flex flex-wrap gap-2">
            <Link to={`/app/projects/${projectId}/tutor`}><Button size="sm">Practice with Tutor</Button></Link>
            <Link to={`/app/projects/${projectId}/growth`}><Button size="sm" variant="secondary">View growth</Button></Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

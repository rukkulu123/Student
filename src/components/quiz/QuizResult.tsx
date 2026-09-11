import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ConceptPerformance } from './ConceptPerformance'
import type { QuizResult as QuizResultType } from '@/types'

export function QuizResultView({ result, projectId }: { result: QuizResultType; projectId: string }) {
  return (
    <div className="space-y-5">
      <Card>
        <CardBody className="text-center py-8 space-y-2">
          <p className="text-xs text-ink-faint">Score</p>
          <p className="text-4xl font-display italic">{result.score}%</p>
          <p className="text-sm text-ink-soft">Accuracy across {result.answers.length} questions</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Concept performance</CardTitle></CardHeader>
        <CardBody><ConceptPerformance data={result.conceptPerformance} /></CardBody>
      </Card>

      {result.weakConcepts.length > 0 && (
        <Card>
          <CardBody className="space-y-3">
            <p className="text-sm text-ink">
              Your weakest area is <span className="font-medium">{result.weakConcepts[0]}</span>.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link to={`/app/projects/${projectId}/tutor`}><Button size="sm">Practice with Tutor</Button></Link>
              <Link to={`/app/projects/${projectId}/quiz`}><Button size="sm" variant="secondary">Take targeted quiz</Button></Link>
              <Link to={`/app/projects/${projectId}/materials`}><Button size="sm" variant="secondary">Review material</Button></Link>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

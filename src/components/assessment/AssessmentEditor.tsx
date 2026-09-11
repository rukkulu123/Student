import { useState } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Assessment } from '@/types'

export function AssessmentEditor({
  assessment, onSubmit, submitting,
}: { assessment: Assessment; onSubmit: (answer: string) => void; submitting: boolean }) {
  const [answer, setAnswer] = useState('')
  return (
    <Card>
      <CardBody className="space-y-4">
        <div>
          <p className="text-xs text-ink-faint mb-1.5">Prompt</p>
          <p className="text-base text-ink leading-relaxed">{assessment.prompt}</p>
        </div>
        <div>
          <p className="text-xs text-ink-faint mb-1.5">What would a strong answer include?</p>
          <p className="text-sm text-ink-soft bg-paper-sunken rounded p-3">{assessment.expectationHint}</p>
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Write your answer here..."
          className="w-full rounded border border-line bg-paper px-3 py-2.5 text-sm focus:border-signal focus:outline-none resize-y"
        />
        <Button onClick={() => onSubmit(answer)} disabled={!answer.trim() || submitting}>
          {submitting ? 'Evaluating your understanding...' : 'Submit answer'}
        </Button>
      </CardBody>
    </Card>
  )
}

import { Sparkles, Clock, ListChecks } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Quiz } from '@/types'

export function QuizHeader({ quiz, onStart }: { quiz: Quiz; onStart: () => void }) {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-strong text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Adaptive quiz</span>
        </div>
        <h2 className="text-xl font-display">{quiz.topic}</h2>
        <p className="text-sm text-ink-soft">{quiz.reason}</p>
        <div className="flex items-center gap-4 text-xs text-ink-faint">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~{quiz.estimatedMinutes} min</span>
          <span className="flex items-center gap-1"><ListChecks className="w-3.5 h-3.5" /> {quiz.questions.length} questions</span>
          <Badge tone="amber">{quiz.difficulty}</Badge>
        </div>
        <Button onClick={onStart}>Start quiz</Button>
      </CardBody>
    </Card>
  )
}

import { AlertTriangle } from 'lucide-react'
import { Button } from './Button'
import { Card, CardBody } from './Card'

export function ErrorState({
  message = "We couldn't load this page.", onRetry, onBack,
}: { message?: string; onRetry?: () => void; onBack?: () => void }) {
  return (
    <Card>
      <CardBody className="flex flex-col items-center text-center py-12 px-6">
        <AlertTriangle className="w-6 h-6 text-rust mb-3" />
        <p className="text-sm text-ink-soft max-w-sm mb-4">{message}</p>
        <div className="flex gap-2">
          {onBack && <Button variant="secondary" onClick={onBack}>Go back</Button>}
          {onRetry && <Button onClick={onRetry}>Try again</Button>}
        </div>
      </CardBody>
    </Card>
  )
}

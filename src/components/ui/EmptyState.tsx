import type { ReactNode } from 'react'
import { Card, CardBody } from './Card'

export function EmptyState({
  title, description, action, icon,
}: { title: string; description: string; action?: ReactNode; icon?: ReactNode }) {
  return (
    <Card>
      <CardBody className="flex flex-col items-center text-center py-12 px-6">
        {icon && <div className="mb-3 text-ink-faint">{icon}</div>}
        <h3 className="text-base font-semibold text-ink mb-1">{title}</h3>
        <p className="text-sm text-ink-faint max-w-sm mb-4">{description}</p>
        {action}
      </CardBody>
    </Card>
  )
}

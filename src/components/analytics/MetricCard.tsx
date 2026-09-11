import type { ReactNode } from 'react'
import { Card, CardBody } from '@/components/ui/Card'

export function MetricCard({ label, value, hint, icon }: { label: string; value: string | number; hint?: string; icon?: ReactNode }) {
  return (
    <Card>
      <CardBody className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-faint">{label}</p>
          {icon && <div className="text-ink-faint">{icon}</div>}
        </div>
        <p className="text-2xl font-display text-ink">{value}</p>
        {hint && <p className="text-xs text-ink-faint">{hint}</p>}
      </CardBody>
    </Card>
  )
}

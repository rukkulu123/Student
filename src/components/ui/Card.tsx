import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, accent, ...props }: HTMLAttributes<HTMLDivElement> & { accent?: 'signal' | 'amber' | 'indigo' | 'rust' }) {
  const accentColor = { signal: '#3F7A5C', amber: '#C98A2E', indigo: '#5B4FE8', rust: '#B23A2E' }
  return (
    <div
      className={cn('surface-card relative overflow-hidden', className)}
      style={accent ? { borderLeft: `3px solid ${accentColor[accent]}` } : undefined}
      {...props}
    />
  )
}
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pt-5', className)} {...props} />
}
export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pb-5', className)} {...props} />
}
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base font-semibold text-ink', className)} {...props} />
}

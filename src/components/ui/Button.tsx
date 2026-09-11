import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent'
  size?: 'sm' | 'md'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
          size === 'md' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs',
          variant === 'primary' && 'bg-ink text-paper-raised hover:bg-ink-soft',
          variant === 'secondary' && 'bg-paper-raised text-ink border border-line hover:border-ink-faint',
          variant === 'ghost' && 'text-ink-soft hover:bg-paper-sunken',
          variant === 'danger' && 'bg-rust text-paper-raised hover:opacity-90',
          variant === 'accent' && 'bg-indigo text-white hover:bg-indigo-strong',
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

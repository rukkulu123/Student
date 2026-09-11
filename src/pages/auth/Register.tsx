import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Enter your name.'),
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  confirmPassword: z.string(),
}).refine((v) => v.password === v.confirmPassword, { message: 'Passwords do not match.', path: ['confirmPassword'] })
type FormValues = z.infer<typeof schema>

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    setSubmitting(true)
    try {
      await registerUser(values.name, values.email, values.password)
      navigate('/app/dashboard')
    } catch {
      setServerError('We could not create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <svg width="34" height="34" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="9.5" stroke="#5B4FE8" strokeWidth="1.4" />
            <path d="M11 5.5V11L14.5 14" stroke="#5B4FE8" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="font-display italic text-2xl text-white">Aurelia</span>
        </div>

        <div className="surface-card p-6">
          <h1 className="text-lg font-display mb-1">Create your account</h1>
          <p className="text-sm text-ink-faint mb-6">Start a focused, measurable learning journey.</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-ink-soft block mb-1">Name</label>
              <input id="name" {...register('name')} className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none" />
              {errors.name && <p className="text-xs text-rust mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-ink-soft block mb-1">Email</label>
              <input id="email" type="email" {...register('email')} className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none" />
              {errors.email && <p className="text-xs text-rust mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-ink-soft block mb-1">Password</label>
              <input id="password" type="password" {...register('password')} className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none" />
              {errors.password && <p className="text-xs text-rust mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm text-ink-soft block mb-1">Confirm password</label>
              <input id="confirmPassword" type="password" {...register('confirmPassword')} className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none" />
              {errors.confirmPassword && <p className="text-xs text-rust mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {serverError && <p className="text-xs text-rust" role="alert">{serverError}</p>}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create account'}
            </Button>
          </form>

          <p className="text-center text-xs mt-4">
            <span className="text-ink-faint">Already have an account? </span>
            <Link to="/login" className="text-signal-strong hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

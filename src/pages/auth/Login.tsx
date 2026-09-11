import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})
type FormValues = z.infer<typeof schema>

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    setSubmitting(true)
    try {
      await login(values.email, values.password)
      navigate('/app/dashboard')
    } catch {
      setServerError('We could not sign you in. Check your email and password and try again.')
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
          <h1 className="text-lg font-display mb-1">Welcome back</h1>
          <p className="text-sm text-ink-faint mb-6">Sign in to continue your learning.</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm text-ink-soft block mb-1">Email</label>
              <input
                id="email" type="email" autoComplete="email"
                defaultValue="niranjan@aurelia.app"
                {...register('email')}
                className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-rust mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-ink-soft block mb-1">Password</label>
              <input
                id="password" type="password" autoComplete="current-password"
                defaultValue="demo1234"
                {...register('password')}
                className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none"
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-xs text-rust mt-1">{errors.password.message}</p>}
            </div>

            {serverError && <p className="text-xs text-rust" role="alert">{serverError}</p>}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log in'}
            </Button>
          </form>

          <div className="flex items-center justify-between mt-4 text-xs">
            <button className="text-ink-faint hover:text-ink">Forgot password?</button>
            <Link to="/register" className="text-signal-strong hover:underline">Create account</Link>
          </div>
        </div>
        <p className="text-center text-xs text-white/40 mt-4">Tip: sign in with an email containing "admin" to preview the admin dashboard.</p>
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, status } = useAuth()
  if (status !== 'authenticated' || !user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, status } = useAuth()
  if (status !== 'authenticated' || !user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/app/dashboard" replace />
  return <>{children}</>
}

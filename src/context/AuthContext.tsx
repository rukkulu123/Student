import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@/types'
import * as authApi from '@/api/auth'

interface AuthContextValue {
  user: User | null
  status: 'idle' | 'loading' | 'authenticated' | 'error'
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'sc_demo_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthContextValue['status']>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      setUser(JSON.parse(raw))
      setStatus('authenticated')
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setStatus('loading')
    setError(null)
    try {
      const u = await authApi.login(email, password)
      setUser(u)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u))
      setStatus('authenticated')
    } catch (e) {
      setStatus('error')
      setError('We could not sign you in. Check your email and password and try again.')
      throw e
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setStatus('loading')
    setError(null)
    try {
      const u = await authApi.register(name, email, password)
      setUser(u)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u))
      setStatus('authenticated')
    } catch (e) {
      setStatus('error')
      setError('We could not create your account. Please try again.')
      throw e
    }
  }, [])

  const logout = useCallback(() => {
    authApi.logout()
    sessionStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setStatus('idle')
  }, [])

  return (
    <AuthContext.Provider value={{ user, status, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

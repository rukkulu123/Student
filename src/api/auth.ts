import { MOCK_MODE, apiClient } from './client'
import { dbLogin, dbRegister } from '@/mocks/db'
import type { User } from '@/types'

export async function login(email: string, password: string): Promise<User> {
  if (MOCK_MODE) return dbLogin(email, password)
  const { data } = await apiClient.post<{ user: User; token: string }>('/auth/login', { email, password })
  sessionStorage.setItem('auth_token', data.token)
  return data.user
}

export async function register(name: string, email: string, password: string): Promise<User> {
  if (MOCK_MODE) return dbRegister(name, email)
  const { data } = await apiClient.post<{ user: User; token: string }>('/auth/register', { name, email, password })
  sessionStorage.setItem('auth_token', data.token)
  return data.user
}

export function logout() {
  sessionStorage.removeItem('auth_token')
}

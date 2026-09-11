import { MOCK_MODE, apiClient } from './client'
import { adminUsers } from '@/mocks/data'
import type { AdminUserRow } from '@/types'

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(adminUsers), 400))
  const { data } = await apiClient.get<AdminUserRow[]>('/admin/users')
  return data
}

export async function getAdminUser(userId: string): Promise<AdminUserRow | undefined> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(adminUsers.find((u) => u.id === userId)), 300))
  const { data } = await apiClient.get<AdminUserRow>(`/admin/users/${userId}`)
  return data
}

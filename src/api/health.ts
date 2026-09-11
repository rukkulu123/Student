import { MOCK_MODE, apiClient } from './client'
import { systemHealth, systemFailures } from '@/mocks/data'
import type { SystemHealthStatus, SystemFailure } from '@/types'

export async function getSystemHealth(): Promise<SystemHealthStatus[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(systemHealth), 350))
  const { data } = await apiClient.get<SystemHealthStatus[]>('/admin/system-health')
  return data
}

export async function getSystemFailures(): Promise<SystemFailure[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(systemFailures), 350))
  const { data } = await apiClient.get<SystemFailure[]>('/admin/system-health/failures')
  return data
}

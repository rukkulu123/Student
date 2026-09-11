import { MOCK_MODE, apiClient } from './client'
import { spaces as mockSpaces } from '@/mocks/data'
import type { Space } from '@/types'

export async function listSpaces(): Promise<Space[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(mockSpaces), 350))
  const { data } = await apiClient.get<Space[]>('/spaces')
  return data
}

export async function getSpace(spaceId: string): Promise<Space | undefined> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(mockSpaces.find((s) => s.id === spaceId)), 300))
  const { data } = await apiClient.get<Space>(`/spaces/${spaceId}`)
  return data
}

export async function createSpace(input: { name: string; description: string }): Promise<Space> {
  if (MOCK_MODE) {
    const created: Space = { id: `sp_${Date.now()}`, projectCount: 0, overallMastery: 0, lastActivityAt: new Date().toISOString(), status: 'active', ...input }
    return new Promise((r) => setTimeout(() => r(created), 400))
  }
  const { data } = await apiClient.post<Space>('/spaces', input)
  return data
}

import { MOCK_MODE, apiClient } from './client'
import { recommendations as mockRecs } from '@/mocks/data'
import type { Recommendation } from '@/types'

export async function getRecommendations(projectId?: string): Promise<Recommendation[]> {
  if (MOCK_MODE) {
    const list = projectId ? mockRecs.filter((r) => r.projectId === projectId) : mockRecs
    return new Promise((r) => setTimeout(() => r(list), 350))
  }
  const { data } = await apiClient.get<Recommendation[]>('/recommendations', { params: { projectId } })
  return data
}

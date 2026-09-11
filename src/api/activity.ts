import { MOCK_MODE, apiClient } from './client'
import { activity as mockActivity } from '@/mocks/data'
import type { LearningEvent } from '@/types'

export async function getActivity(filters?: { projectId?: string; type?: string }): Promise<LearningEvent[]> {
  if (MOCK_MODE) {
    let list = mockActivity
    if (filters?.projectId) list = list.filter((e) => e.projectId === filters.projectId)
    if (filters?.type) list = list.filter((e) => e.type === filters.type)
    return new Promise((r) => setTimeout(() => r(list), 350))
  }
  const { data } = await apiClient.get<LearningEvent[]>('/activity', { params: filters })
  return data
}

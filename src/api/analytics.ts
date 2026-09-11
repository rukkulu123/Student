import { MOCK_MODE, apiClient } from './client'
import { projectAnalytics, globalAnalytics } from '@/mocks/data'
import type { ProjectAnalytics, GlobalAnalytics } from '@/types'

export async function getProjectAnalytics(projectId: string, _range: string): Promise<ProjectAnalytics> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(projectAnalytics[projectId] ?? projectAnalytics.pr_rag), 400))
  const { data } = await apiClient.get<ProjectAnalytics>(`/projects/${projectId}/analytics`, { params: { range: _range } })
  return data
}

export async function getGlobalAnalytics(_range: string): Promise<GlobalAnalytics> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(globalAnalytics), 400))
  const { data } = await apiClient.get<GlobalAnalytics>('/analytics', { params: { range: _range } })
  return data
}

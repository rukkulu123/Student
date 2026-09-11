import { MOCK_MODE, apiClient } from './client'
import { growthInsights, growthSummary } from '@/mocks/data'
import type { GrowthInsight, GrowthSummary } from '@/types'

export async function getGrowthInsights(projectId: string): Promise<GrowthInsight[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(growthInsights.filter((g) => g.projectId === projectId)), 350))
  const { data } = await apiClient.get<GrowthInsight[]>(`/projects/${projectId}/growth/insights`)
  return data
}

export async function getGrowthSummary(projectId: string): Promise<GrowthSummary> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r({ ...growthSummary, projectId }), 300))
  const { data } = await apiClient.get<GrowthSummary>(`/projects/${projectId}/growth/summary`)
  return data
}

import { MOCK_MODE, apiClient } from './client'
import { concepts, masteryHistory, masteryChanges } from '@/mocks/data'
import type { Concept, MasteryHistoryPoint, MasteryChange } from '@/types'

export async function getConcepts(projectId: string): Promise<Concept[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(concepts.filter((c) => c.projectId === projectId)), 350))
  const { data } = await apiClient.get<Concept[]>(`/projects/${projectId}/concepts`)
  return data
}

export async function getMasteryHistory(projectId: string): Promise<MasteryHistoryPoint[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(masteryHistory[projectId] ?? []), 300))
  const { data } = await apiClient.get<MasteryHistoryPoint[]>(`/projects/${projectId}/mastery/history`)
  return data
}

export async function getMasteryChanges(_projectId: string): Promise<MasteryChange[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(masteryChanges), 300))
  const { data } = await apiClient.get<MasteryChange[]>(`/projects/${_projectId}/mastery/changes`)
  return data
}

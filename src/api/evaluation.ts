import { MOCK_MODE, apiClient } from './client'
import { aiEvaluationScores } from '@/mocks/data'
import type { AIEvaluationScore } from '@/types'

export async function listEvaluationScores(): Promise<AIEvaluationScore[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(aiEvaluationScores), 400))
  const { data } = await apiClient.get<AIEvaluationScore[]>('/admin/ai-evaluation')
  return data
}

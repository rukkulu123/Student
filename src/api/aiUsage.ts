import { MOCK_MODE, apiClient } from './client'
import { aiUsage } from '@/mocks/data'
import type { AIUsageRecord } from '@/types'

export async function listAIUsage(): Promise<AIUsageRecord[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(aiUsage), 400))
  const { data } = await apiClient.get<AIUsageRecord[]>('/admin/ai-usage')
  return data
}

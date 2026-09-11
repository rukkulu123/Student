import { MOCK_MODE, apiClient } from './client'
import { dbSubmitAssessment } from '@/mocks/db'
import { assessment as mockAssessment } from '@/mocks/data'
import type { Assessment, AssessmentResult } from '@/types'

export async function getAssessment(projectId: string): Promise<Assessment> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r({ ...mockAssessment, projectId }), 400))
  const { data } = await apiClient.post<Assessment>(`/projects/${projectId}/assessment/generate`)
  return data
}

export async function submitAssessment(assessmentId: string, answer: string): Promise<AssessmentResult> {
  if (MOCK_MODE) return dbSubmitAssessment(assessmentId, answer)
  const { data } = await apiClient.post<AssessmentResult>(`/assessment/${assessmentId}/submit`, { answer })
  return data
}

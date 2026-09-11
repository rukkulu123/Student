import { MOCK_MODE, apiClient } from './client'
import { dbSubmitQuiz } from '@/mocks/db'
import { activeQuiz, quizHistory } from '@/mocks/data'
import type { Quiz, QuizAnswer, QuizResult } from '@/types'

export async function getAdaptiveQuiz(projectId: string): Promise<Quiz> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r({ ...activeQuiz, projectId }), 600))
  const { data } = await apiClient.post<Quiz>(`/projects/${projectId}/quiz/generate`)
  return data
}

export async function submitQuiz(quizId: string, answers: QuizAnswer[]): Promise<QuizResult> {
  if (MOCK_MODE) return dbSubmitQuiz(quizId, answers)
  const { data } = await apiClient.post<QuizResult>(`/quiz/${quizId}/submit`, { answers })
  return data
}

export async function getQuizHistory(_projectId: string): Promise<QuizResult[]> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(quizHistory), 300))
  const { data } = await apiClient.get<QuizResult[]>(`/projects/${_projectId}/quiz/history`)
  return data
}

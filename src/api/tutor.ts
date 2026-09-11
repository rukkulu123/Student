import { MOCK_MODE, apiClient } from './client'
import { dbGetConversation, dbSendTutorMessage } from '@/mocks/db'
import type { ChatMessage } from '@/types'

export async function getConversation(projectId: string): Promise<ChatMessage[]> {
  if (MOCK_MODE) return dbGetConversation(projectId)
  const { data } = await apiClient.get<ChatMessage[]>(`/projects/${projectId}/tutor/conversation`)
  return data
}

export async function sendMessage(projectId: string, content: string): Promise<ChatMessage[]> {
  if (MOCK_MODE) return dbSendTutorMessage(projectId, content)
  const { data } = await apiClient.post<ChatMessage[]>(`/projects/${projectId}/tutor/messages`, { content })
  return data
}

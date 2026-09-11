import { MOCK_MODE, apiClient } from './client'
import { projects as mockProjects } from '@/mocks/data'
import type { Project } from '@/types'

export async function listProjects(spaceId?: string): Promise<Project[]> {
  if (MOCK_MODE) {
    const list = spaceId ? mockProjects.filter((p) => p.spaceId === spaceId) : mockProjects
    return new Promise((r) => setTimeout(() => r(list), 350))
  }
  const { data } = await apiClient.get<Project[]>('/projects', { params: { spaceId } })
  return data
}

export async function getProject(projectId: string): Promise<Project | undefined> {
  if (MOCK_MODE) return new Promise((r) => setTimeout(() => r(mockProjects.find((p) => p.id === projectId)), 300))
  const { data } = await apiClient.get<Project>(`/projects/${projectId}`)
  return data
}

export async function createProject(input: {
  spaceId: string; name: string; learningGoal: string; description: string; expectedOutcome: string; targetDate?: string
}): Promise<Project> {
  if (MOCK_MODE) {
    const space = mockProjects.find((p) => p.spaceId === input.spaceId)
    const created: Project = {
      id: `pr_${Date.now()}`, spaceName: space?.spaceName ?? 'Space', overallMastery: 0, progress: 0,
      status: 'getting_started', lastActivityAt: new Date().toISOString(), createdAt: new Date().toISOString(), ...input,
    }
    return new Promise((r) => setTimeout(() => r(created), 450))
  }
  const { data } = await apiClient.post<Project>('/projects', input)
  return data
}

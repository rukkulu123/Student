import { createContext, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProject } from '@/api/projects'
import { getConcepts } from '@/api/mastery'
import { getActivity } from '@/api/activity'
import { getRecommendations } from '@/api/recommendations'
import type { Project, Concept, LearningEvent, Recommendation } from '@/types'

interface ProjectContextValue {
  project: Project | undefined
  concepts: Concept[]
  recentActivity: LearningEvent[]
  recommendation: Recommendation | undefined
  isLoading: boolean
}

export const ProjectContext = createContext<ProjectContextValue | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { projectId = '' } = useParams()

  const projectQuery = useQuery({ queryKey: ['project', projectId], queryFn: () => getProject(projectId), enabled: !!projectId })
  const conceptsQuery = useQuery({ queryKey: ['concepts', projectId], queryFn: () => getConcepts(projectId), enabled: !!projectId })
  const activityQuery = useQuery({ queryKey: ['activity', projectId], queryFn: () => getActivity({ projectId }), enabled: !!projectId })
  const recQuery = useQuery({ queryKey: ['recommendations', projectId], queryFn: () => getRecommendations(projectId), enabled: !!projectId })

  const value: ProjectContextValue = {
    project: projectQuery.data,
    concepts: conceptsQuery.data ?? [],
    recentActivity: activityQuery.data ?? [],
    recommendation: recQuery.data?.[0],
    isLoading: projectQuery.isLoading,
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

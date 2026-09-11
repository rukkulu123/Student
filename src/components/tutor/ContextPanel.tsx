import { LearningContext } from '@/components/learning/LearningContext'
import type { Project, Concept } from '@/types'

export function ContextPanel({ project, concepts }: { project: Project; concepts: Concept[] }) {
  return <LearningContext project={project} concepts={concepts} />
}

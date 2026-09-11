// ---- Auth ----
export interface User {
  id: string
  name: string
  email: string
  role: 'learner' | 'admin'
  createdAt: string
}

// ---- Learning structure ----
export interface Space {
  id: string
  name: string
  description: string
  projectCount: number
  overallMastery: number
  lastActivityAt: string
  status: 'active' | 'archived'
}

export type LearningStatus =
  | 'getting_started'
  | 'learning'
  | 'improving'
  | 'strong'
  | 'needs_attention'

export interface Project {
  id: string
  spaceId: string
  spaceName: string
  name: string
  learningGoal: string
  description: string
  expectedOutcome: string
  targetDate?: string
  overallMastery: number
  progress: number
  status: LearningStatus
  lastActivityAt: string
  createdAt: string
}

// ---- Materials ----
export type MaterialStatus = 'uploading' | 'processing' | 'ready' | 'failed'
export type ProcessingStage =
  | 'uploading'
  | 'extracting_text'
  | 'creating_knowledge'
  | 'preparing_search'
  | 'ready'

export interface Material {
  id: string
  projectId: string
  filename: string
  sizeKb: number
  uploadedAt: string
  status: MaterialStatus
  stage: ProcessingStage
  pages?: number
  conceptsExtracted: string[]
  searchable: boolean
  errorMessage?: string
}

// ---- Concepts / Mastery ----
export type ConceptStatus = 'mastered' | 'improving' | 'needs_attention' | 'not_started'

export interface Concept {
  id: string
  projectId: string
  name: string
  mastery: number
  trend: 'up' | 'down' | 'flat'
  status: ConceptStatus
}

export interface MasteryHistoryPoint {
  date: string
  mastery: number
}

export interface MasteryChange {
  conceptId: string
  from: number
  to: number
  reason: string
  date: string
}

// ---- Tutor ----
export interface Citation {
  id: string
  materialId: string
  materialName: string
  page: number
}

export interface ChatMessage {
  id: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  citations?: Citation[]
  unsupported?: boolean
  suggestedFollowUps?: string[]
  createdAt: string
}

export interface Conversation {
  id: string
  projectId: string
  messages: ChatMessage[]
}

// ---- Quiz ----
export type QuestionType = 'multiple_choice' | 'true_false' | 'scenario'

export interface QuizQuestion {
  id: string
  type: QuestionType
  prompt: string
  choices: { id: string; text: string }[]
  correctChoiceId: string
  explanation: string
  concept: string
}

export interface Quiz {
  id: string
  projectId: string
  topic: string
  reason: string
  estimatedMinutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  questions: QuizQuestion[]
}

export interface QuizAnswer {
  questionId: string
  choiceId: string
  correct: boolean
}

export interface QuizResult {
  id: string
  quizId: string
  score: number
  accuracy: number
  answers: QuizAnswer[]
  conceptPerformance: { concept: string; accuracy: number }[]
  weakConcepts: string[]
  strongConcepts: string[]
  completedAt: string
}

// ---- Assessment ----
export interface Assessment {
  id: string
  projectId: string
  prompt: string
  expectationHint: string
}

export interface AssessmentResult {
  id: string
  assessmentId: string
  overallScore: number
  understanding: 'strong' | 'developing' | 'needs_attention'
  accuracy: number
  completeness: number
  reasoning: number
  conceptUnderstanding: number
  whatYouUnderstood: string
  whatIsMissing: string
  howToImprove: string
  recommendedNextStep: string
  relatedConcepts: string[]
  submittedAt: string
}

// ---- Growth ----
export interface GrowthInsight {
  id: string
  projectId: string
  text: string
  kind: 'positive' | 'attention' | 'pattern'
}

export interface GrowthSummary {
  projectId: string
  overallMasteryDelta: number
  windowDays: number
  strongestImprovement: string
  mainAreaForImprovement: string
  narrative: string
}

// ---- Recommendations ----
export type RecommendationAction = 'tutor' | 'quiz' | 'material_review'

export interface Recommendation {
  id: string
  projectId: string
  title: string
  reason: string
  relatedConcept: string
  evidence: string
  action: RecommendationAction
}

// ---- Activity ----
export type LearningEventType =
  | 'SPACE_CREATED'
  | 'PROJECT_CREATED'
  | 'PROJECT_ACCESSED'
  | 'MATERIAL_UPLOADED'
  | 'MATERIAL_PROCESSING_STARTED'
  | 'MATERIAL_PROCESSED'
  | 'MATERIAL_PROCESSING_FAILED'
  | 'TUTOR_CONVERSATION_STARTED'
  | 'TUTOR_QUESTION_ASKED'
  | 'TUTOR_INTERACTION_COMPLETED'
  | 'QUIZ_STARTED'
  | 'QUESTION_ANSWERED'
  | 'QUIZ_COMPLETED'
  | 'ASSESSMENT_COMPLETED'
  | 'MASTERY_UPDATED'
  | 'RECOMMENDATION_GENERATED'

export interface LearningEvent {
  id: string
  type: LearningEventType
  projectId?: string
  projectName?: string
  userId?: string
  userName?: string
  summary: string
  createdAt: string
}

// ---- Analytics ----
export interface AnalyticsPoint {
  date: string
  value: number
}

export interface ProjectAnalytics {
  projectId: string
  sessions: number
  tutorQuestions: number
  quizAttempts: number
  questionsAnswered: number
  materialInteractions: number
  quizAccuracy: number
  currentMastery: number
  conceptsMastered: number
  conceptsNeedingAttention: number
  masteryTrend: AnalyticsPoint[]
  assessmentTrend: AnalyticsPoint[]
  activityTrend: AnalyticsPoint[]
  tutorInteractions: number
  aiAssessmentsGenerated: number
  aiEvaluations: number
  recommendationsGenerated: number
}

export interface GlobalAnalytics {
  totalActivity: number
  activeDays: number
  spaces: number
  projects: number
  overallMastery: number
  avgAssessmentScore: number
  improvingConcepts: number
  conceptsNeedingAttention: number
  tutorInteractions: number
  questionsAsked: number
  quizActivity: number
  aiFeedbackGenerated: number
  activityTrend: AnalyticsPoint[]
  masteryTrend: AnalyticsPoint[]
  assessmentTrend: AnalyticsPoint[]
}

// ---- Admin ----
export interface AdminUserRow {
  id: string
  name: string
  email: string
  registeredAt: string
  lastActiveAt: string
  spaces: number
  projects: number
  overallProgress: number
  status: 'active' | 'inactive'
}

export interface AIUsageRecord {
  id: string
  timestamp: string
  feature: 'tutor' | 'quiz_generation' | 'assessment_grading' | 'recommendation'
  model: string
  latencyMs: number
  inputTokens: number
  outputTokens: number
  costUsd: number
  status: 'success' | 'error'
}

export interface AIEvaluationScore {
  category: string
  metric: string
  score: number
  target: number
}

export interface SystemHealthStatus {
  service: string
  status: 'healthy' | 'degraded' | 'down'
  latencyMs?: number
  errorRate?: number
}

export interface SystemFailure {
  id: string
  time: string
  service: string
  operation: string
  error: string
  status: 'open' | 'retried' | 'resolved'
}

import type {
  User, Space, Project, Material, Concept, MasteryHistoryPoint, MasteryChange,
  Conversation, Quiz, QuizResult, Assessment, AssessmentResult, GrowthInsight,
  GrowthSummary, Recommendation, LearningEvent, ProjectAnalytics, GlobalAnalytics,
  AdminUserRow, AIUsageRecord, AIEvaluationScore, SystemHealthStatus, SystemFailure,
} from '@/types'

const now = () => new Date()
const daysAgo = (n: number, h = 9) => {
  const d = new Date(now())
  d.setDate(d.getDate() - n)
  d.setHours(h, 0, 0, 0)
  return d.toISOString()
}

export const demoUser: User = {
  id: 'u_niranjan',
  name: 'Niranjan Rao',
  email: 'niranjan@aurelia.app',
  role: 'learner',
  createdAt: daysAgo(41),
}

export const adminUser: User = {
  id: 'u_admin',
  name: 'Admin',
  email: 'admin@aurelia.app',
  role: 'admin',
  createdAt: daysAgo(120),
}

export const spaces: Space[] = [
  {
    id: 'sp_ai_eng',
    name: 'AI Engineering',
    description: 'Core systems concepts for building production AI applications.',
    projectCount: 2,
    overallMastery: 61,
    lastActivityAt: daysAgo(0, 8),
    status: 'active',
  },
  {
    id: 'sp_ml_foundations',
    name: 'ML Foundations',
    description: 'Statistics, linear algebra, and classical machine learning.',
    projectCount: 1,
    overallMastery: 34,
    lastActivityAt: daysAgo(9),
    status: 'active',
  },
]

export const projects: Project[] = [
  {
    id: 'pr_rag',
    spaceId: 'sp_ai_eng',
    spaceName: 'AI Engineering',
    name: 'Retrieval Augmented Generation',
    learningGoal: 'Understand how RAG systems retrieve, ground, and cite information reliably.',
    description: 'Working through the architecture of production RAG pipelines, from chunking to reranking.',
    expectedOutcome: 'Be able to design and debug a RAG pipeline end to end.',
    targetDate: daysAgo(-20),
    overallMastery: 64,
    progress: 58,
    status: 'improving',
    lastActivityAt: daysAgo(0, 8),
    createdAt: daysAgo(27),
  },
  {
    id: 'pr_agents',
    spaceId: 'sp_ai_eng',
    spaceName: 'AI Engineering',
    name: 'Agentic Tool Use',
    learningGoal: 'Understand how agents plan, call tools, and recover from errors.',
    description: 'Studying tool-use loops, planning strategies, and evaluation of agentic systems.',
    expectedOutcome: 'Design a reliable tool-calling loop with proper error handling.',
    overallMastery: 22,
    progress: 15,
    status: 'getting_started',
    lastActivityAt: daysAgo(6),
    createdAt: daysAgo(6),
  },
  {
    id: 'pr_linalg',
    spaceId: 'sp_ml_foundations',
    spaceName: 'ML Foundations',
    name: 'Linear Algebra for ML',
    learningGoal: 'Build intuition for vectors, matrices, and eigendecomposition as used in ML.',
    description: 'Foundational math for understanding embeddings and dimensionality reduction.',
    expectedOutcome: 'Comfortably reason about matrix operations behind common ML algorithms.',
    overallMastery: 34,
    progress: 40,
    status: 'learning',
    lastActivityAt: daysAgo(9),
    createdAt: daysAgo(35),
  },
]

export const materials: Material[] = [
  {
    id: 'mt_1', projectId: 'pr_rag', filename: 'RAG Architecture.pdf', sizeKb: 2380,
    uploadedAt: daysAgo(26), status: 'ready', stage: 'ready', pages: 34,
    conceptsExtracted: ['embeddings', 'chunking', 'vector search', 'grounding'], searchable: true,
  },
  {
    id: 'mt_2', projectId: 'pr_rag', filename: 'Vector Search Notes.pdf', sizeKb: 940,
    uploadedAt: daysAgo(21), status: 'ready', stage: 'ready', pages: 12,
    conceptsExtracted: ['vector search', 'reranking', 'retrieval'], searchable: true,
  },
  {
    id: 'mt_3', projectId: 'pr_rag', filename: 'Evaluating RAG Systems.pdf', sizeKb: 1620,
    uploadedAt: daysAgo(4), status: 'ready', stage: 'ready', pages: 21,
    conceptsExtracted: ['evaluation', 'citations', 'grounding'], searchable: true,
  },
  {
    id: 'mt_4', projectId: 'pr_rag', filename: 'Hybrid Search Patterns.pdf', sizeKb: 1140,
    uploadedAt: daysAgo(0, 8), status: 'processing', stage: 'creating_knowledge',
    conceptsExtracted: [], searchable: false,
  },
  {
    id: 'mt_5', projectId: 'pr_rag', filename: 'Reranker Benchmarks.pdf', sizeKb: 860,
    uploadedAt: daysAgo(2), status: 'failed', stage: 'extracting_text',
    conceptsExtracted: [], searchable: false, errorMessage: 'The document appears to be a scanned image without a readable text layer.',
  },
]

export const concepts: Concept[] = [
  { id: 'c_embeddings', projectId: 'pr_rag', name: 'Embeddings', mastery: 82, trend: 'up', status: 'mastered' },
  { id: 'c_chunking', projectId: 'pr_rag', name: 'Chunking', mastery: 58, trend: 'up', status: 'improving' },
  { id: 'c_vector_search', projectId: 'pr_rag', name: 'Vector Search', mastery: 42, trend: 'down', status: 'needs_attention' },
  { id: 'c_retrieval', projectId: 'pr_rag', name: 'Retrieval Ranking', mastery: 39, trend: 'down', status: 'needs_attention' },
  { id: 'c_reranking', projectId: 'pr_rag', name: 'Reranking', mastery: 51, trend: 'flat', status: 'improving' },
  { id: 'c_grounding', projectId: 'pr_rag', name: 'Grounding', mastery: 71, trend: 'up', status: 'improving' },
  { id: 'c_citations', projectId: 'pr_rag', name: 'Citations', mastery: 76, trend: 'up', status: 'mastered' },
  { id: 'c_evaluation', projectId: 'pr_rag', name: 'Evaluation', mastery: 25, trend: 'flat', status: 'not_started' },
]

export const masteryHistory: Record<string, MasteryHistoryPoint[]> = {
  pr_rag: Array.from({ length: 14 }).map((_, i) => ({
    date: daysAgo(13 - i),
    mastery: Math.round(46 + i * 1.3 + Math.sin(i / 2) * 3),
  })),
}

export const masteryChanges: MasteryChange[] = [
  { conceptId: 'c_embeddings', from: 61, to: 74, reason: 'Two consecutive strong quiz attempts on embedding similarity.', date: daysAgo(9) },
  { conceptId: 'c_vector_search', from: 55, to: 42, reason: 'Repeated mistakes distinguishing exact vs. approximate nearest-neighbor search.', date: daysAgo(1) },
]

export const conversation: Conversation = {
  id: 'cv_1',
  projectId: 'pr_rag',
  messages: [
    {
      id: 'm1', conversationId: 'cv_1', role: 'user',
      content: 'Why does chunk overlap matter for retrieval quality?',
      createdAt: daysAgo(1, 19),
    },
    {
      id: 'm2', conversationId: 'cv_1', role: 'assistant',
      content: "Chunk overlap preserves context that would otherwise be split across chunk boundaries. Without overlap, a sentence that spans two chunks can lose the reference it depends on, which weakens the embedding for both chunks and can cause the retriever to miss a relevant passage.\n\nA typical starting point is 10–20% overlap, tuned against your document structure and retrieval evaluation set.",
      citations: [
        { id: 'ct1', materialId: 'mt_1', materialName: 'RAG Architecture.pdf', page: 12 },
        { id: 'ct2', materialId: 'mt_2', materialName: 'Vector Search Notes.pdf', page: 4 },
      ],
      suggestedFollowUps: ['Give an example', 'How do I choose overlap size?', 'Quiz me on chunking'],
      createdAt: daysAgo(1, 19),
    },
    {
      id: 'm3', conversationId: 'cv_1', role: 'user',
      content: 'What reranking model does LangChain use by default in production?',
      createdAt: daysAgo(0, 8),
    },
    {
      id: 'm4', conversationId: 'cv_1', role: 'assistant',
      content: "I couldn't find enough evidence in this project's learning materials to answer that confidently. Your uploaded materials cover reranking concepts generally but don't document a specific default for that framework.",
      unsupported: true,
      suggestedFollowUps: ['Explain how rerankers work generally', 'What does Reranker Benchmarks.pdf cover?'],
      createdAt: daysAgo(0, 8),
    },
  ],
}

export const activeQuiz: Quiz = {
  id: 'qz_1',
  projectId: 'pr_rag',
  topic: 'Retrieval & Chunking',
  reason: 'Based on your recent performance, this quiz will focus more heavily on retrieval ranking and chunk overlap, where your last two sessions showed the most difficulty.',
  estimatedMinutes: 6,
  difficulty: 'medium',
  questions: [
    {
      id: 'q1', type: 'multiple_choice', concept: 'Chunking',
      prompt: 'What is the main risk of using very large chunks with no overlap?',
      choices: [
        { id: 'a', text: 'Slower embedding generation' },
        { id: 'b', text: 'Loss of precise context, diluting retrieval relevance' },
        { id: 'c', text: 'Higher storage cost per vector' },
        { id: 'd', text: 'Incompatibility with cosine similarity' },
      ],
      correctChoiceId: 'b',
      explanation: 'Large chunks mix multiple ideas together, so the resulting embedding represents an average of several topics rather than one precise concept — this dilutes relevance during retrieval.',
    },
    {
      id: 'q2', type: 'true_false', concept: 'Vector Search',
      prompt: 'Approximate nearest neighbor (ANN) search guarantees the exact top-k most similar vectors every time.',
      choices: [ { id: 'true', text: 'True' }, { id: 'false', text: 'False' } ],
      correctChoiceId: 'false',
      explanation: 'ANN methods trade a small amount of accuracy for large speed gains — they return vectors that are very likely, but not guaranteed, to be the true top-k nearest neighbors.',
    },
    {
      id: 'q3', type: 'scenario', concept: 'Retrieval Ranking',
      prompt: 'A user query returns technically relevant chunks, but the top result is a less useful summary paragraph instead of the detailed section. What is the most likely fix?',
      choices: [
        { id: 'a', text: 'Increase the embedding dimensionality' },
        { id: 'b', text: 'Add a reranking stage that scores retrieved chunks against the query more precisely' },
        { id: 'c', text: 'Switch to a smaller chunk size only' },
        { id: 'd', text: 'Remove overlapping chunks from the index' },
      ],
      correctChoiceId: 'b',
      explanation: 'Initial vector retrieval optimizes for recall over a large candidate set. A reranker re-scores those candidates with a more precise (often cross-encoder) model to fix ordering issues like this.',
    },
    {
      id: 'q4', type: 'multiple_choice', concept: 'Chunking',
      prompt: 'Why is a moderate chunk overlap (roughly 10–20%) commonly recommended?',
      choices: [
        { id: 'a', text: 'It doubles the number of vectors for redundancy' },
        { id: 'b', text: 'It preserves context that spans chunk boundaries without excessive duplication' },
        { id: 'c', text: 'It is required by all vector databases' },
        { id: 'd', text: 'It removes the need for a reranker' },
      ],
      correctChoiceId: 'b',
      explanation: 'A moderate overlap keeps boundary-spanning context intact while avoiding the storage and noise cost of heavily duplicated content.',
    },
  ],
}

export const quizHistory: QuizResult[] = [
  {
    id: 'qr_prev', quizId: 'qz_0', score: 78, accuracy: 78,
    answers: [], completedAt: daysAgo(3),
    conceptPerformance: [
      { concept: 'Embeddings', accuracy: 90 },
      { concept: 'Chunking', accuracy: 70 },
      { concept: 'Vector Search', accuracy: 55 },
    ],
    weakConcepts: ['Vector Search'], strongConcepts: ['Embeddings'],
  },
]

export const assessment: Assessment = {
  id: 'as_1',
  projectId: 'pr_rag',
  prompt: 'Explain, in your own words, why a RAG system might answer confidently but incorrectly, and what design choices reduce that risk.',
  expectationHint: 'A strong answer connects retrieval quality, grounding, and citation checks, and names at least one concrete mitigation (e.g. confidence thresholds, citation verification, reranking).',
}

export const assessmentResult: AssessmentResult = {
  id: 'ar_1',
  assessmentId: 'as_1',
  overallScore: 71,
  understanding: 'developing',
  accuracy: 75,
  completeness: 60,
  reasoning: 78,
  conceptUnderstanding: 70,
  whatYouUnderstood: 'You correctly identified that weak retrieval leads to irrelevant context being passed to the model, and that this can produce fluent but ungrounded answers.',
  whatIsMissing: 'Your answer did not mention citation verification or confidence thresholds as mitigations, and it did not address how reranking improves precision after initial retrieval.',
  howToImprove: 'Review the grounding and evaluation sections of "Evaluating RAG Systems.pdf", then practice articulating at least two concrete mitigations with the Tutor.',
  recommendedNextStep: 'Practice explaining grounding safeguards with the Tutor, then retake a targeted assessment.',
  relatedConcepts: ['Grounding', 'Evaluation', 'Citations'],
  submittedAt: daysAgo(2),
}

export const growthInsights: GrowthInsight[] = [
  { id: 'gi_1', projectId: 'pr_rag', text: 'You are improving quickly in embeddings, gaining 13 points in the last two weeks.', kind: 'positive' },
  { id: 'gi_2', projectId: 'pr_rag', text: 'You repeatedly struggle with retrieval ranking questions that involve reranking trade-offs.', kind: 'attention' },
  { id: 'gi_3', projectId: 'pr_rag', text: 'You learn faster when concepts are explained with a worked example rather than a definition alone.', kind: 'pattern' },
]

export const growthSummary: GrowthSummary = {
  projectId: 'pr_rag',
  overallMasteryDelta: 18,
  windowDays: 14,
  strongestImprovement: 'Embeddings',
  mainAreaForImprovement: 'Retrieval Ranking',
  narrative: 'Your overall mastery increased 18% over the last 14 days. Your strongest improvement is in embeddings. Retrieval ranking remains your main area for improvement.',
}

export const recommendations: Recommendation[] = [
  {
    id: 'rc_1', projectId: 'pr_rag',
    title: 'Strengthen Retrieval Ranking',
    reason: 'Your last two assessments showed difficulty distinguishing semantic relevance from lexical relevance during ranking.',
    relatedConcept: 'Retrieval Ranking',
    evidence: 'Quiz accuracy on this concept dropped to 39%, and two Tutor questions this week returned unsupported answers on ranking edge cases.',
    action: 'tutor',
  },
  {
    id: 'rc_2', projectId: 'pr_rag',
    title: 'Practice chunk overlap trade-offs',
    reason: 'You performed well on embeddings but struggled with chunk overlap sizing in your last quiz.',
    relatedConcept: 'Chunking',
    evidence: 'Missed 2 of 3 chunking questions in your most recent quiz attempt.',
    action: 'quiz',
  },
  {
    id: 'rc_3', projectId: 'pr_agents',
    title: 'Review the tool-calling loop basics',
    reason: "You've just started this project — a quick review will ground your first Tutor session.",
    relatedConcept: 'Tool Use Loop',
    evidence: 'No materials reviewed yet for this project.',
    action: 'material_review',
  },
]

export const activity: LearningEvent[] = [
  { id: 'ev_1', type: 'TUTOR_QUESTION_ASKED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Asked the Tutor about reranking defaults', createdAt: daysAgo(0, 8) },
  { id: 'ev_2', type: 'MATERIAL_PROCESSING_STARTED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Started processing Hybrid Search Patterns.pdf', createdAt: daysAgo(0, 8) },
  { id: 'ev_3', type: 'MATERIAL_PROCESSING_FAILED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Processing failed for Reranker Benchmarks.pdf', createdAt: daysAgo(2) },
  { id: 'ev_4', type: 'ASSESSMENT_COMPLETED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Completed an open-ended assessment on grounding', createdAt: daysAgo(2) },
  { id: 'ev_5', type: 'MASTERY_UPDATED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Vector Search mastery dropped to 42%', createdAt: daysAgo(1) },
  { id: 'ev_6', type: 'RECOMMENDATION_GENERATED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'New recommendation: Strengthen Retrieval Ranking', createdAt: daysAgo(1) },
  { id: 'ev_7', type: 'QUIZ_COMPLETED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Completed Adaptive Quiz — scored 78%', createdAt: daysAgo(3) },
  { id: 'ev_8', type: 'PROJECT_CREATED', projectId: 'pr_agents', projectName: 'Agentic Tool Use', summary: 'Created project "Agentic Tool Use"', createdAt: daysAgo(6) },
  { id: 'ev_9', type: 'MATERIAL_UPLOADED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Uploaded Evaluating RAG Systems.pdf', createdAt: daysAgo(4) },
  { id: 'ev_10', type: 'MATERIAL_PROCESSED', projectId: 'pr_rag', projectName: 'Retrieval Augmented Generation', summary: 'Evaluating RAG Systems.pdf is ready', createdAt: daysAgo(4) },
]

function buildTrend(base: number, days: number, growth = 1) {
  return Array.from({ length: days }).map((_, i) => ({
    date: daysAgo(days - 1 - i),
    value: Math.max(0, Math.round(base + i * growth + Math.sin(i / 3) * 4)),
  }))
}

export const projectAnalytics: Record<string, ProjectAnalytics> = {
  pr_rag: {
    projectId: 'pr_rag',
    sessions: 23, tutorQuestions: 61, quizAttempts: 5, questionsAnswered: 47, materialInteractions: 34,
    quizAccuracy: 68, currentMastery: 64, conceptsMastered: 2, conceptsNeedingAttention: 2,
    masteryTrend: buildTrend(46, 14, 1.3),
    assessmentTrend: buildTrend(55, 8, 2),
    activityTrend: buildTrend(2, 14, 0.2),
    tutorInteractions: 61, aiAssessmentsGenerated: 4, aiEvaluations: 9, recommendationsGenerated: 6,
  },
}

export const globalAnalytics: GlobalAnalytics = {
  totalActivity: 142, activeDays: 19, spaces: 2, projects: 3,
  overallMastery: 47, avgAssessmentScore: 71, improvingConcepts: 5, conceptsNeedingAttention: 3,
  tutorInteractions: 84, questionsAsked: 84, quizActivity: 9, aiFeedbackGenerated: 13,
  activityTrend: buildTrend(3, 30, 0.15),
  masteryTrend: buildTrend(28, 30, 0.6),
  assessmentTrend: buildTrend(50, 12, 1.5),
}

// ---- Admin data ----
export const adminUsers: AdminUserRow[] = [
  { id: 'u_niranjan', name: 'Niranjan Rao', email: 'niranjan@aurelia.app', registeredAt: daysAgo(41), lastActiveAt: daysAgo(0, 8), spaces: 2, projects: 3, overallProgress: 47, status: 'active' },
  { id: 'u_2', name: 'Meera Iyer', email: 'meera@aurelia.app', registeredAt: daysAgo(70), lastActiveAt: daysAgo(1), spaces: 1, projects: 2, overallProgress: 63, status: 'active' },
  { id: 'u_3', name: 'Daniel Cho', email: 'daniel@aurelia.app', registeredAt: daysAgo(15), lastActiveAt: daysAgo(0, 6), spaces: 1, projects: 1, overallProgress: 12, status: 'active' },
  { id: 'u_4', name: 'Priya Nair', email: 'priya@aurelia.app', registeredAt: daysAgo(95), lastActiveAt: daysAgo(22), spaces: 3, projects: 5, overallProgress: 81, status: 'inactive' },
  { id: 'u_5', name: 'Tom Alders', email: 'tom@aurelia.app', registeredAt: daysAgo(8), lastActiveAt: daysAgo(3), spaces: 1, projects: 1, overallProgress: 29, status: 'active' },
]

export const aiUsage: AIUsageRecord[] = [
  { id: 'ai_1', timestamp: daysAgo(0, 8), feature: 'tutor', model: 'claude-sonnet-4-6', latencyMs: 1840, inputTokens: 2140, outputTokens: 380, costUsd: 0.018, status: 'success' },
  { id: 'ai_2', timestamp: daysAgo(0, 7), feature: 'tutor', model: 'claude-sonnet-4-6', latencyMs: 2210, inputTokens: 1890, outputTokens: 310, costUsd: 0.015, status: 'success' },
  { id: 'ai_3', timestamp: daysAgo(1), feature: 'quiz_generation', model: 'claude-sonnet-4-6', latencyMs: 3120, inputTokens: 3400, outputTokens: 920, costUsd: 0.041, status: 'success' },
  { id: 'ai_4', timestamp: daysAgo(2), feature: 'assessment_grading', model: 'claude-sonnet-4-6', latencyMs: 2680, inputTokens: 2600, outputTokens: 540, costUsd: 0.027, status: 'success' },
  { id: 'ai_5', timestamp: daysAgo(2), feature: 'tutor', model: 'claude-sonnet-4-6', latencyMs: 5410, inputTokens: 2050, outputTokens: 0, costUsd: 0.006, status: 'error' },
  { id: 'ai_6', timestamp: daysAgo(3), feature: 'recommendation', model: 'claude-sonnet-4-6', latencyMs: 1420, inputTokens: 1100, outputTokens: 210, costUsd: 0.009, status: 'success' },
]

export const aiEvaluationScores: AIEvaluationScore[] = [
  { category: 'Tutor', metric: 'Groundedness', score: 92, target: 90 },
  { category: 'Tutor', metric: 'Citation accuracy', score: 88, target: 90 },
  { category: 'Tutor', metric: 'Unsupported handling', score: 95, target: 90 },
  { category: 'Retrieval', metric: 'Source relevance', score: 84, target: 85 },
  { category: 'Assessment', metric: 'Grading quality', score: 89, target: 85 },
  { category: 'Assessment', metric: 'Structured output reliability', score: 99, target: 95 },
  { category: 'Recommendation', metric: 'Actionability', score: 81, target: 80 },
]

export const systemHealth: SystemHealthStatus[] = [
  { service: 'API', status: 'healthy', latencyMs: 118 },
  { service: 'Database', status: 'healthy', latencyMs: 22 },
  { service: 'AI Provider', status: 'degraded', latencyMs: 2640, errorRate: 3.2 },
  { service: 'Background Processing', status: 'healthy', latencyMs: 340 },
]

export const systemFailures: SystemFailure[] = [
  { id: 'sf_1', time: daysAgo(2), service: 'AI Provider', operation: 'tutor.generate', error: 'Upstream timeout after 30s', status: 'retried' },
  { id: 'sf_2', time: daysAgo(2), service: 'Background Processing', operation: 'material.extract_text', error: 'Unreadable scanned PDF (no text layer)', status: 'open' },
  { id: 'sf_3', time: daysAgo(5), service: 'Database', operation: 'mastery.update', error: 'Connection pool exhausted, retried successfully', status: 'resolved' },
]

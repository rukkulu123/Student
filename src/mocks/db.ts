// This module simulates a backend. Every exported function is async and
// delayed, so the rest of the app already behaves as if it were talking to
// a real REST API over the network. Swap the bodies of these functions (or
// the functions in src/api/*.ts that call them) for real `fetch`/axios
// calls once the backend is available — nothing else needs to change.
import * as seed from './data'
import type {
  Material, ChatMessage, QuizResult, QuizAnswer, AssessmentResult, User,
} from '@/types'

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

// Mutable in-memory stores, seeded from realistic demo data.
const state = {
  materials: [...seed.materials],
  conversation: { ...seed.conversation, messages: [...seed.conversation.messages] },
  quizResults: [...seed.quizHistory],
}

export async function dbLogin(email: string, _password: string): Promise<User> {
  if (email.includes('admin')) return delay(seed.adminUser, 600)
  return delay(seed.demoUser, 600)
}

export async function dbRegister(name: string, email: string): Promise<User> {
  return delay({ ...seed.demoUser, name, email, id: id('u') }, 700)
}

export async function dbListMaterials(projectId: string): Promise<Material[]> {
  return delay(state.materials.filter((m) => m.projectId === projectId), 400)
}

export async function dbUploadMaterial(projectId: string, filename: string): Promise<Material> {
  const material: Material = {
    id: id('mt'), projectId, filename, sizeKb: Math.round(400 + Math.random() * 2000),
    uploadedAt: new Date().toISOString(), status: 'processing', stage: 'uploading',
    conceptsExtracted: [], searchable: false,
  }
  state.materials = [material, ...state.materials]
  // Simulate the async processing pipeline advancing through stages.
  const stages: Material['stage'][] = ['extracting_text', 'creating_knowledge', 'preparing_search', 'ready']
  let i = 0
  const tick = () => {
    if (i >= stages.length) return
    const stage = stages[i]
    state.materials = state.materials.map((m) =>
      m.id === material.id
        ? { ...m, stage, status: stage === 'ready' ? 'ready' : 'processing', ...(stage === 'ready' ? { pages: Math.round(8 + Math.random() * 30), conceptsExtracted: ['new concept'], searchable: true } : {}) }
        : m,
    )
    i += 1
    if (i < stages.length) setTimeout(tick, 1400)
  }
  setTimeout(tick, 1200)
  return delay(material, 300)
}

export async function dbSendTutorMessage(projectId: string, content: string): Promise<ChatMessage[]> {
  const userMsg: ChatMessage = {
    id: id('m'), conversationId: state.conversation.id, role: 'user', content,
    createdAt: new Date().toISOString(),
  }
  const isUnsupported = /default model|benchmark score|release date/i.test(content)
  const assistantMsg: ChatMessage = isUnsupported
    ? {
        id: id('m'), conversationId: state.conversation.id, role: 'assistant',
        content: "I couldn't find enough evidence in this project's learning materials to answer that confidently.",
        unsupported: true,
        suggestedFollowUps: ['Explain the general concept instead', 'What do my materials cover on this topic?'],
        createdAt: new Date().toISOString(),
      }
    : {
        id: id('m'), conversationId: state.conversation.id, role: 'assistant',
        content: `Based on your project materials: ${content.trim().replace(/\?$/, '')} generally comes down to how retrieval quality and grounding interact — strong retrieval narrows the evidence the model reasons over, which directly improves answer reliability.`,
        citations: [
          { id: id('ct'), materialId: 'mt_1', materialName: 'RAG Architecture.pdf', page: 14 },
        ],
        suggestedFollowUps: ['Give an example', 'Quiz me on this', 'Go deeper'],
        createdAt: new Date().toISOString(),
      }
  state.conversation.messages = [...state.conversation.messages, userMsg, assistantMsg]
  return delay(state.conversation.messages, 1100)
}

export async function dbGetConversation(_projectId: string): Promise<ChatMessage[]> {
  return delay(state.conversation.messages, 350)
}

export async function dbSubmitQuiz(quizId: string, answers: QuizAnswer[]): Promise<QuizResult> {
  const correct = answers.filter((a) => a.correct).length
  const accuracy = Math.round((correct / answers.length) * 100)
  const result: QuizResult = {
    id: id('qr'), quizId, score: accuracy, accuracy, answers,
    conceptPerformance: [
      { concept: 'Chunking', accuracy: 75 },
      { concept: 'Vector Search', accuracy: 50 },
      { concept: 'Retrieval Ranking', accuracy: accuracy < 60 ? 40 : 80 },
    ],
    weakConcepts: accuracy < 70 ? ['Retrieval Ranking', 'Vector Search'] : ['Vector Search'],
    strongConcepts: ['Chunking'],
    completedAt: new Date().toISOString(),
  }
  state.quizResults = [result, ...state.quizResults]
  return delay(result, 900)
}

export async function dbSubmitAssessment(_assessmentId: string, _answer: string): Promise<AssessmentResult> {
  return delay(seed.assessmentResult, 1600)
}

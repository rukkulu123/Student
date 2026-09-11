import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizQuestionCard } from '@/components/quiz/QuizQuestion'
import type { QuizQuestion } from '@/types'

const question: QuizQuestion = {
  id: 'q1', type: 'true_false', concept: 'Test',
  prompt: 'Is this a test question?',
  choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }],
  correctChoiceId: 'true',
  explanation: 'Yes, this is a test question.',
}

describe('QuizQuestionCard', () => {
  it('calls onSelect when a choice is clicked, and does not reveal the answer before submission', () => {
    const onSelect = vi.fn()
    render(<QuizQuestionCard question={question} selected={null} revealed={false} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('True'))
    expect(onSelect).toHaveBeenCalledWith('true')
    expect(screen.queryByText(question.explanation)).not.toBeInTheDocument()
  })

  it('shows the explanation once revealed', () => {
    render(<QuizQuestionCard question={question} selected="true" revealed onSelect={() => {}} />)
    expect(screen.getByText(question.explanation)).toBeInTheDocument()
  })
})

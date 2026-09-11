import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'
import type { QuizQuestion } from '@/types'

export function QuizQuestionCard({
  question, selected, revealed, onSelect,
}: { question: QuizQuestion; selected: string | null; revealed: boolean; onSelect: (choiceId: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-base text-ink font-medium leading-relaxed">{question.prompt}</p>
      <div className="space-y-2">
        {question.choices.map((choice) => {
          const isSelected = selected === choice.id
          const isCorrect = choice.id === question.correctChoiceId
          return (
            <button
              key={choice.id}
              disabled={revealed}
              onClick={() => onSelect(choice.id)}
              className={cn(
                'w-full text-left rounded border px-4 py-2.5 text-sm flex items-center justify-between transition-colors',
                !revealed && isSelected && 'border-signal bg-signal-soft',
                !revealed && !isSelected && 'border-line hover:border-ink-faint',
                revealed && isCorrect && 'border-signal bg-signal-soft',
                revealed && isSelected && !isCorrect && 'border-rust bg-rust-soft',
                revealed && !isSelected && !isCorrect && 'border-line opacity-60',
              )}
            >
              <span>{choice.text}</span>
              {revealed && isCorrect && <Check className="w-4 h-4 text-signal" />}
              {revealed && isSelected && !isCorrect && <X className="w-4 h-4 text-rust" />}
            </button>
          )
        })}
      </div>
      {revealed && (
        <div className="bg-paper-sunken rounded p-3 text-sm text-ink-soft">
          {question.explanation}
        </div>
      )}
    </div>
  )
}

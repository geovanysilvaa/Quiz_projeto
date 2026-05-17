import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { QUIZ_QUESTIONS_STORAGE_KEY, seedQuizQuestionsIfEmpty, type Question } from '../data/quizData'

const LETTERS = ['A', 'B', 'C', 'D'] as const

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctIndex, setCorrectIndex] = useState(0)
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    seedQuizQuestionsIfEmpty()
    const saved = localStorage.getItem(QUIZ_QUESTIONS_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Question[]
        if (Array.isArray(parsed)) setQuestions(parsed)
      } catch {
        /* ignore */
      }
    }
  }, []) 

  const showFeedback = (type: 'ok' | 'err', text: string) => {
    setFeedback({ type, text })
    window.setTimeout(() => setFeedback(null), 3200)
  }

  const handleSave = () => {
    const q = newQuestion.trim()
    if (!q) {
      showFeedback('err', 'Escreva o texto da pergunta.')
      return
    }
    const trimmed = options.map((o) => o.trim())
    if (trimmed.some((o) => !o)) {
      showFeedback('err', 'Preencha as quatro alternativas.')
      return
    }
    const answer = trimmed[correctIndex]
    if (!answer) {
      showFeedback('err', 'Escolha qual alternativa é a correta.')
      return
    }

    const questionData: Question = {
      id: Date.now(),
      question: q,
      options: trimmed,
      answer,
    }

    const updatedQuestions = [...questions, questionData]
    setQuestions(updatedQuestions)
    localStorage.setItem(QUIZ_QUESTIONS_STORAGE_KEY, JSON.stringify(updatedQuestions))

    setNewQuestion('')
    setOptions(['', '', '', ''])
    setCorrectIndex(0)
    showFeedback('ok', 'Pergunta salva! Ela já aparece no seu quiz.')
  }

  const removeQuestion = (id: number) => {
    if (!window.confirm('Remover esta pergunta do quiz?')) return
    const next = questions.filter((item) => item.id !== id)
    setQuestions(next)
    localStorage.setItem(QUIZ_QUESTIONS_STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <div className="quiz-shell">
      <header className="quiz-shell__header-row">
        <h1 className="quiz-shell__brand">Novas perguntas</h1>
        <Link to="/" className="text-quiz-yellow text-sm font-bold no-underline hover:underline shrink-0">
          Início
        </Link>
      </header>

      <main className="quiz-shell__panel">
        <div className="quiz-shell__inner">
          <div className="quiz-admin-card">
            <p className="quiz-admin-lead">
              Monte o enunciado, as quatro opções e indique qual é a certa. Tudo fica guardado neste
              aparelho (localStorage) e entra no fluxo do quiz.
            </p>

            <div className="quiz-form-group">
              <label className="quiz-form-label" htmlFor="admin-question">
                Pergunta
              </label>
              <textarea
                id="admin-question"
                className="quiz-textarea"
                placeholder="Ex.: Quem pintou a Mona Lisa?"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                rows={4}
              />
            </div>

            <p className="quiz-form-label quiz-form-label--spaced">Alternativas</p>
            {LETTERS.map((letter, index) => (
              <div key={letter} className="quiz-option-row">
                <span className="quiz-option-badge" aria-hidden>
                  {letter}
                </span>
                <input
                  className="quiz-input quiz-input--grow"
                  placeholder={`Texto da alternativa ${letter}`}
                  value={options[index]}
                  onChange={(e) => {
                    const copy = [...options]
                    copy[index] = e.target.value
                    setOptions(copy)
                  }}
                  aria-label={`Alternativa ${letter}`}
                />
              </div>
            ))}

            <div className="quiz-form-group quiz-form-group--after-options">
              <label className="quiz-form-label" htmlFor="admin-correct">
                Resposta correta
              </label>
              <select
                id="admin-correct"
                className="quiz-select"
                value={correctIndex}
                onChange={(e) => setCorrectIndex(Number(e.target.value))}
              >
                {LETTERS.map((letter, index) => {
                  const preview = options[index]?.trim() || `Alternativa ${letter}`
                  const short =
                    preview.length > 42 ? `${preview.slice(0, 40)}…` : preview
                  return (
                    <option key={letter} value={index}>
                      {letter} — {short}
                    </option>
                  )
                })}
              </select>
              <p className="quiz-form-hint">O quiz só conta acerto se a pessoa marcar exatamente esta opção.</p>
            </div>
          </div>

          <div className="quiz-admin-save-wrap">
            <button type="button" className="quiz-btn-admin-save" onClick={handleSave}>
              Salvar pergunta
            </button>
          </div>

          {feedback && (
            <p
              className={`quiz-admin-feedback ${feedback.type === 'ok' ? 'quiz-admin-feedback--ok' : 'quiz-admin-feedback--err'}`}
              role="status"
            >
              {feedback.text}
            </p>
          )}

          <h2 className="quiz-admin-section-title">Suas perguntas ({questions.length})</h2>
          {questions.length === 0 ? (
            <p className="quiz-admin-empty">
              Nenhuma pergunta na lista. Use o formulário acima para cadastrar de novo.
            </p>
          ) : (
            <ul className="quiz-admin-list">
              {questions.map((item) => (
                <li key={item.id} className="quiz-admin-list-item">
                  <p>{item.question}</p>
                  <button type="button" className="quiz-btn-icon" onClick={() => removeQuestion(item.id)}>
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

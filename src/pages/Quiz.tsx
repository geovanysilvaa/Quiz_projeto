import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mockQuizQuestions, QUIZ_QUESTIONS_STORAGE_KEY, seedQuizQuestionsIfEmpty, type Question, type QuizAnswerReview } from '../data/quizData'

function parseQuestions(raw: string | null): Question[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (q): q is Question =>
        q != null &&
        typeof q === 'object' &&
        typeof (q as Question).question === 'string' &&
        Array.isArray((q as Question).options) &&
        typeof (q as Question).answer === 'string',
    )
  } catch {
    return []
  }
}

export default function Quiz() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loaded, setLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [erros, setErros] = useState(0)
  const [historico, setHistorico] = useState<QuizAnswerReview[]>([])

  useEffect(() => {
    seedQuizQuestionsIfEmpty()
    const fromStorage = parseQuestions(localStorage.getItem(QUIZ_QUESTIONS_STORAGE_KEY))
    setQuestions(fromStorage.length > 0 ? fromStorage : mockQuizQuestions)
    setLoaded(true)
  }, [])

  const currentQuiz = questions[currentStep]

  const handleAnswer = (option: string) => {
    if (!currentQuiz) return

    const isCorrect = option === currentQuiz.answer
    const nextAcertos = isCorrect ? acertos + 1 : acertos
    const nextErros = isCorrect ? erros : erros + 1

    const entrada: QuizAnswerReview = {
      pergunta: currentQuiz.question,
      suaResposta: option,
      respostaCerta: currentQuiz.answer,
      acertou: isCorrect,
    }
    const nextHistorico = [...historico, entrada]

    setAcertos(nextAcertos)
    setErros(nextErros)
    setHistorico(nextHistorico)

    const nextStep = currentStep + 1
    if (nextStep < questions.length) {
      setCurrentStep(nextStep)
    } else {
      navigate('/resultado', {
        state: {
          acertos: nextAcertos,
          erros: nextErros,
          detalhes: nextHistorico,
        },
      })
    }
  }

  if (!loaded) {
    return (
      <div className="quiz-shell bg-quiz-dark">
        <div className="quiz-shell__top">
          <p className="text-quiz-yellow m-0 font-semibold">Carregando...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0 || !currentQuiz) {
    return (
      <div className="quiz-shell bg-quiz-dark">
        <div className="quiz-shell__top">
          <h1 className="quiz-shell__brand m-0">QUIZ</h1>
        </div>
        <main className="quiz-shell__panel">
          <div className="quiz-shell__inner text-center">
            <p className="text-quiz-yellow text-base leading-relaxed m-0 mb-6">
              Não foi possível carregar as perguntas. Tente cadastrar novas questões ou recarregue a página.
            </p>
            <Link
              to="/admin"
              className="inline-block quiz-btn-cta no-underline text-center max-w-none w-full mb-3"
            >
              Cadastrar perguntas
            </Link>
            <Link to="/" className="text-white/70 text-sm underline">
              Voltar ao início
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="quiz-shell">
      <header className="quiz-shell__top">
        <h1 className="quiz-shell__brand">QUIZ</h1>
      </header>

      <main className="quiz-shell__panel">
        <div className="quiz-shell__inner">
          <div className="quiz-question-card">
            <div className="quiz-question-card__icon" aria-hidden>
              🧠
            </div>
            <p className="quiz-question-card__text">{currentQuiz.question}</p>
          </div>

          <div className="quiz-options">
            {currentQuiz.options.map((option, index) => (
              <button
                type="button"
                key={`${currentQuiz.id}-${index}`}
                className="quiz-option-btn"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <p className="quiz-progress">
            Pergunta {currentStep + 1} de {questions.length}
          </p>
        </div>
      </main>
    </div>
  )
}

import { useLocation, useNavigate } from 'react-router-dom'
import type { QuizAnswerReview } from '../data/quizData'

export type ResultLocationState = {
  acertos: number
  erros: number
  detalhes?: QuizAnswerReview[]
}

function isReviewItem(value: unknown): value is QuizAnswerReview {
  if (value == null || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  return (
    typeof o.pergunta === 'string' &&
    typeof o.suaResposta === 'string' &&
    typeof o.respostaCerta === 'string' &&
    typeof o.acertou === 'boolean'
  )
}

function isResultState(value: unknown): value is ResultLocationState {
  if (value == null || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  if (typeof o.acertos !== 'number' || typeof o.erros !== 'number') return false
  if (o.detalhes === undefined) return true
  if (!Array.isArray(o.detalhes)) return false
  return o.detalhes.every(isReviewItem)
}

function mensagemMotivacional(percentual: number): string {
  if (percentual >= 100) return 'Incrível! Você acertou tudo — conhecimento de elite!'
  if (percentual >= 80) return 'Excelente desempenho! Você está no caminho certo.'
  if (percentual >= 60) return 'Muito bom! Com mais um pouco de prática, você domina o tema.'
  if (percentual >= 40) return 'Bom esforço! Revise os pontos mais difíceis e volte mais forte.'
  if (percentual >= 20) return 'Não desista! Cada tentativa aproxima você da maestria.'
  return 'Continue estudando — a persistência transforma dúvidas em certezas.'
}

export default function Result() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state

  if (!isResultState(state)) {
    return (
      <div className="quiz-shell bg-quiz-dark">
        <div className="quiz-shell__top">
          <h1 className="quiz-shell__brand m-0">Resultado</h1>
        </div>
        <main className="quiz-shell__panel">
          <div className="quiz-shell__inner text-center">
            <p className="text-quiz-yellow text-base leading-relaxed m-0 mb-6">
              Não encontramos o resultado desta sessão. Faça um quiz para ver seu desempenho aqui.
            </p>
            <button type="button" className="quiz-btn-cta max-w-none w-full" onClick={() => navigate('/')}>
              Ir para início
            </button>
          </div>
        </main>
      </div>
    )
  }

  const { acertos, erros, detalhes = [] } = state
  const total = acertos + erros
  const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0
  const mensagem = mensagemMotivacional(percentual)

  const acertouLista = detalhes.filter((d) => d.acertou)
  const errouLista = detalhes.filter((d) => !d.acertou)

  return (
    <div className="quiz-shell">
      <header className="quiz-shell__top">
        <h1 className="quiz-shell__brand">Resultado</h1>
      </header>

      <main className="quiz-shell__panel">
        <div className="quiz-shell__inner">
          <div className="quiz-result-card">
            <p className="quiz-result-card__label">Seu desempenho</p>
            <p className="quiz-result-card__percent">{percentual}%</p>
            <p className="quiz-result-card__stats">
              <strong>{acertos}</strong> acerto{acertos !== 1 ? 's' : ''} · <strong>{erros}</strong> erro
              {erros !== 1 ? 's' : ''}
            </p>
            <p className="quiz-result-card__total">Total de questões: {total}</p>
          </div>

          {detalhes.length > 0 && (
            <>
              <h2 className="quiz-review-section-title">O que você acertou</h2>
              {acertouLista.length === 0 ? (
                <p className="quiz-review-empty">Nenhuma nesta rodada.</p>
              ) : (
                <ul className="quiz-review-list">
                  {acertouLista.map((item, i) => (
                    <li key={`ok-${i}`} className="quiz-review-item quiz-review-item--ok">
                      <p className="quiz-review-item__q">{item.pergunta}</p>
                      <p className="quiz-review-item__line">
                        <span className="quiz-review-item__tag">Sua resposta</span> {item.suaResposta}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <h2 className="quiz-review-section-title">O que você errou</h2>
              {errouLista.length === 0 ? (
                <p className="quiz-review-empty">Nenhuma — mandou bem!</p>
              ) : (
                <ul className="quiz-review-list">
                  {errouLista.map((item, i) => (
                    <li key={`bad-${i}`} className="quiz-review-item quiz-review-item--err">
                      <p className="quiz-review-item__q">{item.pergunta}</p>
                      <p className="quiz-review-item__line">
                        <span className="quiz-review-item__tag">Você marcou</span> {item.suaResposta}
                      </p>
                      <p className="quiz-review-item__line quiz-review-item__line--certa">
                        <span className="quiz-review-item__tag">Certo era</span> {item.respostaCerta}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          <div className="quiz-motivation">
            <p>{mensagem}</p>
          </div>

          <button type="button" className="quiz-btn-white" onClick={() => navigate('/')}>
            Voltar para início
          </button>
        </div>
      </main>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import LogoQuiz from '../assets/Logo-Quiz.svg'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="quiz-home">
      <div className="quiz-home__art">
        <img src={LogoQuiz} alt="Ilustração do quiz" width={293} height={275} />
      </div>

      <h1 className="quiz-home__title">QUIZ</h1>

      <p className="quiz-home__tagline">
        Está na hora de ser o especialista oficial em... nada específico!
      </p>

      <div className="quiz-home__spacer" aria-hidden />

      <div className="quiz-home__actions">
        <button type="button" className="quiz-btn-cta" onClick={() => navigate('/quiz')}>
          Começar
        </button>
        <button type="button" className="quiz-btn-outline" onClick={() => navigate('/admin')}>
          Adicionar perguntas
        </button>
      </div>
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Quiz from './pages/Quiz.tsx'
import Result from './pages/Result.tsx'
import AdminQuestions from './pages/AdminQuestions.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/resultado" element={<Result />} />
      <Route path="/admin" element={<AdminQuestions />} />
    </Routes>
  )
}
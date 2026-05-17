export interface Question {
  id: number
  question: string
  options: string[]
  answer: string
}

/** Uma rodada respondida (vai no state do resultado) */
export type QuizAnswerReview = {
  pergunta: string
  suaResposta: string
  respostaCerta: string
  acertou: boolean
}

/** Chave usada no localStorage (quiz + admin) */
export const QUIZ_QUESTIONS_STORAGE_KEY = '@quiz_questions'

/**
 * Na primeira visita (sem chave salva), grava o pacote padrão de perguntas.
 * Assim o quiz e a tela "Novas perguntas" já vêm populados.
 */
export function seedQuizQuestionsIfEmpty(): void {
  if (typeof localStorage === 'undefined') return
  if (localStorage.getItem(QUIZ_QUESTIONS_STORAGE_KEY) != null) return
  try {
    localStorage.setItem(QUIZ_QUESTIONS_STORAGE_KEY, JSON.stringify(mockQuizQuestions))
  } catch {
    /* quota / modo privado */
  }
}

/** Pacote inicial de perguntas (também usado como fallback se o JSON estiver inválido) */
export const mockQuizQuestions: Question[] = [
  {
    id: 1,
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ['Machado de Assis', 'José de Alencar', 'Clarice Lispector', 'Graciliano Ramos'],
    answer: 'Machado de Assis',
  },
  {
    id: 2,
    question: 'Qual é a capital do Piauí?',
    options: ['Parnaíba', 'Teresina', 'Picos', 'Piripiri'],
    answer: 'Teresina',
  },
  {
    id: 3,
    question: 'Em que ano Pedro Álvares Cabral chegou ao Brasil?',
    options: ['1392', '1492', '1500', '1522'],
    answer: '1500',
  },
  {
    id: 4,
    question: 'Qual elemento químico tem símbolo "O"?',
    options: ['Ouro', 'Oxigênio', 'Ósmio', 'Ozônio'],
    answer: 'Oxigênio',
  },
  {
    id: 5,
    question: 'Quantos lados tem um triângulo?',
    options: ['Dois', 'Três', 'Quatro', 'Cinco'],
    answer: 'Três',
  },
  {
    id: 6,
    question: 'Qual é o maior planeta do sistema solar?',
    options: ['Terra', 'Saturno', 'Júpiter', 'Netuno'],
    answer: 'Júpiter',
  },
  {
    id: 7,
    question: "Quem pintou 'A Noite Estrelada'?",
    options: ['Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí', 'Claude Monet'],
    answer: 'Vincent van Gogh',
  },
  {
    id: 8,
    question: 'Qual é o menor país do mundo em área?',
    options: ['Mônaco', 'Vaticano', 'San Marino', 'Liechtenstein'],
    answer: 'Vaticano',
  },
  {
    id: 9,
    question: 'Em qual continente fica o Egito?',
    options: ['Ásia', 'Europa', 'África', 'Oceania'],
    answer: 'África',
  },
  {
    id: 10,
    question: 'Quantos jogadores de um time estão em campo no futebol de campo?',
    options: ['9', '10', '11', '12'],
    answer: '11',
  },
  {
    id: 11,
    question: 'Qual é a fórmula da água?',
    options: ['CO₂', 'H₂O', 'NaCl', 'O₂'],
    answer: 'H₂O',
  },
  {
    id: 12,
    question: 'Qual destes é um mamífero?',
    options: ['Pinguim', 'Morcego', 'Jacaré', 'Salmão'],
    answer: 'Morcego',
  },
  {
    id: 13,
    question: 'Qual é a capital da Argentina?',
    options: ['Rosário', 'Córdoba', 'Buenos Aires', 'Mendoza'],
    answer: 'Buenos Aires',
  },
  {
    id: 14,
    question: 'Quem compôs a Nona Sinfonia com o "Hino à Alegria"?',
    options: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
    answer: 'Beethoven',
  },
  {
    id: 15,
    question: 'Qual oceano banha a costa leste do Brasil?',
    options: ['Índico', 'Pacífico', 'Atlântico', 'Ártico'],
    answer: 'Atlântico',
  },
]

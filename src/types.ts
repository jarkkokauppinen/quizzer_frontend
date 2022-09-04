export interface Questions {
  category: string
  correctAnswer: string
  id: number
  incorrectAnswers: string[]
  question: string
  type: string
}

export interface Highscores {
  _id?: string
  name: string
  score: number
  __v?: number
}
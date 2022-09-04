import { useEffect, useRef, useState } from 'react'
import { Questions, Highscores } from '../types'
import App from '../App'
import LifeLines from './LifeLines'
import Timer from './Timer'
import Stars from './Stars'
import win from '../sounds/win.mp3'
import lose from '../sounds/lose.mp3'

interface Props {
  questions?: Questions[]
  highscores?: Highscores[]
}

const Game = ({ questions, highscores }: Props) => {
  const [round, increaseRounds] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>(['A', 'B', 'C', 'D'])
  const [score, setScore] = useState<number>(0)
  const [allowClicks, setAllowClicks] = useState<boolean>()
  const [lowestScore, setLowestScore] = useState<number>(0)
  const [rightAnswer, setRightAnswer] = useState<boolean>()
  const [gameOver, setGameOver] = useState<boolean>()
  const [answerStatus, setAnswerStatus] = useState<boolean[]>([])
  
  const refs = useRef<any>([])

  const winSound = new Audio(win)
  const loseSound = new Audio(lose)

  useEffect(() => {
    if (round === 15) setGameOver(true)

    for (const ref of refs.current) {
      ref.classList.remove('green', 'red')
    }

    if (questions && highscores) {
      setAnswers([
        questions[round].incorrectAnswers[0],
        questions[round].incorrectAnswers[1],
        questions[round].incorrectAnswers[2],
        questions[round].correctAnswer
      ].sort(() => 0.5 - Math.random()))
      setLowestScore(highscores[highscores.length - 1].score)
      setAllowClicks(true)
      setRightAnswer(false)
    }
  }, [highscores, questions, round])

  const answerClick = (answer: string, index: number) => {
    if (answer === '') return
    
    setAllowClicks(false)

    if (questions) {
      answer === questions[round].correctAnswer
      ? showTheRightAnswer(index, 'green', true, winSound)
      : showTheRightAnswer(index, 'red', false, loseSound)
    }
  }

  const showTheRightAnswer = (index: number, color: string, status: boolean, sound: HTMLAudioElement) => {
    refs.current[index].classList.add(color)
    setAnswerStatus([...answerStatus, status])
    sound.play()

    if (questions && color === 'red') {
      const interval = setInterval(() => {
        const right = answers.indexOf(questions[round].correctAnswer)
        refs.current[right].classList.toggle('green')
      }, 500)

      setTimeout(() => {
        clearInterval(interval)
        increaseRounds(round => round + 1)
      }, 3500)
    } else {
      setRightAnswer(true)
      setTimeout(() => {
        increaseRounds(round => round + 1)
      }, 2000)
    }
  }

  const letter = (index: number) => {
    switch(index) {
      case 0:
        return 'A : '
      case 1:
        return 'B : '
      case 2:
        return 'C : '
      case 3:
        return 'D : '
    }
  }

  const options = (array: string[], index: number) => {
    const clickable = array.map((answer, i) => (
      <div
        key={i}
        ref={el => refs.current[i + index] = el}
        className={i === 0 ? 'option blue optionsLeft' : 'option blue optionsRight'}
        onClick={allowClicks ? () => answerClick(answer, i + index) : undefined}>
        <div
          className='centerOption'
          style={{fontSize: answer.length > 88 ? 13 : ''}}>
          {answer !== '' ? letter(i + index) : ''}{answer}
        </div>
      </div> 
    ))
    return clickable
  }

  if (gameOver) {
    return (
      <App
        score={score}
        lowestScore={lowestScore}
        gameOver={gameOver}
      />
    )
  }

  if (questions) {
    return (
      <div>
        <LifeLines
          round={round}
          answers={answers}
          setAnswers={setAnswers}
          allowClicks={allowClicks}
          correct={questions[round].correctAnswer}
        />
        
        <div className='score-n-round'>
          <div>SCORE : {score}</div>
          <div>{round + 1} / 15</div>
        </div>
        
        <div className='question blue'>
          <div className='centerQuestion'
            style={{fontSize: questions[round].question.length > 350 ? 13 : ''}}>
            {questions[round].question}
          </div>
        </div>

        <div className='options'>{options([answers[0], answers[1]], 0)}</div>
        <div className='options'>{options([answers[2], answers[3]], 2)}</div>

        <Timer 
          round={round}
          setScore={setScore}
          allowClicks={allowClicks}
          rightAnswer={rightAnswer}
          setGameOver={setGameOver}
        />
        <Stars
          answerStatus={answerStatus}
        />
      </div>
    )
  }
  
  return (
    <div>
      loading...
    </div>
  )
}

export default Game
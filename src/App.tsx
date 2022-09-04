import { useEffect, useState } from 'react'
import { Questions, Highscores } from './types'
import Logo from './components/Logo'
import Game from './components/Game'
import Form from './components/Form'
import HighscoreList from './components/HighscoreList'
import './App.css'

interface Props {
  score: number
  lowestScore: number
  gameOver: boolean
}

const App = ({ score, lowestScore, gameOver }: Props) => {
  const [questions, setQuestions] = useState<Questions[]>()
  const [highscores, setHighscores] = useState<Highscores[]>()
  const [play, playGame] = useState<boolean>()
  const [displayList, setDisplayList] = useState<boolean>()
  const [newGame, setNewGame] = useState<boolean>()

  useEffect(() => {
    void fetchQuestions()
    void fetchHighscores()
  }, [])
  
  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/api/questions?limit=16')
      setQuestions(await response.json())
    } catch (error) {
      console.error(error)
    }
  }

  const fetchHighscores = async () => {
    try {
      const response = await fetch('/highscores')
      setHighscores(await response.json())
    } catch (error) {
      console.error(error)
    }
  }

  const highscoreView = () => {
    setDisplayList(true)
    setNewGame(true)
  }

  if (play) {
    return (
      <div className='app'>
        <Game
          questions={questions}
          highscores={highscores}
        />
      </div>
    )
  }

  if (displayList) {
    if (highscores) {
      return (
        <div className='app'>
          <div>
            <HighscoreList highscores={highscores} />
            <button 
              className='button'
              onClick={() => setDisplayList(false)}>
              OK
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className='app'>
        loading...
      </div>
    )
  }
  
  return (
    <div className='app'>
      <div>
        {!gameOver || newGame
          ? <Logo />
          : <div><h2>GAME OVER</h2><h3>SCORE : {score}</h3></div>}
        {!newGame && score > lowestScore
        ?
        <Form
          highscores={highscores}
          setHighscores={setHighscores}
          setDisplayList={setDisplayList}
          setNewGame={setNewGame}
          score={score}
        />
        :
        <div>
          <button
            className='button'
            onClick={() => playGame(true)}>
            START
          </button>
          <br></br>
          <button 
            className='button'
            onClick={highscoreView}>
            HIGHSCORES
          </button>
        </div>}
      </div>
    </div>
  )
}

export default App
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Highscores } from '../types'
import fanfare from '../sounds/fanfare.mp3'

interface Props {
  highscores?: Highscores[]
  setHighscores: Dispatch<SetStateAction<Highscores[] | undefined>>
  setDisplayList: Dispatch<SetStateAction<boolean | undefined>>
  setNewGame: Dispatch<SetStateAction<boolean | undefined>>
  score: number
}

const Form = ({ highscores, setHighscores, setDisplayList, setNewGame, score }: Props) => {
  const [name, setName] = useState<string>()

  useEffect(() => {
    const fanfareSound = new Audio(fanfare)
    fanfareSound.play()
  }, [])

  const addScore = () => {
    if (!name) return
    
    const player: Highscores = {name: name, score: score}

    const settings = {
      method: 'POST',
      body: JSON.stringify(player),
      headers: { 'content-type' : 'application/json' }
    }

    try {
      fetch('/highscores', settings)
    } catch (error) {
      console.log(error)
    }
    
    highscores?.pop()
    setHighscores(highscores?.concat(player))
    setDisplayList(true)
    setNewGame(true)
  }

  return (
    <div>
      <h3>CONGRATULATIONS! HIGHSCORE!</h3>
      <input 
        className='input'
        maxLength={15}
        placeholder='enter your name here'
        onChange={(event) => setName(event.target.value)}
      />
      <div>
        <button 
          className='button'
          onClick={addScore}
          style={{width: 320, marginTop: 20}}>
          OK
        </button>
      </div>
    </div>
  )
}

export default Form
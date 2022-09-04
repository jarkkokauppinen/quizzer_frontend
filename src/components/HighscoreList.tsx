import { Highscores } from '../types'
import '../css/Highscores.css'

interface Props {
  highscores: Highscores[]
}

const HighscoreList = ({ highscores }: Props) => {
  highscores.sort((a, b) => b.score - a.score)

  return (
    <>
    <h2>HIGHSCORES</h2>
      {highscores.map(((player, i) =>
        <div key={i} className='highscores'>
          <div id='left'>
            <span className='left'>
              <div className='ball'>
                <div className='center'>
                  <span className='number'>{i + 1}</span>
                </div>
              </div>
              <div className='name'>{player.name}</div>
            </span>
          </div>
          <div id='right'>
            <span className='right'>{player.score}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default HighscoreList
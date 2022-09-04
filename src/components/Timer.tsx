import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  round: number
  setScore: Dispatch<SetStateAction<number>>
  allowClicks?: boolean
  rightAnswer?: boolean
  setGameOver: Dispatch<SetStateAction<boolean | undefined>>
}

const Timer = ({ round, setScore, allowClicks, setGameOver, rightAnswer }: Props) => {
  const [width, setWidth] = useState<number>(100)
  const [loop, setLoop] = useState<number>()

  useEffect(() => {
    setWidth(100)
    
    const interval: any = setInterval(() => {
      setWidth(width => width - 0.1)
    }, 30)

    setLoop(interval)
    
    return () => clearInterval(interval)
  }, [round])

  useEffect(() => {
    if (width !== 100) setScore(score => score += Math.floor(width * 10))
  }, [rightAnswer]) // eslint-disable-line

  useEffect(() => {
    if (width < 1) setGameOver(true)
  }, [setGameOver, width])

  if (!allowClicks || width < 1) clearInterval(loop)

  return (
    <div>
      <div className='timerBackground'>
        <div
          className='timer'
          style={{width: `${width}%`}}>
        </div>
      </div>
    </div>
  )
}

export default Timer
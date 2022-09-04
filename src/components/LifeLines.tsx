import { CSSProperties, Dispatch, SetStateAction, useState } from 'react'
import fiftyfiftyImage from '../images/fiftyfifty.png'
import phoneImage from '../images/phone.png'
import audienceImage from '../images/audience.png'
import PhoneCall from './PhoneCall'
import Audience from './Audience'
import '../css/LifeLines.css'

interface Props {
  round: number
  answers: string[]
  setAnswers: Dispatch<SetStateAction<string[]>>
  allowClicks?: boolean
  correct: string
}

const LifeLines = ({ round, answers, setAnswers, allowClicks, correct }: Props) => {
  const [fiftyfiftyUsed, setFiftyfiftyUsed] = useState<boolean>()
  const [phoneUsed, setPhoneUsed] = useState<boolean>()
  const [audienceUsed, setAudienceUsed] = useState<boolean>()
  const [fiftyfiftyRound, setFiftyfiftyRound] = useState<number>()
  const [phoneRound, setPhoneRound] = useState<number>(0)
  const [audienceRound, setAudienceRound] = useState<number>(0)
  const [displayCall, setDisplayCall]= useState<boolean>()
  const [displayAudience, setDisplayAudience] = useState<boolean>()
  const [statement, setStatement] = useState<string>('')
  const [percents, setPercents] = useState<number[]>([0])

  const fiftyfiftyStyle = {
    opacity: fiftyfiftyUsed ? '0.5' : '',
    cursor: fiftyfiftyUsed ? '' : 'pointer'
  }

  const phoneStyle = {
    marginLeft: 10,
    marginRight: 10,
    opacity: phoneUsed ? '0.5' : '',
    cursor: phoneUsed ? '' : 'pointer'
  }

  const audienceStyle = {
    opacity: audienceUsed ? '0.5' : '',
    cursor: audienceUsed ? '' : 'pointer'
  }

  const phoneVisibility = {
    visibility:
    round > phoneRound || !allowClicks || !displayCall ? 'hidden' : ''
  } as CSSProperties

  const audienceVisibility = {
    visibility:
    round > audienceRound || !allowClicks || !displayAudience ? 'hidden' : ''
  } as CSSProperties

  const fiftyfifty = () => {
    setFiftyfiftyUsed(true)
    setDisplayCall(false)
    setDisplayAudience(false)
    setFiftyfiftyRound(round)

    let removeFirst = ''
    let removeSecond = ''

    do { removeFirst = answers[Math.floor(Math.random() * answers.length)] }
    while (removeFirst === correct)

    do { removeSecond = answers[Math.floor(Math.random() * answers.length)] }
    while (removeSecond === correct || removeSecond === removeFirst)

    setAnswers(answers.map(answer =>
      answer === removeFirst || answer === removeSecond ? '' : answer))
  }

  const phone = () => {
    setPhoneUsed(true)
    setDisplayCall(true)
    setDisplayAudience(false)
    setPhoneRound(round)

    const guess = answers[Math.floor(Math.random() * answers.length)]

    const statements = [
      `Your guess is as good as mine. Good luck!`,
      `${guess} sounds familiar, but I'm not sure about it.`,
      `${correct} is the right answer. No doubt about it.`
    ]

    let statement = statements[Math.floor(Math.random() * statements.length)]
    if (round === fiftyfiftyRound) statement = statements[2]
    setStatement(statement)
  }

  const audience = () => {
    setAudienceUsed(true)
    setDisplayAudience(true)
    setDisplayCall(false)
    setAudienceRound(round)

    const percent1 = Math.floor(Math.random() * 20) + 40
    let percent2 = Math.floor(Math.random() * (75 - percent1))
    if (percent2 < 10) percent2 = percent2 + 5
    let percent3 = Math.floor(Math.random() * (75 - percent1 - percent2))
    if (percent3 < 10) percent3 = percent3 + 5
    
    const rightIndex = answers.indexOf(correct)
    let opinions : number[] = []

    if (round === fiftyfiftyRound) {
      let higher = percent1
      let lower = 100 - percent1

      if (lower > higher) {
        higher = lower
        lower = 100 - higher
      }

      const array = answers.map(answer => answer === '' ? answer = '0' : lower)
      array.splice(rightIndex, 1, higher)
      opinions = array.map(string => Number(string))

    } else {
      const percent4 = 100 - percent1 - percent2 - percent3
      opinions = [percent2, percent3, percent4]
      opinions.splice(rightIndex, 0, percent1)
    }
    
    setPercents(opinions)
  }

  return (
    <div>
      <div style={phoneVisibility}>
        <PhoneCall statement={statement} />
      </div>
      <div style={audienceVisibility}>
        <Audience percents={percents} />
      </div>
      <div className='lifeLines'>
        <img
          src={fiftyfiftyImage}
          style={fiftyfiftyStyle}
          onClick={!fiftyfiftyUsed && allowClicks ? fiftyfifty : undefined}
          alt='fiftyfifty'>
        </img>
        <img
          src={phoneImage}
          style={phoneStyle}
          onClick={!phoneUsed && allowClicks ? phone : undefined}
          alt='phone'>
        </img>
        <img
          src={audienceImage}
          style={audienceStyle}
          onClick={!audienceUsed && allowClicks ? audience : undefined}
          alt='audience'>
        </img>
      </div>
    </div>
  )
}

export default LifeLines
import bubble from '../images/bubble.png'

interface Props {
  statement: string
}

const PhoneCall = ({ statement }: Props) => {
  const statementStyle = {
    fontSize: statement?.length > 80 ? 13 : ''
  }

  return (
    <div>
      <div className='phoneCall'>
        <img src={bubble} alt='bubble'></img>
        <span
          className='statement'
          style={statementStyle}>
          {statement}
        </span>
      </div>
    </div>
  )
}

export default PhoneCall
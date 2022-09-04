import emptyStar from '../images/star_empty.png'
import filledStar from '../images/star_filled.png'

interface Props {
  answerStatus: boolean[]
}

const Stars = ({ answerStatus }: Props) => {
  const imageArray : string[] = []

  for (let i = 0; i < 15; i++) {
    imageArray.push(emptyStar)
    if (answerStatus[i] === true) imageArray.splice(i, 1, filledStar)
  }

  return (
    <div>
      {imageArray.map((star, i) =>
      <img key={i} src={star} className='star' alt='star'></img>)}
    </div>
  )
}

export default Stars
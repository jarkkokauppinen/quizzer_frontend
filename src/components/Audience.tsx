interface Props {
  percents: number[]
}

const Audience = ({ percents }: Props) => {
  return (
    <div className='audienceParent'>
      <div className='audienceChild'>
        <div className='audienceBackground'>
          <div className='bars'>
            <span className='bar' id='bar_D' style={{height: percents[3]}}>
              <div className='letter'>D</div>
              <div className='percent'>{percents[3]}%</div>
            </span>
            <span className='bar' id='bar_C' style={{height: percents[2]}}>
              <div className='letter'>C</div>
              <div className='percent'>{percents[2]}%</div>
            </span>
            <span className='bar' id='bar_B' style={{height: percents[1]}}>
              <div className='letter'>B</div>
              <div className='percent'>{percents[1]}%</div>
            </span>
            <span className='bar' id='bar_A' style={{height: percents[0]}}>
              <div className='letter'>A</div>
              <div className='percent'>{percents[0]}%</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )  
}

export default Audience
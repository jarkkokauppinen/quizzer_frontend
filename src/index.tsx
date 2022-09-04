import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App 
    score={-1}
    lowestScore={0}
    gameOver={false}
  />,
document.getElementById('root'))
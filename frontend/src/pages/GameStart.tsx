import { useState } from 'react'
import '../style/pages/gamestart.css'

const GameStart = () => {

  const [number, setNumber] = useState(0)

  return (
    <div className='game-start-main-container'>
        
        <p>Choose the length of the word you want to guess and click start to start the game</p>
        <input type="number" min={3} max={7} onChange={(val) => setNumber(Number(val.target.value))}/>
        <button>Start The Game</button>
    </div>
  )
}

export default GameStart

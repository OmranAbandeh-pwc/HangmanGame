import '../style/components/gameresult.css'

const GameResult = ({ resultText }: {resultText:string}) => {


    function reload() {
        window.location.reload() 
    }

  return (
    <div className='game-result-main-container'>
      <div className='wen-container'>
        <h1>
            {resultText}
        </h1>
        <button onClick={reload}> Restart the game</button>
       
      </div>
    </div>
  )
}

export default GameResult

import {  useState } from "react"
import '../style/pages/gamestart.css'
import GuessingPage from "./GuessingPage"


const Home = () => {


  const [wordData, setWordData]:any = useState({
      
    wordLength: 0,
    wordId: 0,
    wordScore:0,
    loading:false,
    showGuessingPage:false
  
  })

  // Start Game Function
  
  const handleStartGame = async () => {
    
    // Checking if the Entered Number is between 3 and 7
    if(wordData.wordLength > 7 || wordData.wordLength < 3){
      alert('Enter a Number between 3 & 7')
      
    // Fetching Start Game api, this api will take the word length from user and get a random...
    // ...word have the Entered length 
    } else {
      setWordData({...wordData, loading: true})
      const dataSumbit = {
        "wordLength": wordData.wordLength
      }
  
      const response = await fetch("/api/randomword", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charest=UTF-8"
        },
        body: JSON.stringify(dataSumbit)
  
      }) 
      const data = await response.json()
      setWordData({...wordData, wordId : data.id, wordScore:data.score, loading: false, showGuessingPage: true}) 
      
    }  
  }

  return (
    <>
    {wordData.showGuessingPage ? <GuessingPage wordScore={wordData.wordScore} wordLength={wordData.wordLength} wordid={wordData.wordId}/> : 
    <div className='game-start-main-container'>
      <h1>Hangman Game</h1>
      <p>Choose the length of the word you want to guess and click start to start the game</p>
      <input type="number" min={3} max={7} onChange={(val) => setWordData({...wordData,wordLength: Number(val.target.value)})}/>
      <button onClick={handleStartGame}>Start The Game</button>
      <div className="loading-start-game">{ wordData.loading ? 'Loading....' : "Let's go"}</div>
    </div> }   
    </>
  )
}

export default Home

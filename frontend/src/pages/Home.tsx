import {  useEffect, useState } from "react"
import '../style/pages/gamestart.css'
import GuessingPage from "./GuessingPage"
import { StartGameData } from "../types"
import { disableWordActive } from "../functions/index"

import PulseLoader from "react-spinners/PulseLoader"


const Home = () => {

  const [startGameData, setStartGameData] = useState<StartGameData>({
      
    wordLength: 0,
    wordId: 0,
    wordScore:0,
    loading:false,
    showGuessingPage:false
  
  })


  useEffect(() => {
    disableWordActive()
  }, [])




  // Start Game Function
  
  const handleStartGame = async () => {
    const userToken = localStorage.getItem("userToken")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    myHeaders.append("Content-Type", "application/json");

    // Checking if the Entered Number is between 3 and 7
    if(startGameData.wordLength > 7 || startGameData.wordLength < 3){
      alert('Enter a Number between 3 & 7')
      
    // Fetching Start Game api, this api will take the word length from user and get a random...
    // ...word have the Entered length 
    } else {
      setStartGameData({...startGameData, loading: true})
      const dataSumbit = {
        "wordLength": startGameData.wordLength
      }
  
      const response = await fetch("/hangman/startGame", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(dataSumbit)
  
      }) 
      const data = await response.json()
      setStartGameData({...startGameData, wordId : data.id, wordScore:data.score, loading: false, showGuessingPage: true}) 
      
    }  
  }

  const logoutHandle = () => {
    localStorage.clear() 
    window.location.reload()
  }
 
  return (
    <>
    {startGameData.showGuessingPage ? <GuessingPage wordScore={startGameData.wordScore} wordLength={startGameData.wordLength} wordid={startGameData.wordId}/> : 
    <div className='game-start-main-container'>
      
      <h1>Hangman Game</h1>
      <p>Choose the length of the word you want to guess and click start to start the game</p>
      <input type="number" min={3} max={7} onChange={(val) => setStartGameData({...startGameData,wordLength: +val.target.value})}/>
      <button onClick={handleStartGame}>Start The Game</button>
      <button onClick={logoutHandle}>logout</button>
      <div className="loading-start-game">{ startGameData.loading ? <PulseLoader color="grey"/> : "Let's go"}</div>
    </div> }   
    </>
  )
}

export default Home

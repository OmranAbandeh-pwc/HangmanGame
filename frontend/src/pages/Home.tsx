import { useEffect, useState } from "react"

import '../style/pages/gamestart.css'
import GuessingPage from "./GuessingPage"



const Home = () => {

  const [wordLength, setWordLength] = useState(0)
  const [wordid, setWordid] = useState()
  const [showGuessingPage, setShowGuessingPage] = useState(false)

  useEffect(() => {
  },[])



  const handleStartGame = async () => {

    if(wordLength > 7 || wordLength < 3){
      alert('put the right number')
      
    } else {
      const dataSumbit = {
        "wordLength": wordLength
      }
  
      fetch("/api/randomword", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charest=UTF-8"
        },
        body: JSON.stringify(dataSumbit)
  
      }).then(res => res.json())
      .then(res => { setWordid(res.id)  })
      console.log(wordid)
      setShowGuessingPage(true)
    }
    
  }


  return (
    <>
    {!showGuessingPage ? <div className='game-start-main-container'>
        <p>Choose the length of the word you want to guess and click start to start the game</p>
        <input type="number" min={3} max={7} onChange={(val) => setWordLength(Number(val.target.value))}/>
        <button onClick={handleStartGame}>Start The Game</button>
    </div> : <GuessingPage wordLength={wordLength} wordid={wordid!}/>}
       
    </>
  )
}

export default Home

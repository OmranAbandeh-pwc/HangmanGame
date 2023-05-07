import { useEffect, useState } from 'react';
import GameResult from '../components/GameResult';
import HangmanWord from '../components/HangmanWord';
import Keyboard from '../components/Keyboard'
import UserProgress from '../components/UserProgress';
import '../style/pages/home.css'
import { ResponseObject } from '../types';

const GuessingPage = ({wordLength, wordid, wordScore }:{wordLength:number, wordid:number, wordScore:number}) => {


  const [guessedLetters, setGuessedLetters] = useState([""])
  const [result, setResult]:any = useState({
      
    showResult: false,
    failsNumber: 0,
    successNumber: 0,
    resultText: ''
  
  })
  const [wordToGuess, setWordToGuess] = useState([''])


  
useEffect(() => {

  setWordToGuess(new Array(wordLength).fill('*'))
  
},[])
  

// Guessing Function 
  const handleGuesses = async (key:string) => {
  
    // Fetching the check API to get the response if the letter that have been selected is right or wrong 
      const dataSumbit = {
        "guessedLetter": key.toLowerCase(),
        "wordID":wordid
      }
  
      const response = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charest=UTF-8"
        },
        body: JSON.stringify(dataSumbit)
      })
      const data:ResponseObject = await response.json()
      
      // If the letter was wrong then I have to check if the number of failes still less than 6 attempts
      // If number of fails still less than 6 then I increase one to the fails number
      if(!data.msg){
        
        if(result.failsNumber > 5){
          setResult({...result, failsNumber: 7, showResult: true, resultText: "YOU LOSE!! :("})
        } else {
          setResult({...result, failsNumber: result.failsNumber + 1})
        }
        // adding the letter to the guessed letters to display the button
        setGuessedLetters([...guessedLetters, key.toLowerCase()])        
        
      // If the letter was right I will add it to the wordToGuess in the right index...
      // ...to show it to the user in the right position
      // then I check if the number of success is === to the word-length...
      // ...if yes I will show the result...
      // ...if no I will increase one to the success number
      } else {
               
          setWordToGuess((oldState) => {
            for(let i = 0; i < data.letterIndex.length; i++){
              oldState[data.letterIndex[i]] = data.guessedLetter
            }
            return oldState;
          })     
          
          if(result.successNumber === wordLength - 1){
            setResult({...result, showResult: true, resultText: "YOU WON!! :)"})
          } else {
            setResult({...result, successNumber: result.successNumber + data.letterIndex.length})
          }
          // adding the letter to the guessed letters to display the button
          setGuessedLetters([...guessedLetters, key.toLowerCase()])
          
        }                       
  }


  return (
    <>  
      
      { <div className='home-main-container'>
        <UserProgress wordScore={wordScore} numberOfLoses={result.failsNumber} wordLength={wordToGuess.length}/>

        <div className='game-playground-container'>
        <div className='hangman-word'>
          < HangmanWord wordToGuess={wordToGuess}  guessedLetter={guessedLetters} />
        </div>
    
        { !result.showResult ? <div className='keyboard-container'>
          <Keyboard guessedLetter={guessedLetters} keyclicked={handleGuesses}/>
        </div> : ""}
        <div className='result-test'>{result.showResult ? 
        <GameResult resultText={result.resultText}/> : ""}
        </div>
        
        </div>
        
      </div>      
      }
      
    </>
    
  )
}

export default GuessingPage
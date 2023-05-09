
import '../style/components/keyboard.css'
import { keyBoardLetters } from "../GlobalFile"

const Keyboard = ({keyclicked, guessedLetter}:{keyclicked:any; guessedLetter:any }) => {


  return (
    <>
      {keyBoardLetters.map((key) => (<button disabled = {guessedLetter.includes(key.toLowerCase()) ? true : false} onClick={() => keyclicked(key)} className='keys-btn' key={key}>{key}</button>))} 
    </>
  )
}

export default Keyboard

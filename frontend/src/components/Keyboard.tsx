
import { useEffect } from 'react';
import '../style/components/keyboard.css'

const Keyboard = ({keyclicked, guessedLetter}:{keyclicked:any; guessedLetter:any }) => {

  let letters:Array<string>;

  letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
 

  return (
    <>
      {letters.map((key) => (<button disabled = {guessedLetter.includes(key.toLowerCase()) ? true : false} onClick={() => keyclicked(key)} className='keys-btn' key={key}>{key}</button>))} 
    </>
  )
}

export default Keyboard

import { hangManImages } from "../GlobalFile"

const UserProgress = ({ wordLength, numberOfLoses, wordScore }: { wordLength:number, numberOfLoses:number, wordScore:number}) => {
  
  return (
    <div className='user-progress'>

        <img src={hangManImages[numberOfLoses]} />
        <p> user name : <span>omran</span></p>
        <p> user score : <span>{wordScore}</span></p>
        <p> word length : <span>{wordLength}</span></p>
        <p className='warning'>{`warning: you only have ${numberOfLoses} attempts`}</p>
          
    </div>
  )
}

export default UserProgress

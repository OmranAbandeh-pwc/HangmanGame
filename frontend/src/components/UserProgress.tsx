import React from 'react'

const UserProgress = ({ wordLength, numberOfLoses, wordScore }: { wordLength:number, numberOfLoses:number, wordScore:number}) => {
  const hangManImages = [
    'https://www.oligalma.com/downloads/images/hangman/hangman/3.jpg',
    'https://www.oligalma.com/downloads/images/hangman/hangman/4.jpg',
    'https://www.oligalma.com/downloads/images/hangman/hangman/5.jpg',
    'https://www.oligalma.com/downloads/images/hangman/hangman/6.jpg',
    'https://www.oligalma.com/downloads/images/hangman/hangman/7.jpg',
    'https://www.oligalma.com/downloads/images/hangman/hangman/8.jpg',
    'https://www.oligalma.com/downloads/images/hangman/hangman/9.jpg',
    'https://www.oligalma.com/downloads/images/hangman/hangman/10.jpg',

  ]
  return (
    <div className='user-progress'>

        <img src={hangManImages[numberOfLoses]} />
        <p> user name : <span>omran</span></p>
        <p> user score : <span>{wordScore}</span></p>
        <p> user loses : <span>{numberOfLoses}</span></p>
        <p> word length : <span>{wordLength}</span></p>
        <p className='warning'>warning: you only have 7 attempts</p>
          
    </div>
  )
}

export default UserProgress

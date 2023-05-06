
const HangmanWord = ({wordToGuess, guessedLetter}:{wordToGuess:Array<string>, guessedLetter:Array<string>}) => {

 

  return (
    <div className="words-leter" style={{
        display: "flex",
        gap: ".25em",
        fontSize: "5em",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace"
      }}>
      { wordToGuess.map((letter, index) => (
      <span key={index} style={{ borderBottom: ".1em solid black"}}>
        <span style={{visibility: guessedLetter.includes(letter) ? "visible" : "hidden"}}>
          {letter}
        </span>
      </span>))}

      </div>
  )
}

export default HangmanWord

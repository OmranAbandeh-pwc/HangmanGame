const Word = require('../models/GameModel')



// ----------------API to Get Random Word----------------
const startGame = async (req, res) => {
    const  {wordLength}  = req.body
  
    const numberOfLetters = new Array(wordLength).fill("?")
    
    const response = await fetch(`https://api.datamuse.com/words?sp=${numberOfLetters.join("")}&max=1000`)
    const data = await response.json()
    let randomIndex = Math.floor(Math.random() * data.length)
    const word = await Word.create({ word:data[randomIndex].word, score:data[randomIndex].score, id: Math.floor(Math.random() * 1000) })
    res.status(200).json({ id:word.id, score:word.score })
}



// ----------------API to Check the Answer----------------
const checkAnswer = async (req, res) => {
    const { guessedLetter, wordID } = req.body;
    const checkWord = await Word.findOne({ id:wordID })

    try{
        if(checkWord){

            const answer = checkWord.word.includes(guessedLetter)
            if ( answer ) {
                
                let letterIndex = []
                for(let i = 0; i < checkWord.word.length; i++){
                    if(guessedLetter === checkWord.word[i]){
                        letterIndex.push(i)
                    }
                }
                res.status(200).json({msg:true, guessedLetter,letterIndex})
            } else {
                res.status(200).json({ msg: false})
            }
    
        } else {
            res.status(400).json({ msg: "word not found" })
        }
    } catch(error){
        res.status(400).json({ error:error.msg})
    }

}



module.exports = { startGame, checkAnswer }


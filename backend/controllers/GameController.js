const Word = require('../models/GameModel')



// ----------------API to Get Random Word----------------
const getRandomWord = async (req, res) => {
    const  {wordLength}  = req.body
    let sum = ''
    for(let i = 0; i < wordLength; i++){
        sum+='?'
    }
    
    const response = await fetch(`https://api.datamuse.com/words?sp=${sum}&max=1000`)
    const data = await response.json()
    let randomIndex = Math.floor(Math.random() * data.length)
    const word = await Word.create({ word:data[randomIndex].word, score:data[randomIndex].score, id: Math.floor(Math.random() * 1000) })
    res.status(200).json({ id:word.id })
}



// ----------------API to Check the Answer----------------
const checkAnswer = async (req, res) => {
    const { guessedLetter, wordID } = req.body;
    const check = await Word.findOne({ id:wordID })

    try{
        if(check){

            const answer = check.word.includes(guessedLetter)
            if ( answer ) {
                // const letterIndex = check.word.indexOf(guessedLetter) 
                let letterIndex = []
                for(let i = 0; i < check.word.length; i++){
                    if(guessedLetter === check.word[i]){
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

const update = async (req, res) => {
    const { id } = req.params

    const score = await Word.findOne({id:id})

    const w = score.score
    const upd = await Word.findOneAndUpdate( {id:id}, {
        score : w + 100
    })

    res.status(200).json({ msg:score.score })
}

module.exports = { getRandomWord, checkAnswer, update }


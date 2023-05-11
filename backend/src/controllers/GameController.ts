import express ,{ Request, Response } from "express"
import Word from "../models/WordModel"



// Start Game Function API Controller
export const startGame = async (req:any, res:Response) => {
    const { wordLength } = req.body
    const userid = req.userid
    

    console.log(wordLength)
    const numberOfLetters = new Array(wordLength).fill("?")
    const response = await fetch(`https://api.datamuse.com/words?sp=${numberOfLetters.join("")}&max=1000`)
    console.log('after')
    const data = await response.json()
    let randomIndex = Math.floor(Math.random() * data.length)

    const word = await Word.create({ word:data[randomIndex].word, score:data[randomIndex].score, active:true, userid: userid })

    
    res.status(200).json({ word })
}


// Check Answer API Controller
export const checkAnswer = async (req:any, res:Response) => {
    const { guessedLetter } = req.body;
    const userid = req.userid
    const checkWord = await Word.findOne({ userid: userid, active:true })

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
                res.status(200).json({msg:true, guessedLetter,letterIndex })
            } else {
                res.status(200).json({ msg: false})
            }
    
        } else {
            res.status(400).json({ msg: "word not found" })
        }
    } catch(error){
        res.status(400).json({ error:"error.msg"})
    }
}


// disable word to non active API Controller
export const disableWordActive = async (req:any, res:Response) => {
    const userid = req.userid
    
    const activeWord = await Word.findOneAndUpdate({ userid:userid, active:true },{
        active:false
    })
    res.status(200).json({activeWord})
}



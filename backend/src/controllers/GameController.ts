import express ,{ Response } from "express"
import Word from "../models/WordModel"
import RequestWithUserRole from "../types/index"



// Start Game Function API Controller
export const startGame = async (req:RequestWithUserRole, res:Response) => {
    const { wordLength } = req.body
    const userid = req.userid
    

    await Word.findOneAndUpdate({ userid: userid, status:"inProgress" },{
        status: "lost"
    })
    const numberOfLetters = new Array(wordLength).fill("?")
    const response = await fetch(`https://api.datamuse.com/words?sp=${numberOfLetters.join("")}&max=1000`)
    console.log('after')
    const data = await response.json()
    let randomIndex = Math.floor(Math.random() * data.length)

    const word = await Word.create({ word:data[randomIndex].word, score:data[randomIndex].score, wordLength:wordLength, guesses: [], correctGuesses: [], incorrectGuesses: [], remainingGuesses: 7, status: "inProgress", userid: userid })
    
    
    res.status(200).json({ mag : "started successfuly" })
}


// Handling the Answer API 
export const handleAnswer = async (req:RequestWithUserRole, res:Response) => {
    const { guessedLetter } = req.body;
    const userid = req.userid
    const checkWord = await Word.findOne({ userid: userid, status: "inProgress" })

    let allGuesses: Array<string> ;
    let resultGuesses: Array<string>;

    try{
        if(checkWord){
            const isLetterCorrect = checkWord.word.includes(guessedLetter)
            allGuesses = checkWord.guesses
            allGuesses.push(guessedLetter)    

            // If the Answer is correct 
            if ( isLetterCorrect ) {
                let letterIndex = []
                resultGuesses = checkWord.correctGuesses         
                
                for(let i = 0; i < checkWord.word.length; i++){
                    if(guessedLetter === checkWord.word[i]){
                        letterIndex.push(i)
                        resultGuesses.push(guessedLetter)        
                    }
                }
                await Word.findOneAndUpdate({ userid: userid, status: "inProgress" }, {
                    guesses: allGuesses, correctGuesses: resultGuesses
                })

                if ( checkWord.correctGuesses.length === checkWord.wordLength ){
                    await Word.findOneAndUpdate({ userid: userid, status: "inProgress" }, {
                        status: "won"
                    })
                }
                res.status(200).json({msg:true, guessedLetter,letterIndex })
               
            // If the Answer was false    
            } else {

                resultGuesses = checkWord.incorrectGuesses
                resultGuesses.push(guessedLetter)

                await Word.findOneAndUpdate({ userid: userid, status: "inProgress" }, {
                    guesses: allGuesses, incorrectGuesses: resultGuesses, remainingGuesses: checkWord.remainingGuesses - 1
                })

                if ( checkWord.incorrectGuesses.length === 7 ){
                    await Word.findOneAndUpdate({ userid: userid, status: "inProgress" }, {
                        status: "lost"
                    })
                }
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
export const disableWordActive = async (req:RequestWithUserRole, res:Response) => {
    const userid = req.userid
    
    const activeWord = await Word.findOneAndUpdate({ userid:userid, active:true },{
        active:false
    })
    res.status(200).json({activeWord})
}




// ---------
export const totalScore = async (req:RequestWithUserRole, res:Response) => {
    
    const userid = req.userid

    const wordsScore = await Word.findOneAndUpdate({  })
    
    
}


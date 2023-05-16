import mongoose, { model, Schema } from "mongoose"



export const wordSchema = new Schema ({
    word:{
        type:String,
        required: true
    },
    score: {
        type:Number,
        required: true
    },
    wordLength: {
        type:Number,
        required:true
    },
    guesses: {
        type: Array,
        required: true
    },
    correctGuesses: {
        type: Array,
        required: true
    },
    incorrectGuesses: {
        type: Array,
        required: true
    },
    remainingGuesses: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userid: {
        type:String,
        required: true
    },
} ,{ collection: "words" })


const Word = model("word", wordSchema)

export default Word;

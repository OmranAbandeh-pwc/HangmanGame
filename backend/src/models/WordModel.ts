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
    active: {
        type:Boolean,
        required: true
    },
    userid: {
        type:String,
        required: true
    },
} ,{ collection: "words" })


const Word = model("word", wordSchema)

export default Word;

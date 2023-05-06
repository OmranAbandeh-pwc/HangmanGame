const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    word:{
        type:String,
        required:true,
    },
    score: {
        type:Number,
        required:true
    },
    id: {
        type:Number,
        required:true
    }
},{collection:"words"})

module.exports = mongoose.model("Word", gameSchema)


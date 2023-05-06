require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const GameRouter = require("./routers/GameRouter.js")

const app = express()

app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api', GameRouter)


mongoose.connect('mongodb://localhost:27017/hangman').then(() => {
    console.log('database connected')
    
})
app.listen(process.env.PORT, () => {
    console.log("listening on Port ",process.env.PORT)
})

import express, {Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import { router } from "./routers/GameRouter"

const app = express()

app.use(express.json())

app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(req.path, req.method)
    next()
})

app.use("/hangman", router)

mongoose.connect("mongodb://localhost:27017/Typesscript").then(() => {
console.log("data base connected")
})

app.listen(4000, () => {
    console.log("listening on port ",4000)
})
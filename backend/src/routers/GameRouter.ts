import express from "express"
import { startGame, checkAnswer, disableWordActive } from "../controllers/GameController"
import { loginController, signupControler } from "../controllers/UserController"
import { verifyToken } from "../VerifyToken"


export const router = express.Router()


 router.post("/startGame",verifyToken ,startGame)

 router.post("/checkAnswer",verifyToken ,checkAnswer ) 

 router.patch("/disableWordActive",verifyToken ,disableWordActive)

 router.post("/signup", signupControler)

 router.post("/login", loginController)
 
const express = require("express")
const { startGame, checkAnswer } = require('../controllers/GameController')
const router = express.Router()


router.post("/startGame", startGame)

router.post('/checkAnswer', checkAnswer)




module.exports = router;
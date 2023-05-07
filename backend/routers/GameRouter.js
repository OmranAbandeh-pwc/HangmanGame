const express = require("express")
const { getRandomWord, checkAnswer } = require('../controllers/GameController')
const router = express.Router()


router.post("/randomword", getRandomWord)

router.post('/check', checkAnswer)




module.exports = router;
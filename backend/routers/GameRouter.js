const express = require("express")
const { getRandomWord, checkAnswer, update } = require('../controllers/GameController')
const router = express.Router()


router.post("/randomword", getRandomWord)

router.post('/check', checkAnswer)

router.patch('/update/:id', update)


module.exports = router;
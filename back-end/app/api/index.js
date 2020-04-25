const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UsersRouter = require('./users')
//  importer le router de themes
const ThemeRouter = require('./themes')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UsersRouter)
// utiliser le sub-router des themes
router.use('/themes', ThemeRouter)

module.exports = router

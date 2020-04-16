const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
//  importer le router de themes
const ThemeRouter = require('./themes')



const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
//utiliser le sub-router des themes
router.use('/themes',ThemeRouter)



module.exports = router

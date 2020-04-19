const { Router } = require('express')

const { Quiz } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const { buildQuizz, buildQuizzes } = require('./manager')

const router = new Router()

router.use('/:quizId/questions', QuestionsRouter)

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {//  api/quizz/5
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/getQuizzesByThemeId/:themeId',(req, res)=>{  // GET  api/quizzes/getQuizzesByThemeId/5
  try{
    const themeId = req.params.themeId
    // TODO:
    // 1. fetch a list of quiz,  along with a counter of questions, by theme Id ( filter ),
    const quizList = Quiz.get().filter(function (quiz) {
      return quiz.themeId == themeId;
    })
    
    // 2. return the list in the response
     res.status(200).json(quizList)     
    // res.status(200).json(themeId)
  } catch(err){
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router

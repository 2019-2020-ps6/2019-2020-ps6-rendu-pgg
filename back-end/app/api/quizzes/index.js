const { Router } = require('express')

const { Quiz } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const { buildQuizz, buildQuizzes } = require('./manager')
const mongoose=require('mongoose')
const router = new Router()
router.use('/:quizId/questions', QuestionsRouter)

router.get('/quizes', (req, res) => {
  Quiz.find().then(results=>{
    console.log(results)
    if(results) res.status(200).json(results);
  }).catch(err=>{
      if(err) res.status(500).send('error : '+err);
  })
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/quizes', (req, res) => {
  console.log(req.body)
    //const quiz = Quiz.create({ ...req.body })
    const newQuiz= new Quiz({
      _id: new mongoose.Types.ObjectId(),
      nom:req.body.nom,
      theme:req.body.theme
    })
    newQuiz.save().then(createdQuize=>{
      res.status(201).json({
        message:"Quiz crée",
        IdQuiz : createdQuize._id
      })
    })
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

const { Router } = require('express')

const { User, Attempt } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')

const { filterAttemptsFromUser, getAttemptFromUser } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if userId exists, if not it will throw a NotFoundError
    User.getById(req.params.userId)
    res.status(200).json(filterAttemptsFromUser(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:attemptId', (req, res) => {
  try {
    const attempt = getAttemptFromUser(req.params.userId, req.params.attemptId)
    res.status(200).json(attempt)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    const question = filterAttemptsFromUser(req.params.userId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if userId exists, if not it will throw a NotFoundError
    const userId = parseInt(req.params.userId, 10)
    const attemptBody = { score: req.body.score, userId }
    const attempt = Attempt.create(attemptBody)
    res.status(201).json(attempt)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:attemptId', (req, res) => {
  try {
    // Check if the attempt id exists & if the attempt has the same attemptId as the one provided in the url.
    getAttemptFromUser(req.params.userId, req.params.attemptId)
    Attempt.delete(req.params.attemptId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/', (req, res) => {
  try {
    // Check if the attempt id exists & if the attempt has the same attemptId as the one provided in the url.
    const attempts = filterAttemptsFromUser(req.params.userId)
    Question.delete(req.params.questionId)
    questions.array.forEach((element) => {
      Question.delete(element)
    })
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router

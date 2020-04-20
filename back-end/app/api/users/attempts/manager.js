const { User, Attempt } = require('../../../models')
const NotFoundError = require('../../../utils/errors/not-found-error')
/**
 * Attempts Manager.
 * This file contains all the logic needed to by the question routes.
 */
const filterAttemptsFromUser = (userId) => {
  const attempts = Attempt.get()
  const parsedId = parseInt(userId, 10)
  return attempts.filter((attempt) => attempt.userId === parsedId)
}

const getAttemptFromUser = (userId, attemptId) => {
  // Check if userId exists, if not it will throw a NotFoundError
  const user = User.getById(userId)
  const userIdInt = parseInt(userId, 10)
  const attempt = Attempt.getById(attemptId)
  if (attempt.userId !== userIdInt) throw new NotFoundError(`Not found for ${user.name} id=${user.id} : not found`)
  return question
}

module.exports = {
    filterAttemptsFromUser,
    getAttemptFromUser,
}

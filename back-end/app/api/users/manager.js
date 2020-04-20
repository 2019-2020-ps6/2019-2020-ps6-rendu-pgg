const { User } = require('../../models')

/**
 * @param userId
 */
const buildUser = (userId) => {
  const user = User.getById(userId)
  /*const attempts = filterAttemptsFromUser(user.id)
  const attemptsWIth = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })*/
  return user
}

/**
 * 
 */
const buildUsers = () => {
  const users = User.get()
  return users.map((user) => buildUser(user.id))
}

module.exports = {
  buildUser,
  buildUsers,
}

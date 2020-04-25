const { User } = require('../../models')
const { filterAttemptsFromUser } = require('./attempts/manager')

/**
 * @param userId
 */
const buildUser = (userId) => {
  const user = User.getById(userId)
  console.log(`ID : ${user.id}`)
  const attempts = filterAttemptsFromUser(user.id)
  // console.log(attempts)
  /* const attemptsWIth = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  }) */
  return { ...user, attempts }
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

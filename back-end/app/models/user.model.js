const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nextQuestionFollows: Joi.boolean(),
  bigPointer: Joi.boolean(),
  previousQuestion: Joi.boolean(),
  repeatQuestion: Joi.boolean(),
  answersColor: Joi.boolean(),
  displayScore: Joi.boolean(),
})

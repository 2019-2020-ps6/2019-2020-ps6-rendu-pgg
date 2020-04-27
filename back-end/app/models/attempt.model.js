const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Attempt', {
  id: Joi.number(),
  quizId: Joi.number().required(),
  userId:Joi.number(),
  score: Joi.number().required(),
})

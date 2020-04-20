const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Attempt', {
    userId: Joi.number(),
    score: Joi.number(),
  })
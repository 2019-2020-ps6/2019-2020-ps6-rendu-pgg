const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  id: Joi.number(),
  theme: Joi.string(),
  name: Joi.string().required()
})

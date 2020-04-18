const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  id: Joi.number(),
  themeId: Joi.number(),
  name: Joi.string().required(),
  
})

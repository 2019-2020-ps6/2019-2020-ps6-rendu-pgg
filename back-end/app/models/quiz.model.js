const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  themeId: Joi.string(),
  name: Joi.string().required(),
})

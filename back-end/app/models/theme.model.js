const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
  id: Joi.number(),
  name: Joi.string().required(),
  // image: Joi.string().allow(''),
})

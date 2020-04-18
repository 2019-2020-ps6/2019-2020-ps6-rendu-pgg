/*const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  themeId: Joi.number(),
  name: Joi.string().required(),
})*/
const mongoose=require('mongoose');
const uniqueValid = require('mongoose-unique-validator');

const quizSchemia = mongoose.Schema({
 
  nom:{type:String,require:true},
  themeId:{type : mongoose.Schema.Types.ObjectId, required : true, ref :"Theme"}
})
//Generer un id en comparant l'id précedent 
quizSchemia.plugin(uniqueValid);
module.exports=mongoose.model('Quiz',quizSchemia);

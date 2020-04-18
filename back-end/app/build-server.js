const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
// Pour la base de données
const mongoose=require('mongoose')
const urlBd='mongodb://127.0.0.1:27017/PolyQuiz';

module.exports = (cb) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors())
  app.use(bodyParser.json({}))
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))
  app.use('/api', api)
  app.use('*', (req, res) => res.status(404).end())
  const server = app.listen(process.env.PORT || 9428, () => cb && cb(server))
  // Pour voir c'est la base de données est connéctée ou pas 
  mongoose.connect(urlBd,{useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
  console.log("Connected to database succes!");
}).catch(()=>{
  console.log("Erreur de la connex");
});
}


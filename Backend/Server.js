const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => {
  res.send('helllo World')
})
//Connect to mongoDB and start Server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
  })
}).catch((error)=>{
    console.log(error.message);
})

const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT
const app = express()
const cookieParser = require('cookie-parser')
const userRoutes = require('./Routes/UserRoute')
const errorHandler = require('./Middlewares/ErrorMiddleWare')

//MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(cors)

//Routes middlewares
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('helllo World')
})

//Error middleware
app.use(errorHandler)
//Connect to mongoDB and start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message)
  })

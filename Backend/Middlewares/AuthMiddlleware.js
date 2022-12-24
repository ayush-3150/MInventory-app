const asyncHandler = require('express-async-handler')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')

const protectMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log('token ' + token)
    if (!token) {
      console.log('no token')
      res.status(401)
      console.log('401')
      throw new Error('Not Authorized Please log in again')
    }
    //Verify token
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    console.log('verify ' + verify)
    //Get all the user detail for given id except password
    const user = await User.findById(verify.id).select('-password')

    console.log('user ' + user)

    if (!user) {
      console.log('not user')
      res.status(401)
      throw new Error('User NOT FOUND')
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401)
    throw new Error('(3)Please log in again')
  }
})

module.exports = protectMiddleware

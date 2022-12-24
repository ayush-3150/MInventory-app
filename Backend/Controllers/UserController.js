const asyncHandler = require('express-async-handler')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
const registerUser = asyncHandler(async (req, res) => {
  //   console.log(req.body)

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please Fill in all the required fields')
  }
  if (password.length < 5) {
    res.status(400)
    throw new Error('Password length should be more than or equal to 5')
  }
  if (password.length > 20) {
    res.status(400)
    throw new Error('Password length should not be more than 20')
  }

  //check if Email is already present or not
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('Email is already exists')
  }

  //Create new User
  const user = await User.create({
    name,
    email,
    password
  })

  //Generate Token
  const token = generateToken(user._id)

  //setting cookie for JWTtoken
  res.cookie('token', token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 86400),
    httpOnly: true,
    sameSite: 'none',
    secure: false
  })

  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({
      _id,
      name,
      email,
      bio,
      phone,
      photo,
      token
    })
  } else {
    res.status(400).json({ error: 'something went wrong while registration' })
    throw new Error("something went wrong while registration'")
  }
})

//Login User

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please Fill in all the required fields')
  }
  if (password.length < 5) {
    res.status(400)
    throw new Error('Password length should be more than or equal to 5')
  }
  if (password.length > 20) {
    res.status(400)
    throw new Error('Password length should not be more than 20')
  }
  const user = await User.findOne({ email })
  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  //Generate Token
  const token = generateToken(user._id)
  res.cookie('token', token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 86400),
    httpOnly: true,
    sameSite: 'none',
    secure: false
  })
  if (user && isPasswordCorrect) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({
      _id,
      name,
      email,
      bio,
      phone,
      photo,
      token
    })
  } else {
    throw new Error('credentials are not correct')
  }
})

//logout user

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'none',
    secure: false
  })
  res.send('Log out done')
})

//Get User profile

const getUserProfile = asyncHandler(async (req, res) => {
  console.log('here')
  console.log('req.user' + req.user)
  const user = await User.findById(req.user._id)
  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({
      _id,
      name,
      email,
      bio,
      phone,
      photo
    })
  } else {
    throw new Error('User not found')
  }
})
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
}

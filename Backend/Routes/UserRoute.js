const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
} = require('../Controllers/UserController')
const protectMiddleware = require('../Middlewares/AuthMiddlleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/profile', protectMiddleware, getUserProfile)

module.exports = router

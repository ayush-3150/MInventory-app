const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getLoginStatus,
  updateProfile,
  changePassword
} = require('../Controllers/UserController')
const protectMiddleware = require('../Middlewares/AuthMiddlleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/loginStatus', getLoginStatus)
router.get('/profile', protectMiddleware, getUserProfile)
router.patch('/updateProfile', protectMiddleware, updateProfile)
router.patch('/changePassword', protectMiddleware, changePassword)

module.exports = router

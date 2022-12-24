const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please Enter your Email'],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Please enter a valid Email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please Enter a Password'],
      minLength: [5, 'Password length must be atleast 5']
    },
    photo: {
      type: String,
      required: [true, 'Please Enter a Photo'],
      default: 'https://i.ibb.co/4pDNDk1/avatar.png'
    },
    Phone: {
      type: String,
      default: '1234567890'
    },
    Bio: {
      type: String,
      default: 'Bio',
      maxLength: 255
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User

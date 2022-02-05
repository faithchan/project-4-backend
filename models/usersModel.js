const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      default: 'user',
    },
    tokensCreated: [
      {
        type: [Number],
        unique: true,
      },
    ],
    tokensOwned: [
      {
        type: Number,
        unique: true,
      },
    ],
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  let user = this
  bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', userSchema)

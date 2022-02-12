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
    },
    type: {
      type: String,
      required: true,
      default: 'user',
    },
    avatar: {
      type: String,
      required: true,
      default:
        'https://bafkreigj5xab3lrgu7nty4r2sqwbfqkudeed7pz2w7fvajnflgphyw6nlu.ipfs.infura-ipfs.io/',
    },
    followers: [
      {
        type: [String], // wallet addresses
        unique: true,
        default: [],
      },
    ],
    following: [
      {
        type: [String], // wallet addresses
        unique: true,
        default: [],
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

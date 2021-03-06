const express = require('express')
const app = express()
const User = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.post('/', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
    if (!user) {
      console.log('Session Controller: Invalid Email')
      return res.status(401).send({
        status: 401,
        message: 'Invalid Email',
      })
    }

    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) {
      console.log('Sessions Controller: Invalid Password')
      return res.status(401).send({
        status: 401,
        message: 'Invalid Password',
      })
    }

    console.log('User is logged in: ' + user)

    // encode jwt and send
    const token = jwt.sign(
      {
        email: user.email,
        role: user.type,
        username: user.username,
        walletAddress: user.walletAddress,
      },
      process.env.SECRET,
      { expiresIn: '1h', algorithm: 'HS256' }
    )

    console.log('token generated:', token)
    return res.send({ token })
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = app

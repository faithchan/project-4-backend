const express = require('express')
const methodOverride = require('method-override')
const app = express()

const cors = require('cors')
const CORS_WHITELIST = process.env.CORS_WHITELIST.split(',')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(
  cors({
    origin: CORS_WHITELIST,
  })
)

const usersController = require('./controllers/usersController')
const sessionController = require('./controllers/sessionController')

app.use('/users', usersController)
app.use('/sessions', sessionController)

module.exports = app

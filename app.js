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

app.get('/', async (req, res) => {
  res.send('hello world')
})

module.exports = app

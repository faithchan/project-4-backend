const express = require('express')
const methodOverride = require('method-override')
const app = express()
const cors = require('cors')

app.get('/', async (req, res) => {
  res.send('hello world')
})

module.exports = app

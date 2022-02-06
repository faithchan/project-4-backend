const express = require('express')
const app = express()
const Token = require('../models/tokensModel')
const methodOverride = require('method-override')
const tokensSeed = require('../seed/tokensSeed')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const token = await Token.find()
  res.send(token)
})

app.get('/seed', async (req, res) => {
  console.log('seeding with data: ', tokensSeed)
  try {
    const seedItems = await Token.create(tokensSeed)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

// app.delete('/all', async (req, res) => {
//   const receipt = await Token.deleteMany({})
//   res.send(receipt)
// })

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const token = await Token.findById(id)
  console.log('Token: ', token)
  res.send(token)
})

app.post('/', async (req, res) => {
  console.log('new Token: ', req.body)
  try {
    const token = await Token.create(req.body)
    res.send(token._id)
    console.log('token: ', token._id)
  } catch (err) {
    return res.status(401).send({
      status: 401,
      message: 'Error adding token to database',
    })
  }
})

app.delete('/:id', async (req, res) => {
  const token = await Token.findOneAndDelete({ _id: req.params.id })
  res.send(token)
})

app.put('/:id', async (req, res) => {
  const token = await Token.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(token)
})

module.exports = app

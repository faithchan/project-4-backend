const express = require('express')
const app = express()
const Token = require('../models/tokensModel')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const tx = await Token.find()
  res.send(tx)
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const tx = await Token.findById(id)
  console.log('Token: ', tx)
  res.send(tx)
})

app.post('/', async (req, res) => {
  console.log('new Token: ', req.body)
  const tx = await Token.create(req.body)
  res.send(tx._id)
  console.log('tx: ', tx._id)
})

app.delete('/:id', async (req, res) => {
  const tx = await Token.findOneAndDelete({ _id: req.params.id })
  res.send(tx)
})

app.put('/:id', async (req, res) => {
  const tx = await Token.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(tx)
})

module.exports = app

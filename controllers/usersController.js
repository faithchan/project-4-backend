const express = require('express')
const app = express.Router()
const User = require('../models/usersModel')
const usersSeed = require('../seed/usersSeed')
const methodOverride = require('method-override')
const jwt = require('jsonwebtoken')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

// app.use((req, res, next) => {
//   console.log('hwsdfdsfsf')
//   next()
// })

app.get('/', async (req, res) => {
  console.log('User Controller: Trying to get users')
  console.log(req.context)
  try {
    const users = await User.find()
    console.log(users)
    res.send(users)
  } catch (err) {
    res.status(500).send('Error occured while retreiving users')
    return
  }
})

app.get('/drop', async (req, res) => {
  console.log('dropping users collection')
  try {
    const txn = await User.collection.drop()
    res.send(txn)
  } catch (err) {
    res.send(err.message)
  }
})

app.get('/whitelist', async (req, res) => {
  console.log('User Controller: Trying to get whitelisted users')
  try {
    const users = await User.find({ whitelistStatus: true })
    console.log(users)
    res.send(users)
  } catch (err) {
    res.status(500).send('Error occured while retreiving whitelisted users')
    return
  }
})

app.get('/owned/:address', async (req, res) => {
  console.log('User Controller: Trying to get tokens owned')
  try {
    const user = await User.find({ walletAddress: req.params.address })
    console.log(user)
    res.send(user)
  } catch (err) {
    res.status(500).send('Error occured while retreiving tokens owned')
    return
  }
})

app.get('/created/:address', async (req, res) => {
  console.log('User Controller: Trying to get tokens owned')
  try {
    const user = await User.findOne({ walletAddress: req.params.address })
    console.log(user)
    res.send(user)
  } catch (err) {
    res.status(500).send('Error occured while retreiving tokens created')
    return
  }
})

app.get('/seed', async (req, res) => {
  console.log('seeding with data: ', usersSeed)
  try {
    const seedItems = await User.create(usersSeed)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  console.log('user: ', user)
  res.send(user)
})

app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body)
    console.log(user)
    res.status(200).send(user)
  } catch (error) {
    console.error(error)
    res.status(401).send(error)
  }
})

// app.put('/:address', async (req, res) => {
//   const user = await User.updateOne({ walletAddress: req.params.address }, req.body, {
//     new: true,
//   })
//   res.send(user)
// })

app.put('/:id', async (req, res) => {
  console.log('req params:', req.params.id)
  const user = await User.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(user)
})

app.delete('/all', async (req, res) => {
  const receipt = await User.deleteMany({})
  res.send(receipt)
})

app.delete('/:id', async (req, res) => {
  try {
    console.log('User Controller: Trying to delete an user')
    const user = await User.findOneAndDelete({ _id: req.params.id })
    res.send(`This ${user.username} has been deleted`)
  } catch (error) {
    console.log('Delete User Controller Error: ' + error.message)
  }
})

//verify jwt
app.use((req, res, next) => {
  console.log('UserController: Middleware Check Activated')
  console.log('Request Information: ', req.headers.token)
  if (!req.headers.token) {
    res.status(401).send('No token found, user is unauthenticated. Please log in')
    return
  }
  try {
    const payload = jwt.verify(req.headers.token, process.env.SECRET)
    console.log('current payload', payload)
    if (payload.role !== 'admin') {
      console.log('UserController.js: User is not admin')
      res.status(401).send('User is not admin')
      return
    }
    req.context = payload
    next()
  } catch (err) {
    console.log('error message caught in user controller: ', err)
    res.status(401).send('Expired or Invalid Token, Please Login')
    return
  }
})

module.exports = app

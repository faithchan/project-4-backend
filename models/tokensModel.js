const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema(
  {
    tokenId: {
      type: Number,
      required: true,
    },
    tokenURI: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    creator: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    listPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Token', tokenSchema)

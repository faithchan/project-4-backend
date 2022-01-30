const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema(
  {
    tokenId: {
      type: Number,
      required: true,
      unique: true,
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
      default: 0,
    },
    status: {
      type: String,
      default: 'Unlisted',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Token', tokenSchema)

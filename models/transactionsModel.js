const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    tokenId: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    transactionStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema)

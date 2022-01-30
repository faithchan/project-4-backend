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
    transactedPrice: {
      type: Number,
      required: true,
    },
    royaltyRecipient: {
      type: String,
    },
    royaltyAmount: {
      type: Number,
    },
    transactionStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema)

const mongoose = require('mongoose')

const wodSchema = new mongoose.Schema({
  wod: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  createdAt: {
    type: Number,
    default: Date.now()
  }
})

const wodModel = mongoose.model('wod', wodSchema)
module.exports = wodModel

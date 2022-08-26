const mongoose = require('mongoose')

const GovernmentSchema = new mongoose.Schema({
  email: String,
  password: String,
},{
  timestamps: true
})

module.exports = mongoose.model('government', GovernmentSchema)
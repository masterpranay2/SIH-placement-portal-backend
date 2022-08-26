const mongoose = require('mongoose')

const CorporateSchema = new mongoose.Schema({
  email: String,
  password: String,
  companyname: String,
},{
  timestamps: true
})

module.exports = mongoose.model('Corporate', CorporateSchema)
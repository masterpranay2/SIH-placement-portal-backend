const mongoose = require('mongoose')

const InstitutionSchema = new mongoose.Schema({
  email: String,
  password: String,
  institutionid: String,
  institutionname: String,
},{
  timestamps: true
})

module.exports = mongoose.model('Institution', InstitutionSchema)
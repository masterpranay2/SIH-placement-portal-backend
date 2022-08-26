const mongoose = require('mongoose')

const RefreshTokenSchema = new mongoose.Schema({
  role_id: mongoose.Schema.Types.ObjectId,
  token: String,
},{
  timestamps: true,
})

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema)
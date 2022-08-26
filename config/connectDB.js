const mongoose = require('mongoose')

const connectDB = mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_NAME })
.then(() => {
  console.log('Connected to MongoDB')
})

mongoose.connection.on('connected', () => {
  console.log('Mongosse connected to MongoDB')
})

mongoose.connection.on('error', err => {
  console.log(err.message || err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB')
})

// SIGINT fires when you press Ctrl+C
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})

module.exports = connectDB
const http = require('http')
const os = require('os')
const { resolve } = require('path')
const app = require('./app')
require('dotenv').config()
require('./config/connectDB')

const PORT = process.env.PORT || 5000

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on port ${os.hostname()}:${PORT}`)
})

process.on('unhandledException', (err) => {
  console.log(err)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
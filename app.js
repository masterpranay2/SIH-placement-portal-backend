const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const helmet = require('helmet')

const studentRoutes = require('./routes/students.routes')
const institutionRoutes = require('./routes/institutions.routes')
const corporateRoutes = require('./routes/corporates.routes')
const governmentRoutes = require('./routes/government.routes')

const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')

const app = express()

app.use(helmet())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/student', studentRoutes)
app.use('/api/institution', institutionRoutes)
app.use('/api/corporate', corporateRoutes)
app.use('/api/government', governmentRoutes)

app.use(errorHandler)

module.exports = app
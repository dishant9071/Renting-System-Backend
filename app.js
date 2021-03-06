const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

// Load config
dotenv.config({
    path: './config/config.env'
})

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Routes
app.use('/buyer', require('./routes/buyer'))
app.use('/seller', require('./routes/seller'))
app.use('/product', require('./routes/product'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
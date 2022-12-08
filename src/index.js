const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const ConnectDataBase = require('./config/database')

// config env
dotenv.config()
const PORT = process.env.PORT

// express instance
const app = express()

// public folder
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// apply middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))
app.use(cors())

// config routes
routes(app)

// connect database
ConnectDataBase()

// listening
app.listen(PORT, () => console.log('Server listening on port: ' + PORT))

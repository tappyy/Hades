const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const mongoDb = require('./src/utils/mongoDb')
const { SERVER_PORT } = require('./src/utils/constants')

// assign middlewares
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

// import routes
const pages = require('./src/routes/pages')
const users = require('./src/routes/users')

// assign routes
app.use('/api/pages', pages)
app.use('/api/users', users)

// connect to mongodb
mongoDb.connect()
  .then(() => console.log('mongo connected'))
  .then(() => {
    // start app
    app.listen(SERVER_PORT, () => {
      console.log(`Backend listening on port ${SERVER_PORT}!`)
    })
  }).catch(error => {
    console.error(error)
    process.exit(1)
  })
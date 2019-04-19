const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, { cookie: false })
const mongoDb = require('./src/utils/mongoDb')
const { SERVER_PORT } = require('./src/utils/constants')
const SocketController = require('./src/socketController')

// assign middlewares
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

// import routes
const pages = require('./src/routes/pages')
const users = require('./src/routes/users')
const cases = require('./src/routes/cases')

// Applying the other routes
// set global io variable for app
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// assign routes
app.use('/api/pages', pages)
app.use('/api/users', users)
app.use('/api/cases', cases)

// connect to mongodb
mongoDb.connect()
  .then(() => console.log('Successfully connected to MongoDB'))
  .then(() => {
    // start app
    server.listen(SERVER_PORT, () => {
      console.log(`Successfully started server on port ${SERVER_PORT}`)
    })

    io.on('connection', function (socket) {
      console.log(`new socket: ${socket.id}`)

      socket.on('setupSocket', (data) => {
        SocketController.userConnected(io, socket, data)
      })
      console.log(`${io.engine.clientsCount} active connections`)

      socket.on('disconnect', () => {
        SocketController.userDisconnected(io, socket)
        console.log(`socket disconnected`)
        console.log(`${io.engine.clientsCount} active connections`)
      })
    });
  }).catch(error => {
    console.error(error)
    process.exit(1)
  })
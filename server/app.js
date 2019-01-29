const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const { SERVER_PORT } = require('./src/utils/constants')
const mongoDb = require('./src/utils/mongoDb')

// assign middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes
const spider = require('./src/routes/spider')

// assign routes
app.use('/api/spider', spider);

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
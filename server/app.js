const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const { PythonShell } = require('python-shell')
const { sanitise } = require('./src/utils/sanitiseScrapedData')
const { SERVER_PORT } = require('./src/utils/constants')
const mongoDb = require('./src/utils/mongoDb')

// assign middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// assign routes
const test = require('./src/routes/test')

// app.get('/', (req, res) => res.send('hello world'))
app.use('/api/test', test);

// connect to db
mongoDb.connect()
  .then(() => console.log('mongo connected'))
  .then(() => {
    // start app
    app.listen(SERVER_PORT, () => {
      console.log(`Listening on port ${SERVER_PORT}!`)
      startSpider()
    })
  }).catch(error => {
    console.error(error)
    process.exit(1)
  })

// todo move to external file
startSpider = () => {
  const spiderShell = new PythonShell('./src/spider/spider.py')

  spiderShell.on('message', (data) => {
    // console.log(data)

    // remove consecutive whitespace characters
    data = sanitise(data)

    // create json object
    const json_data = JSON.parse(data)
    json_data.timestamp = new Date().toISOString()
    console.log(json_data)
  })

  spiderShell.on('close', () => {
    console.log(`spider finished. Exit code: ${spiderShell.exitCode}`)
  })

  spiderShell.on('error', (error) => {
    console.log(`spider terminated with an error. Exit code: ${spiderShell.exitCode}`)
    console.log(error.stack)
  })

}
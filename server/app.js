const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PythonShell } = require('python-shell')
const port = 9000

// Connection to DB
// mongoose.connect('mongodb://localhost:27020')
//   .then(() => {
//     console.log('Connected to Mongo');
//   })
//   .catch(err => {
//     console.error('Backend error:', err.stack);
//     process.exit(1);
//   });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const test = require('./src/routes/test')

// app.get('/', (req, res) => res.send('hello world'))
app.use('/api/test', test);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
  startSpider()
})

startSpider = () => {
  const spiderShell = new PythonShell('./src/spider/spider.py')

  spiderShell.on('message', (data) => {
    console.log(data)
  })

  spiderShell.on('close', () => {
    console.log(`python script finished. Exit code: ${spiderShell.exitCode}`)
  })

  spiderShell.on('error', () => {
    console.log(`python script terminated with an error. Exit code: ${spiderShell.exitCode}`)
  })

}
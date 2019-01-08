const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 9000

// Connection to DB
mongoose.connect('mongodb://localhost:27020')
  .then(() => {
    console.log('Connected to Mongo');
  })
  .catch(err => {
    console.error('Backend error:', err.stack);
    process.exit(1);
  });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const test = require('./src/routes/testRoute')

// app.get('/', (req, res) => res.send('hello world'))
app.use('/api/test', test);

app.listen(port, () => console.log(`Listening on port ${port}!`))
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000


// Connection to DB
mongoose.connect('mongodb://mongodb')
  .then(() => {
    console.log('Connected to Mongo backend');
  })
  .catch(err => {
    console.error('Backend error:', err.stack);
    process.exit(1);
  });
// .get('/', (req, res) => res.send('hello world'))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}!`))
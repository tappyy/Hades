const express = require('express')
const TestSchema = require('../models/testSchema')
const router = express.Router()

// Get All Items
// define the home page route
router.get('/', function (req, res) {
  TestSchema.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

// Add item
router.post('/', function (req, res) {
  var item = new TestSchema(req.body);
  item.save()
    .then(item => {
      res.json('Added');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;
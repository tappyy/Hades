const express = require('express')
const router = express.Router()

// Get All Items
// define the home page route
router.get('/', function (req, res) {
  //todo controller code to get all
});

// Add item
router.post('/', function (req, res) {
  //todo controller code to add one
  console.log(req.body)
  res.status(200).send(req.body)
});

module.exports = router;
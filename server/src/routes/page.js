const express = require('express')
const router = express.Router()
const scraperUtils = require('../utils/scraperUtils')
const pageController = require('../databaseControllers/pageOperations')

/**
  * Get all pages
**/
router.get('/', function (req, res) {
  //todo controller code to get all
});

// Insert a single scraped page
// /api/spider
router.post('/', function (req, res) {
  const { body } = req
  if (body.body_content) {
    const page = {
      ...body,
      body_content: scraperUtils.sanitise(body.body_content),
      timestamp: new Date()
    }

    pageController.InsertPage(page)
      .then(insertedId => {
        res.status(200).send({ insertedId: insertedId })
      })
      .catch(err => console.error(err))
  }
});

module.exports = router;
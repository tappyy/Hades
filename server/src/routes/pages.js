const express = require('express')
const router = express.Router()
const scraperUtils = require('../utils/scraperUtils')
const pageController = require('../databaseControllers/pageOperations')

// todo document api with JSDocs

/**
  * Get all pages
**/

router.get('/', function (req, res) {
  pageController.getAll()
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => console.error(err))
});

/**
  * Insert a single scraped page
**/
router.post('/', function (req, res) {
  const { body } = req
  if (body.body_content) {
    const page = {
      ...body,
      body_content: scraperUtils.sanitise(body.body_content),
      timestamp: new Date()
    }

    pageController.insertPage(page)
      .then(insertedId => {
        res.status(200).send({ insertedId: insertedId })
      })
      .catch(err => console.error(err))
  }
});

module.exports = router;
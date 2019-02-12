const express = require('express')
const router = express.Router()
const elasticController = require('../elasticControllers/elasticPageOps')

/**
  * Insert a single scraped page
**/
router.post('/addpage', function (req, res) {
  const { body } = req
  if (body.body_content) {
    const page = {
      ...body,
      body_content: body.body_content,
      timestamp: new Date()
    }

    elasticController.insertPage(page)
      .then(result => {
        res.status(200).send(result)
      })
      .catch(error => console.error(error))
  }
})

router.get('/searchpage/:term', function (req, res) {
  const { term } = req.params
  elasticController.searchPage(term)
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

router.get('/pagebyid/:id', function (req, res) {
  const { id } = req.params
  elasticController.getPageById(id)
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

router.get('/allpages', function (req, res) {
  elasticController.getAllPages()
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

module.exports = router
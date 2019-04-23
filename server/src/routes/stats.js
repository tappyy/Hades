const elasticController = require('../elasticControllers/elasticPageOps')
const casesController = require('../mongoControllers/caseOps')
const express = require('express')
const router = express.Router()
const tags = require('../utils/constants').TAGS
const helpers = require('../utils/helpers')

router.get('/tags', async function (req, res) {

  const tagCounts = await Promise.all(Object.keys(tags).map(async tag =>
    elasticController.getTagCounts(tag)
  ))

  res.status(200).send(tagCounts)

})

router.get('/hits/:userId', async function (req, res) {
  const userId = req.params.userId
  const userCases = await casesController.getUserCases(userId)
  const totalHits = userCases.reduce((a, b) => ({ hits: a.hits + b.hits }))
  res.status(200).send(totalHits)
})

router.get('/totalpages', async function (req, res) {

  const total = await elasticController.getTotalPages()
  res.status(200).send({ total: total })

})

router.get('/taggraph', async function (req, res) {

  const initialData = await Promise.all(Object.keys(tags).map(async tag =>
    elasticController.getTagCounts(tag)
  ))


  res.status(200).send({ graphData: initialData })

})

module.exports = router
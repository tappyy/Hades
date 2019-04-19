const elasticController = require('../elasticControllers/elasticPageOps')
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

router.get('/taggraph', async function (req, res) {

  const initialData = await Promise.all(Object.keys(tags).map(async tag =>
    elasticController.getTagCounts(tag)
  ))

  // build data in graph format
  const graphData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }
    ]
  }

  // add data from elastic
  initialData.forEach(item => {
    graphData.labels = [...graphData.labels, item.value]
    graphData.datasets[0].data = [...graphData.datasets[0].data, item.count]
  })

  const totalCount = helpers.arraySum(graphData.datasets[0].data)

  res.status(200).send({ graphData: graphData, total: totalCount })

})





module.exports = router
const express = require('express')
const router = express.Router()
const elasticController = require('../elasticControllers/elasticPageOps')

/**
 * @api {post} /api/elastic/addpage Add new page
 * @apiName AddPage
 * @apiGroup Elastic 
 * @apiDescription Adds a single page to Elasticsearch database
 * @apiParam {Object} page Object containing scraped page data
 * @apiSuccess {Object} result Confirmation of document insert
 * @apiSuccessExample Result object on success:
 {
    "_index": "pages",
    "_type": "page",
    "_id": "ljM442gB3ev0HYxgwhN4",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 2
  }
*/
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

/**
 * @api {get} /api/elastic/searchpage/:term Search page
 * @apiName SearchPage
 * @apiGroup Elastic 
 * @apiDescription Search page body for term
 * @apiParam {String} term Term to search for
 * @apiExample {js} Example usage:
 * http://localhost:9000/api/elastic/searchpage/hello
 * @apiSuccess {Array} result Array containing found results
 * @apiSuccessExample Result object on success:
    [
    {
        "_index": "pages",
        "_type": "page",
        "_id": "o-K94mgBm3yL6Ja3V_YZ",
        "_score": 0.19697241,
        "_source": {
            "website_root": "http://elasticsearch.onion",
            "page_url": "http://elasticsearch.onion/",
            "page_title": "Elasticsearch Test | How to do a search",
            "body_content": "i am some website content that is searchable yaaaaay!",
            "timestamp": "2019-02-12T17:24:45.878Z"
        }
    },
    {
        "_index": "pages",
        "_type": "page",
        "_id": "pOK_4mgBm3yL6Ja3PPYi",
        "_score": 0.1696993,
        "_source": {
            "website_root": "http://elasticsearch2.onion",
            "page_url": "http://elasticsearch2.onion/",
            "page_title": "Elasticsearch Test Again | How to do another search",
            "body_content": "hello again! i am some more website content that is also searchable yippeeeeeee!",
            "timestamp": "2019-02-12T17:26:50.084Z"
        }
    }
  ]
*/
router.get('/searchpage/:term', function (req, res) {
  const { term } = req.params
  elasticController.searchPage(term)
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

/**
 * @api {get} /api/elastic/pagebyid/:id Page by ID
 * @apiName PageByID
 * @apiGroup Elastic 
 * @apiDescription Get a single page by ID
 * @apiParam {String} id ID of page
 * @apiExample {js} Example usage:
 * http://localhost:9000/api/elastic/pagebyid/o-K94mgBm3yL6Ja3V_YZ
 * @apiSuccess {Object} result Object containing page
 * @apiSuccessExample Result object on success:
    {
        "_index": "pages",
        "_type": "page",
        "_id": "o-K94mgBm3yL6Ja3V_YZ",
        "_score": 0.19697241,
        "_source": {
            "website_root": "http://elasticsearch.onion",
            "page_url": "http://elasticsearch.onion/",
            "page_title": "Elasticsearch Test | How to do a search",
            "body_content": "i am some website content that is searchable yaaaaay!",
            "timestamp": "2019-02-12T17:24:45.878Z"
        }
    }
*/
router.get('/pagebyid/:id', function (req, res) {
  const { id } = req.params
  elasticController.getPageById(id)
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

/**
 * @api {get} /api/elastic/allpages Get all pages
 * @apiName GetAllPages
 * @apiGroup Elastic 
 * @apiDescription Get all pages (default limit is 10)
 * @apiExample {js} Example usage:
 * http://localhost:9000/api/elastic/allpages
 * @apiSuccess {Array} result Array containing found results
 * @apiSuccessExample {Array} result Array containing results:
  [
      {
          "_index": "pages",
          "_type": "page",
          "_id": "ljM442gB3ev0HYxgwhN4",
          "_score": 1,
          "_source": {
              "website_root": "http://elasticsearch2.onion",
              "page_url": "http://elasticsearch2.onion/about_us",
              "page_title": "Elasticsearch Test Again | About us",
              "body_content": "hey there! this is an about page",
              "timestamp": "2019-02-12T19:39:34.192Z"
          }
      },
      {
          "_index": "pages",
          "_type": "page",
          "_id": "o-K94mgBm3yL6Ja3V_YZ",
          "_score": 1,
          "_source": {
              "website_root": "http://elasticsearch.onion",
              "page_url": "http://elasticsearch.onion/",
              "page_title": "Elasticsearch Test | How to do a search",
              "body_content": "i am some website content that is searchable yaaaaay!",
              "timestamp": "2019-02-12T17:24:45.878Z"
          }
      },
      {
          "_index": "pages",
          "_type": "page",
          "_id": "pOK_4mgBm3yL6Ja3PPYi",
          "_score": 1,
          "_source": {
              "website_root": "http://elasticsearch2.onion",
              "page_url": "http://elasticsearch2.onion/",
              "page_title": "Elasticsearch Test Again | How to do another search",
              "body_content": "hello again! i am some more website content that is also searchable yippeeeeeee!",
              "timestamp": "2019-02-12T17:26:50.084Z"
          }
      }
  ]
*/
router.get('/allpages', function (req, res) {
  elasticController.getAllPages()
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

module.exports = router
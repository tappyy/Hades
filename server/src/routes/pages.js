const elasticController = require('../elasticControllers/elasticPageOps')
const express = require('express')
const router = express.Router()
const scraperUtils = require('../utils/scraperUtils')

/**
 * @api {post} /api/pages Add new page
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
router.post('/', async function (req, res) {
  const { body } = req

  const tags = await scraperUtils.createTags(body.body_content)
  const page = {
    ...body,
    tags: tags,
    body_content: scraperUtils.sanitise(body.body_content),
    timestamp: new Date()
  }

  elasticController.insertPage(page)
    .then(result => {
      res.status(200).send(result)
    })
    .catch(error => console.error(error))
})

/**
 * @api {get} /api/pages/search/:term Search page
 * @apiName SearchPageBody
 * @apiGroup Elastic 
 * @apiDescription Search page body for term
 * @apiParam {String} term Term to search for
 * @apiExample {js} Example usage:
 * http://localhost:9000/api/elastic/search/hello
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
router.get('/search', function (req, res) {
  const { term, page } = req.query
  elasticController.search(term, page)
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

/**
 * @api {get} /api/pages/tags/:tag Get pages by tag
 * @apiName GetTaggedPages
 * @apiGroup Elastic 
 * @apiDescription Get pages by tag
 * @apiParam {String} tag Tag to search for
 * @apiExample {js} Example usage:
 * http://localhost:9000/api/elastic/tags/adult
 * @apiSuccess {Array} result Array containing found results
 * @apiSuccessExample Result object on success:
    [
    {
        "_index": "pages",
        "_type": "page",
        "_id": "BD8_B2kBAN33-fc7debS",
        "_score": 1,
        "_source": {
            "website_root": "http://itu5h4f7shmamz2x.onion",
            "page_url": "http://itu5h4f7shmamz2x.onion/",
            "page_title": "CP videos and photos Child porn Children pedo kids",
            "body_content": " CP videos and photos Child porn Children pedo kids The child porn, the best videos and photos with girls 3 years, 5 years, 9 years, 11 years. Beautiful boys fuck in the ass and jerk off cock. Download files CP free. The catalog contains and pedo LG Lolita magazine incest video children cerebral palsy, teens and young CP pedophil gallery. Tags: SHOP CP, FREE CP, videos, Dreams, Preteen, Silver, Vladmodels, photos, girls, models, children, Jailbait, Teens, darknet cp, incest, photos, pedomom, pedodad, pedo. ",
            "tags": [
                "adult"
            ],
            "timestamp": "2019-02-19T19:33:13.294Z"
        },
        "sort": [
            1550604793294,
            1
        ]
    }
  ]
*/
router.get('/tags/:tag', function (req, res) {
  const { tag } = req.params
  elasticController.getByTag(tag)
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

/**
 * @api {get} /api/pages/:id Page by ID
 * @apiName PageByID
 * @apiGroup Elastic 
 * @apiDescription Get a single page by ID
 * @apiParam {String} id ID of page
 * @apiExample {js} Example usage:
 * http://localhost:9000/api/pages/o-K94mgBm3yL6Ja3V_YZ
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
router.get('/:id', function (req, res) {
  const { id } = req.params
  elasticController.getPageById(id)
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

/**
 * @api {get} /api/pages Get all pages
 * @apiName GetAllPages
 * @apiGroup Elastic 
 * @apiDescription Get all pages (default limit is 10)
 * @apiExample {js} Example usage:
 * http://localhost:9000/api/pages
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
router.get('/', function (req, res) {
  elasticController.getAllPages()
    .then(result => {
      res.status(200).send(result)
    }).catch(error => console.error(error))
})

module.exports = router
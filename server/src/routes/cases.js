const casesController = require('../mongoControllers/caseOps')
const express = require('express')
const router = express.Router()

/**
 * @api {post} /api/cases Add new case
 * @apiName AddCase
 * @apiGroup Mongo 
 * @apiDescription Adds a case to mongo database
 * @apiParam {Object} Case Object containing new case info
 * @apiSuccess {Object} result Confirmation of case added
 * @apiSuccessExample Result object on success:
 {
   "_id":1
  }
*/
router.post('/', async function (req, res) {
  const { body } = req  // userId, name, description, criteria

  casesController.addCase(body)
    .then(result => res.status(200).send(result))
    .catch(error => {
      console.error(error)
      res.status(500)
    })
})

/**
 * @api {post} /api/cases/:caseId Get case by ID
 * @apiName GetCaseByID
 * @apiGroup Mongo 
 * @apiDescription Gets a case by ID
 * @apiParam {String} Case ID
 * @apiSuccess {Object} result Object containing case details
*/
router.get('/:caseId', async function (req, res) {
  const caseId = req.params.caseId
  casesController.getCase(caseId)
    .then(result => res.status(200).send(result))
    .catch(error => {
      console.error(error)
      res.status(500)
    })
})

/**
 * @api {post} /api/cases/foruser/:userId Get cases for user
 * @apiName GetCasesForUser
 * @apiGroup Mongo 
 * @apiDescription Gets cases for a user
 * @apiParam {String} User ID
 * @apiSuccess {Array} result Array containing all cases for user
*/
router.get('/foruser/:userId', async function (req, res) {
  const userId = req.params.userId
  casesController.getUserCases(userId)
    .then(result => res.status(200).send(result))
    .catch(error => {
      console.error(error)
      res.status(500)
    })
})


module.exports = router
const usersController = require('../mongoControllers/userOps')
const express = require('express')
const router = express.Router()

/**
 * @api {post} /api/users Add new user
 * @apiName AddUser
 * @apiGroup Mongo 
 * @apiDescription Adds a user to mongo database
 * @apiParam {Object} User Object containing new user info
 * @apiSuccess {Object} result Confirmation of user added
 * @apiSuccessExample Result object on success:
 {
   "_id":1
  }
*/
router.post('/', async function (req, res) {
  const { body } = req // first_name, last_name, email, password

  usersController.addUser(body).then(result => res.status(200).send(result))
    .catch(error => {
      console.error(error)
      res.status(500)
    })
})

router.post('/login', async function (req, res) {
  const { body } = req // email, password
  usersController.authenticateUser(body)
    .then(result => res.status(200).json(result))
    .catch(error => {
      console.error(error)
      res.status(500)
    })
})



module.exports = router
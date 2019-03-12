const usersController = require('../mongoControllers/userOps')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

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
  const { body } = req
  const { first_name, last_name, email, password } = body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword
  }

  usersController.addUser(user)
    .then(result => {
      res.status(200).send(result)
    })
    .catch(error => console.error(error))
})



module.exports = router
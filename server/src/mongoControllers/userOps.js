const mongoDb = require('../utils/mongoDb')
const bcrypt = require('bcrypt')
const constants = require('../utils/constants')
const jwt = require("jsonwebtoken");

// add a new user
module.exports.addUser = ({ first_name, last_name, email, password }) => {
  return new Promise((resolve, reject) => {

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword
    }

    const collection = mongoDb.get().collection('users')
    collection.insertOne(user)
      .then((result) => {
        resolve(result.insertedId)
      })
      .catch(err => reject(err))
  })
}

// authenticate a user
module.exports.authenticateUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {

    const errors = {}
    const usersCollection = mongoDb.get().collection('users')

    usersCollection.findOne({ email: email }, (err, result) => {
      if (err) { console.error(err); throw err; }

      if (!result) {
        errors.message = 'Email or password is incorrect'
        reject({ errors })
      }

      bcrypt.compare(password, result.password).then(isMatch => {
        if (!isMatch) {
          errors.message = 'Email or password is incorrect'
          reject({ errors })
        }

        const { _id, first_name, last_name, email } = result

        const payload = {
          id: _id,
          firstName: first_name,
          lastName: last_name,
          email: email
        }

        const token = jwt.sign(payload, constants.BCRYPT_SECRET, { expiresIn: 3600 })

        resolve({ success: true, token: "Bearer " + token })

      })
    })
  })
}
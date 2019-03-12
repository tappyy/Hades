const mongo = require('mongodb')
const mongoDb = require('../utils/mongoDb')

// insert a user
module.exports.addUser = user => {
  return new Promise((resolve, reject) => {
    const collection = mongoDb.get().collection('users')
    collection.insertOne(user)
      .then((result) => {
        resolve(result.insertedId)
      })
      .catch(err => reject(err))
  })
}
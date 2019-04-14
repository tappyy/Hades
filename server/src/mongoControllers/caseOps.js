const mongo = require('mongodb')
const mongoDb = require('../utils/mongoDb')
const assert = require("assert");
const constants = require('../utils/constants')

// add a new case
module.exports.addCase = ({ userId, name, description, criteria }) => {
  return new Promise((resolve, reject) => {

    const newCase = {
      user_id: mongo.ObjectId(userId),
      name: name,
      description: description,
      criteria: criteria,
      date_created: new Date(),
      hits: 0,
      hit_ids: [],
      last_hit: null,
      active: true,
    }

    const collection = mongoDb.get().collection('cases')
    collection.insertOne(newCase)
      .then((result) => {
        resolve(result.insertedId)
      })
      .catch(err => reject(err))
  })
}

module.exports.getCases = (userId) => {
  return new Promise((resolve, reject) => {
    const collection = mongoDb.get().collection('cases')
    collection.find({ user_id: mongo.ObjectId(userId) }).toArray((err, result) => {
      if (err) { reject(err) }
      resolve(result)
    })
  })
}
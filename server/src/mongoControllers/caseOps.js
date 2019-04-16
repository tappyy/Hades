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

module.exports.processCases = async (pageObject, elasticDetails) => {
  const collection = mongoDb.get().collection('cases')

  // get all active cases
  const allCases = await collection.find({ active: true }).toArray()

  // build matching cases array
  const matchingCases = await Promise.all(allCases.filter(caseObj => {

    const { criteria } = caseObj

    return criteria.some(crit => {
      if (crit.rule === 'keyword') {
        return pageObject.body_content.toLowerCase().includes(crit.term.toLowerCase())
      } else {
        return pageObject.tags.some(tag => crit.tags.includes(tag))
      }
    })
  }));

  // update matched cases and send notifications
  matchingCases.map(matched => {
    collection.findOneAndUpdate(
      { _id: mongo.ObjectId(matched._id) },
      {
        $inc: { 'hits': 1 },
        $push: { 'hit_ids': elasticDetails._id },
        $set: { 'last_hit': new Date() }
      }
    )

    // send notifications to owners of matched cases


  })
}
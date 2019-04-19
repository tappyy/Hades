const mongo = require('mongodb')
const mongoDb = require('../utils/mongoDb')
const assert = require("assert");
const constants = require('../utils/constants')
const elasticController = require('../elasticControllers/elasticPageOps')

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

module.exports.getUserCases = (userId) => {
  return new Promise((resolve, reject) => {
    const collection = mongoDb.get().collection('cases')
    collection.find({ user_id: mongo.ObjectId(userId) }).sort({ date_created: -1 }).toArray((err, result) => {
      if (err) { reject(err) }
      resolve(result)
    })
  })
}

module.exports.getCase = async (caseId) => {
  return new Promise(async (resolve, reject) => {
    const collection = mongoDb.get().collection('cases')
    // get case
    const foundCase = await collection.findOne({ _id: mongo.ObjectId(caseId) })

    if (!foundCase) {
      console.error(`Case with ID: ${caseId} not found`)
      reject('Case not found')
    }
    // set empty array for hits
    foundCase.hitsInfo = []

    const { hit_ids } = foundCase

    // get case hits info
    if (hit_ids.length > 0) {
      const hitsResults = await Promise.all(hit_ids.map(id => {
        return elasticController.getPageById(id)
      }))

      const hitsInfo = hitsResults.map(hit => {
        const { body_content } = hit._source
        const words = body_content.toLowerCase().split(' ')
        const snippet = words.slice(0, 50).join(' ')
        return { ...hit._source, id: hit._id, snippet: snippet }
      })

      foundCase.hitsInfo = hitsInfo
    }

    resolve(foundCase)


  })
}

module.exports.processCases = async (pageObject, elasticDetails, io) => {
  const casesCollection = mongoDb.get().collection('cases')
  const usersCollection = mongoDb.get().collection('users')

  // get all active cases
  const allCases = await casesCollection.find({ active: true }).toArray()

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
  const CasesAndUsers = await Promise.all(matchingCases.map(async matchedCase => {
    casesCollection.findOneAndUpdate(
      { _id: mongo.ObjectId(matchedCase._id) },
      {
        $inc: { 'hits': 1 },
        $push: { 'hit_ids': elasticDetails._id },
        $set: { 'last_hit': new Date() }
      }
    )

    // get owner of case
    return new Promise(async (resolve, reject) => {
      const user = await usersCollection.find({ "_id": new mongo.ObjectID(matchedCase.user_id) }).toArray()

      if (!user) {
        reject('User not found')
      }

      resolve({ user: user[0], matchedCase: matchedCase })
    })
  }))

  CasesAndUsers.filter(item => item.user.logged_in).map(item => {
    const { user, matchedCase } = item
    const { sockets } = user

    sockets.forEach(socket => {
      io.to(`${socket}`).emit('alertTrigger', matchedCase)
    })
  })
}
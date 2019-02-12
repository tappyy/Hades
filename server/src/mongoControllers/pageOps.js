const mongo = require('mongodb')
const mongoDb = require('../utils/mongoDb')

// get all pages
module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const collection = mongoDb.get().collection('pages')
    collection.find().sort({ timestamp: -1 }).toArray((err, result) => {
      if (err) { reject(err) }
      resolve(result)
    })
  })
}

// get page by id
module.exports.getById = id => {
  return new Promise((resolve, reject) => {
    const collection = mongoDb.get().collection('pages')
    const mongoId = mongo.ObjectId(id)
    collection.findOne({ _id: mongoId })
      .then((result) => {
        resolve(result)
      })
      .catch(err => reject(err))
  }
  )
}

// insert a single page
module.exports.insertPage = page => {
  return new Promise((resolve, reject) => {
    const collection = mongoDb.get().collection('pages')
    collection.insertOne(page)
      .then((result) => {
        resolve(result.insertedId)
      })
      .catch(err => reject(err))
  })
}
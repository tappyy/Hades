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
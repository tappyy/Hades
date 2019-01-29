const mongoDb = require('../utils/mongoDb')



// insert a single page
module.exports.InsertPage = page => {
  return new Promise((resolve, reject) => {
    const collection = mongoDb.get().collection('pages')
    collection.insertOne(page)
      .then((result) => {
        resolve(result.insertedId)
      })
      .catch(err => reject(err))
  })
}
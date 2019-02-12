const elastic = require('../utils/elasticsearch')
const { ELASTIC_CONFIG } = require('../utils/constants')

module.exports.insertPage = page => {
  return new Promise((resolve, reject) => {
    elastic.index({
      index: ELASTIC_CONFIG.pagesIndex,
      type: ELASTIC_CONFIG.pagesType,
      body: page
    }).then(result => {
      resolve(result)
    }).catch(error => reject(error))
  })
}

module.exports.searchPage = term => {
  return new Promise((resolve, reject) => {
    elastic.search({
      index: ELASTIC_CONFIG.pagesIndex,
      body: {
        query: {
          match: {
            body_content: term
          }
        }
      }
    }).then(result => {
      resolve(result.hits.hits)
    }).catch(error => reject(error))
  })
}

module.exports.getPageById = id => {
  return new Promise((resolve, reject) => {
    elastic.get({
      index: ELASTIC_CONFIG.pagesIndex,
      type: ELASTIC_CONFIG.pagesType,
      id: id
    }).then(result => {
      resolve(result)
    }).catch(error => reject(error))
  })
}

module.exports.getAllPages = () => {
  return new Promise((resolve, reject) => {
    elastic.search({
      index: ELASTIC_CONFIG.pagesIndex,
      body: {
        query: {
          match_all: {}
        }
      }
    }).then(result => {
      resolve(result.hits.hits)
    }).catch(error => reject(error))
  })
}

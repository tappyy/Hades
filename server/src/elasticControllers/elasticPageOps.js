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

module.exports.search = term => {
  return new Promise((resolve, reject) => {
    elastic.search({
      index: ELASTIC_CONFIG.pagesIndex,
      body: {
        "sort": [
          "_score",
          { "timestamp": { "order": "desc" } }
        ],
        "query": {
          "multi_match": {
            "query": term,
            "type": "cross_fields",
            // "fields": ["page_title", "body_content^2"]
            "fields": ["body_content"]
          }
        }
      }
    }).then(result => {
      const processedHits = result.hits.hits.map(hit => {
        const { body_content } = hit._source
        const words = body_content.toLowerCase().split(' ')
        const termIndex = words.indexOf(term.toLowerCase())
        if (termIndex) {
          const snippetLength = 25
          const min = termIndex - snippetLength >= 0 ? termIndex - snippetLength : 0
          const max = termIndex + snippetLength <= words.length ? termIndex + snippetLength : words.length
          const snippet = words.slice(min, max).join(' ')
          return { ...hit, _source: { ...hit._source, snippet: snippet } }
        }
      })
      const processedResult = { ...result, hits: { ...result.hits, hits: processedHits } }
      resolve(processedResult)
    }).catch(error => reject(error))
  })
}

module.exports.getByTag = tag => {
  return new Promise((resolve, reject) => {
    elastic.search({
      index: ELASTIC_CONFIG.pagesIndex,
      body: {
        "sort": [
          "_score",
          { "timestamp": { "order": "desc" } }
        ],
        "query": {
          "match": {
            "tags": tag
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
        "sort": [
          { "timestamp": { "order": "desc" } }
        ],
        query: {
          match_all: {}
        }
      }
    }).then(result => {
      resolve(result.hits.hits)
    }).catch(error => reject(error))
  })
}

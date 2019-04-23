const { KEYWORDS, TAGS } = require('./constants')

const sanitise = (data) => {
  return data.replace(/(\s+)/g, ' ').replace(/(\\n)+/g, "\\n").replace(/(\\t)+/g, ' ')
}

const createTags = (bodyContent) => {
  return new Promise((resolve, reject) => {
    try {
      const tags = []
      if (KEYWORDS.adult.some(keyword => bodyContent.toLowerCase().includes(keyword.toLowerCase()))) {
        tags.push(TAGS.adult)
      }
      if (KEYWORDS.crypto.some(keyword => bodyContent.toLowerCase().includes(keyword.toLowerCase()))) {
        tags.push(TAGS.crypto)
      }
      if (KEYWORDS.hacking.some(keyword => bodyContent.toLowerCase().includes(keyword.toLowerCase()))) {
        tags.push(TAGS.hacking)
      }
      if (KEYWORDS.drugs.some(keyword => bodyContent.toLowerCase().includes(keyword.toLowerCase()))) {
        tags.push(TAGS.drugs)
      }
      if (KEYWORDS.weapons.some(keyword => bodyContent.toLowerCase().includes(keyword.toLowerCase()))) {
        tags.push(TAGS.weapons)
      }

      resolve(tags)
    }
    catch (err) {
      reject(err)
    }
  })

}


exports.sanitise = sanitise
exports.createTags = createTags
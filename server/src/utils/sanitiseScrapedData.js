module.exports.sanitise = (data) => {
  return data.replace(/(\s+)/g, ' ').replace(/(\\n)+/g, "\\n").replace(/(\\t)+/g, ' ')
}
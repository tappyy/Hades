const { ELASTIC_CONNECTION_STRING } = require('./constants')
const elasticsearch = require('elasticsearch')

var client = new elasticsearch.Client({
  host: ELASTIC_CONNECTION_STRING,
  log: 'trace'
});

module.exports = client;  
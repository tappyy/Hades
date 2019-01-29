const { MONGO_CONNECTION_STRING } = require('./constants')
const MongoClient = require('mongodb').MongoClient;
let connection = null;

module.exports.connect = () => new Promise((resolve, reject) => {
  MongoClient.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true }, function (err, client) {
    if (err) { reject(err); return; };
    resolve(client.db('hades'));
    connection = client.db('hades');
  });
});

module.exports.get = () => {
  if (!connection) {
    throw new Error('Call connect first!');
  }

  return connection;
}
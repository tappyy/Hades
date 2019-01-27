const { MONGO_CONNECTION_STRING } = require('./constants')
const MongoClient = require('mongodb').MongoClient;
let connection = null;

module.exports.connect = () => new Promise((resolve, reject) => {
  MongoClient.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true }, function (err, db) {
    if (err) { reject(err); return; };
    resolve(db);
    connection = db;
  });
});

module.exports.get = () => {
  if (!connection) {
    throw new Error('Call connect first!');
  }

  return connection;
}
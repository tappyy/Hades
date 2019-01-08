var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var TestSchema = new Schema({
  desc: {
    type: String
  },

}, {
    collection: 'Tasks'
  });

module.exports = mongoose.model('TestSchema', TestSchema);
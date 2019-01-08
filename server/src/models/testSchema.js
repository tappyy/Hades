var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var TestSchema = new Schema({
  content: {
    type: String
  },

}, {
    collection: 'Tasks'
  });

module.exports = mongoose.model('TestSchema', TestSchema);
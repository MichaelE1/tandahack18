const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const voteSchema = new mongoose.Schema({
  name: {
    type: String
  },
  tally: {
    type: Number
  }
});

module.exports = mongoose.model('Vote', voteSchema);
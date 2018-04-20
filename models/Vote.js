const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const voteSchema = new mongoose.Schema({
  // TO DO
});

module.exports = mongoose.model('Vote', voteSchema);
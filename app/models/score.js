var mongoose = require('mongoose');
var scoreSchema = new mongoose.Schema({
  game: String,
  score: Number,
  level: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Score', scoreSchema);

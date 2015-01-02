var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
  game: String,
  score: Number,
  user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  createdAt: {type: Date, default: Date.now}
})

mongoose.model('Score', ScoreSchema);
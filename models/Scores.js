var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
  game: String,
  score: Number,
  time: Number,
  user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

mongoose.model('Score', ScoreSchema);
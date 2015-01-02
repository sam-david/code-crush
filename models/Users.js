var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  scores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Score'}],
  createdAt: {type: Date, default: Date.now}
})

mongoose.model('User', UserSchema);
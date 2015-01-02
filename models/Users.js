var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  scores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Score'}]
})

mongoose.model('User', UserSchema);
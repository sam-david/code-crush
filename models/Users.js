var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  scores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Score'}],
  createdAt: {type: Date, default: Date.now}
})

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('User', UserSchema);



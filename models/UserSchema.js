//create mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// //Create a Schema for articles
var UserSchema = new Schema({
  name: {
    type:String,
    required:true,
    unique: true},
  email: {
    type:String,
    required:true,
    unique: true},
  password: {
    type:String,
    required:true},
  salt: { type: String }
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
   next();
});

UserSchema.method('validPassword',function(password,callback){
  if(this.password === this.hashPassword(password)){
    return true;
  }else{
    return false;
  }
});
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');

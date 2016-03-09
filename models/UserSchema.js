//create mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    required:true}
});

UserSchema.method('validPassword',function(password,callback){
  if(password === this.password){
    return true;
  }else{
    return false;
  }
});

/*UserSchema.method('findByUsername',function(name, callback){

});*/

var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');

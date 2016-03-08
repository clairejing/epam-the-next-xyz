var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String
});
mongoose.model('Category', CategorySchema);
var Category = mongoose.model('Category');

module.exports = mongoose.model('Category');
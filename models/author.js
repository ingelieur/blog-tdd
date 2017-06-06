const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var authorSchema = new Schema ({
  name: String,
  username: String,
  password: String,
  email: String
});

let author = mongoose.model('author', authorSchema);

module.exports = author;

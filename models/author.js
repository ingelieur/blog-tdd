const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var authorSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});

let author = mongoose.model('author', authorSchema);

module.exports = author;

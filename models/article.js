const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema ({
  title: String,
  content: String,
  author: String
});

let article = mongoose.model('article', articleSchema);

module.exports = article;

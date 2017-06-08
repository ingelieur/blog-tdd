const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();

app.use(cors())

const db_config = {
  development: 'mongodb://localhost/blogs',
  test: 'mongodb://localhost/blogs-test'
};

const curr_env = app.settings.env;
mongoose.connect(db_config[curr_env]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const index = require('./routes/index');
const articles = require('./routes/articles');
const authors = require('./routes/authors');

app.use('/', index);
app.use('/api/articles', articles);
app.use('/api/authors', authors);

app.listen(3000);

module.exports = app;

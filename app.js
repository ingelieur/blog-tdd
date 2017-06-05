const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const db_config = {
  development: 'mongodb://localhost/blogs',
  test: 'mongodb://localhost/blogs-test'
};

const curr_env = app.settings.env;
mongoose.connect(db_config[curr_env]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const articles = require('./routes/articles');

app.use('/api/articles', articles);

app.listen(3000);

module.exports = app;

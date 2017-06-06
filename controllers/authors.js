const Author = require('../models/author');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var create = ((req,res) => {
  bcrypt.hash(req.body.password, saltRounds, (err,hash) => {
    let newAuthor = new Author ({
      name: req.body.name,
      username : req.body.username,
      password: hash,
      email: req.body.email
    });
    newAuthor.save((err,createdAuthor) => {
      res.send(err ? err : createdAuthor);
    });
  });
});

var showAll = ((req,res) => {
  Author.find((err, authors) => {
    res.send(err ? err : authors);
  });
});

var destroy = ((req,res) => {
  Author.findByIdAndRemove(req.params.id, (err,article) => {
    res.send(err ? err : article);
  });
});

var update = ((req,res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, (err,article) => {
    res.send(err ? err : article);
  });
});

var signin = ((req,res) => {
  console.log('dalam signin');
  Author.findOne({username: req.body.username}, (err,author) => {
    if (err) res.send(err);
    else {
      bcrypt.compare(req.body.password, author.password)
        .then ((result) => {
          if (result) {
            var token = jwt.sign({username: author.username, name: author.name}, `HACKTIVHELL`);
            res.send({token:token});
          }
          else {
            res.send({message: 'username/password is wrong'});
          }
        });
    }
  });
});

module.exports = {
  create,
  showAll,
  destroy,
  update,
  signin
};

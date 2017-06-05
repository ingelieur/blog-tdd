const Articles = require('../models/article');

var create = ((req,res) => {
  let newArticles = new Articles ({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  newArticles.save((err,createdArticles) => {
    res.send(err ? err : createdArticles);
  });
});

var showAll = ((req,res) => {
  Articles.find((err, articles) => {
    res.send(err ? err : articles);
  });
});

var destroy = ((req,res) => {
  Articles.findByIdAndRemove(req.params.id, (err,article) => {
    res.send(err ? err : article);
  });
});

module.exports = {
  create,
  showAll,
  destroy
};

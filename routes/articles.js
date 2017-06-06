const router = require('express').Router();
const Article = require('../controllers/articles');

router.post('/', Article.create);
router.get('/', Article.showAll);
router.delete('/:id', Article.destroy);
router.put('/:id', Article.update);

module.exports = router;

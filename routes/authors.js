const router = require('express').Router();
const Author = require('../controllers/authors');

router.post('/', Author.create);
router.get('/', Author.showAll);
router.delete('/:id', Author.destroy);
router.put('/:id', Author.update);

module.exports = router;

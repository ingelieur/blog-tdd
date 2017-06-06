const router = require('express').Router();
const Author = require('../controllers/authors');

router.post('/signin', Author.signin);
router.post('/signup', Author.create);

module.exports = router;

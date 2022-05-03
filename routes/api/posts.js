const express = require('express')
const router = express.Router();
const postController = require('../../controllers/post.controller');
const auth = require('../../middlewares/auth');
const validator = require('../../middlewares/valitator');
const rules = require('../../validations/post.validation');
router.get('/', ()=>{})
    .get('/:id',()=>{})
    .post('/',auth,validator(rules.newPost),postController.addNewPost)
    .put('/:id',()=>{})
    .delete('/:id',()=>{});

module.exports = router;
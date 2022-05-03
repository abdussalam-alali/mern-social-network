const express = require('express')
const router = express.Router();
const postController = require('../../controllers/post.controller');
const auth = require('../../middlewares/auth');
const validator = require('../../middlewares/valitator');
const rules = require('../../validations/post.validation');

router.get('/',auth, postController.listPosts)
    .get('/:id',auth,postController.showPost)
    .post('/',auth,validator(rules.newPost),postController.addNewPost)
    .put('/:id',()=>{})
    .delete('/:id',auth, postController.destroyPost);

module.exports = router;
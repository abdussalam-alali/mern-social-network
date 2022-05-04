const { check } = require('express-validator');

const newPost = [
    check('text','text field is required').not().isEmpty(),
];
const newComment = [
    check('text','text field is required').not().isEmpty(),
]
module.exports = {
    newPost,
    newComment
}
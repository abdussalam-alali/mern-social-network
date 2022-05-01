const { check } = require('express-validator');
const rulesNewUser = [
    check('name','name is required').not().isEmpty(),
    check('email','Please include an email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters.').isLength(6)
];

const rulesLogin = [
    check('name','name is required').not().isEmpty(),
    check('email','Please include an email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters.').isLength(6)
];

module.exports = {
    rulesLogin,
    rulesNewUser
}

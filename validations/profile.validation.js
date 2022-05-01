const { check } = require('express-validator');
const rulesCreate = [
    check('status','status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty(),
];

module.exports =  {
    rulesCreate,
}
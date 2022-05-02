const { check } = require('express-validator');
const rulesCreate = [
    check('status','status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty(),
];

const rulesUpdateExperience = [
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','Company is required').not().isEmpty()
]
module.exports =  {
    rulesCreate,
    rulesUpdateExperience
}
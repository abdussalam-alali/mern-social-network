const express = require('express')
const router = express.Router();
const { rulesNewUser} = require('../../validations/user.validation');
const userController = require('../../controllers/users.controller');
const validator = require('../../middlewares/valitator');

router.post('/',validator(rulesNewUser) , userController.register);

module.exports = router ;
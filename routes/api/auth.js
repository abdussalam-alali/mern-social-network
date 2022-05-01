const express = require('express')
const router = express.Router();
const auth = require('../../middlewares/auth');
const authController = require('../../controllers/auth.controller');

router.get('/',auth,authController.getUser)
    .post('/login',authController.authenticate);
module.exports = router;
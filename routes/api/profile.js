const express = require('express')
const router = express.Router();
const auth = require('../../middlewares/auth');
const profileController = require('../../controllers/profile.controller');
const { rulesCreate } = require('../../validations/profile.validation');
const validator = require('../../middlewares/valitator');

router.get('/',profileController.getAllProfiles)
    .get('/user/:id',profileController.getProfileById)
    .get('/me',auth, profileController.getMyProfile)
    .post('/', [auth, validator(rulesCreate) ] ,profileController.createProfile);
module.exports = router;
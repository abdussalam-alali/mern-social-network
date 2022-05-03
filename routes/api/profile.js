const express = require('express')
const router = express.Router();
const auth = require('../../middlewares/auth');
const profileController = require('../../controllers/profile.controller');
const { rulesCreate, rulesUpdateExperience } = require('../../validations/profile.validation');
const validator = require('../../middlewares/valitator');

router.get('/',profileController.getAllProfiles)
    .get('/user/:id',profileController.getProfileById)
    .get('/me',auth, profileController.getMyProfile)
    .post('/', auth,validator(rulesCreate) ,profileController.createProfile)
    .put('/experience',auth, validator(rulesUpdateExperience), profileController.updateProfileExperience)
    .delete('/',auth, profileController.deleteProfile)
    .delete('/experience/:id',auth,profileController.deleteExperience);
module.exports = router;
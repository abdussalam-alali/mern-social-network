const express = require('express')
const router = express.Router();
const auth = require('../../middlewares/auth');
const profileController = require('../../controllers/profile.controller');
const { rulesCreate, rulesUpdateExperience,rulesUpdateEducation } = require('../../validations/profile.validation');
const validator = require('../../middlewares/valitator');
// profiles routes
router.get('/',profileController.getAllProfiles)
    .get('/user/:id',profileController.getProfileById)
    .get('/me',auth, profileController.getMyProfile)
    .post('/', auth,validator(rulesCreate) ,profileController.createProfile)
    .delete('/',auth, profileController.deleteProfile);
// experience routes
router.put('/experience',auth, validator(rulesUpdateExperience), profileController.updateProfileExperience)
    .delete('/experience/:id',auth,profileController.deleteExperience);
// education routes
router.put('/education',auth,validator(rulesUpdateEducation),profileController.addEducation)
    .delete('/education/:id',auth,profileController.deleteEducation);

module.exports = router;
const profileservice = require('../services/profile.service');
const pick = require('../utils/pick');

const getMyProfile = async (req,res) =>{
    try{
        const profile = await profileservice.getUserProfile(req.user.id);
        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }catch (err) {
        console.error(err)
        res.status(500).send("internal server error")
    }
}

const createProfile = async (req,res)=>{
    try{
        const data = {...req.body, user: req.user.id};
        const result = await profileservice.storeProfile(data);
        res.json(result);

    }catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}

const getAllProfiles = async (req,res)=>{
    try {
        const result = await profileservice.allProfiles();
        res.json(result);
    }catch (err) {
        console.error(err.message);
        res.status(500).json( {msg: "Internal Server Error" } );
    }
}

const getProfileById = async (req,res)=>{
    try{
        const result = await profileservice.getProfileByUserId(req.params.id);
        if(!result) {
            return res.status(400).json({msg: "Profile not found"});
        }
        res.json(result);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId')
            return res.status(400).json({msg: "Profile not found"});
        res.status(500).send("Internal Server Error");

    }
}

const deleteProfile = async (req,res)=>{
    try{
        const result = await profileservice.deleteProfileAndUser(req.user.id);
        if(result) {
            return res.json({msg: "Profile deleted successfully!"});
        }
        return res.json({msg: "User does not exist"});
    }catch(err) {
        console.error(err.message);
        res.status(500).json({msg: "500 - Internal Server Error", error: err.message});
    }
}
const updateProfileExperience = async (req,res)=>{
    const data = pick(req.body,['title','company','from','to','current','description']);
    try{
        const result = await profileservice.addExperience(data,req.user.id);
        if(!result) {
            return res.status(404).json({msg: "Profile not found"});
        }
        return res.json(result);
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: "Internal Server Error", error: err.message});
    }
    res.json(data);
}

module.exports = {
    getMyProfile,
    deleteProfile,
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfileExperience
}
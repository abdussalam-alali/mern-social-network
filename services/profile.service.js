const Profile = require('../models/Profile.model');

const getUserProfile =  (userId) => {
    return Profile.findOne({ user: userId }).populate('user',['name','avatar']);
}
const storeProfile = async (data)=>{
    data.skills = data.skills.split(',').map(skill => skill.trim());
    let profile = await Profile.findOne({user: data.user});
    if(profile) {
        profile = await Profile.findOneAndUpdate({user: data.user}, {$set: data}, {new: true});
        return profile
    }

    profile = await Profile.create(data);
    return profile;
}

const allProfiles =  ()=>{
    return Profile.find().populate('user',['name','avatar']);
}

const getProfileByUserId = (userId) =>{
    return Profile.findOne({user: userId}).populate('user',['name','avatar']);

}
module.exports = {
    getUserProfile,
    storeProfile,
    allProfiles,
    getProfileByUserId
}
const Profile = require('../models/Profile.model');
const User = require('../models/User.model');

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
// delete the profile, user, and user's posts.
const deleteProfileAndUser =async (userId)=> {
    const res = await Profile.findOneAndDelete({user: userId});
    await User.findOneAndDelete({_id: userId});

    return true;
}
module.exports = {
    getUserProfile,
    storeProfile,
    deleteProfileAndUser,
    allProfiles,
    getProfileByUserId
}
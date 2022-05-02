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
    await Profile.findOneAndDelete({user: userId});
    const res = await User.findOneAndDelete({_id: userId});

    return res;
}

const addExperience = async (data,userId)=>{
    const profile = await Profile.findOne({user: userId});
    if(!profile)
        return false;
    profile.experience.unshift(data);
    await profile.save();
    console.log(profile);
    return profile;

}
module.exports = {
    getUserProfile,
    addExperience,
    storeProfile,
    deleteProfileAndUser,
    allProfiles,
    getProfileByUserId
}
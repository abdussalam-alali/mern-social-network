const Profile = require('../models/Profile.model');
const User = require('../models/User.model');
const {errorMsg} = require("../utils/responses");
const request = require('request');
const config = require('config');


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
const deleteExperienceById = async (userId, experienceId) =>{
    const profile =await Profile.findOne({user: userId});
    const removedIndex = profile.experience.map(item => item.id).indexOf(experienceId);
    if(removedIndex===-1)
        return errorMsg("No such experience found",404);
    profile.experience.splice(removedIndex,1);
    return (await profile.save());
}

const saveEducation = async (data,userId) => {
    const profile = await Profile.findOne({user: userId});
    if(!profile)
        return errorMsg("Profile not found",404);
    profile.education.unshift(data);
    return (await profile.save());
}

const removeEducationItem = async (itemId, userId) =>{
    const profile = await Profile.findOne({user:userId});
    if(!profile)
        return errorMsg("profile not found",404);
    const indexOfItemToRemove = profile.education.map(item => item.id).indexOf(itemId);
    if(indexOfItemToRemove===-1)
        return errorMsg("Item not found",404);

    profile.education.splice(indexOfItemToRemove,1);
    return (await profile.save());
}
const fetchRepositories =  (username)=>{
    const options = {
        uri: `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}`,
        method: 'GET',
        headers: {
            'user-agent': 'node.jss',
        }
    }
    return new Promise((resolve,reject)=>{
        request(options, (err,response,body)=>{
            if(err)
                reject(err);
            if(response.statusCode!==200)
                resolve(errorMsg("User not found",404));

            if(response.statusCode==200)
                resolve(JSON.parse(body));
        });
    });


}
module.exports = {
    getUserProfile,
    addExperience,
    fetchRepositories,
    saveEducation,
    storeProfile,
    deleteProfileAndUser,
    allProfiles,
    getProfileByUserId,
    deleteExperienceById,
    removeEducationItem
}
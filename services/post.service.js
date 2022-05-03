const Post = require('../models/Post.model');
const User = require('../models/User.model');
const { errorMsg } = require("../utils/responses");

const savePost = async (data,userId)=>{
    const user = await User.findOne({user: userId}).select('-password');
    const postData = {...data, name: user.name, avatar: user.avatar, user: userId};
    console.log(postData);
    const post = new Post(postData);
    return post.save();
}

module.exports = {
    savePost
}
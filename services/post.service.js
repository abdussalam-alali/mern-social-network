const Post = require('../models/Post.model');
const User = require('../models/User.model');
const { errorMsg } = require("../utils/responses");

const savePost = async (data,userId)=>{
    const user = await User.findOne({user: userId}).select('-password');
    const postData = {...data, name: user.name,
        avatar: user.avatar,
        user: userId};
    console.log(postData);
    const post = new Post(postData);
    return post.save();
}
const getAllPosts = ()=>{
    return Post.find().sort({ data: -1}).populate('user',['name','avatar']);
}
const getPostById = (postId)=>{
    return Post.findById(postId).populate('user',['name','avatar']);
}
const deletePostById = async (postId, userId) => {
    const post = await Post.findById(postId);
    if(!post)
        return errorMsg("Post not found",404);
    if(post.user.toString() !== userId)
        return errorMsg("Forbidden",403);

    return Post.findOneAndDelete({'_id': postId});
}

module.exports = {
    savePost,
    getAllPosts,
    getPostById,
    deletePostById
}
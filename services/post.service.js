const Post = require('../models/Post.model');
const User = require('../models/User.model');
const { errorMsg } = require("../utils/responses");
const ObjectId = require('mongodb').ObjectId;

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


const likePost = async (postId,userId) => {
    const post = await Post.findOne({_id: postId});
    if(!post)
    {
        return {
            status: 404,
            msg: "Post not found"
        }
    }

    const ch = post.likes.map(item =>  item.user?.toString()).indexOf(userId);

    if(ch!== -1)
    {
        post.likes.splice(ch,1);
        await post.save();

        return {
            msg: "Unliked",
            status: 200
        }
    } else {
        post.likes.unshift({user: userId});
        await post.save();
        return {
            msg: "Liked",
            status: 200
        }
    }
}

const addComment = async (text,  userId, postId)=>{
    const post = await Post.findById(postId);
    if(!post)
        return null;
    const comment = {
        text,
        user: userId
    }

    post.comments.unshift(comment);

    return (await post.save());
}

const deleteComment = async(postId, commentId, userId)=>{
    console.log(postId,commentId,userId);
    const post = await Post.findOne({_id: postId, "comments.user": userId,"comments._id": commentId});
    if(post===null)
        return { status: 404, msg: "Nothing deleted"};

    return (await Post.updateOne({_id: postId},{$pull: {comments: { _id: commentId, user: userId}}}));
}
module.exports = {
    savePost,
    getAllPosts,
    getPostById,
    deletePostById,
    likePost,
    addComment,
    deleteComment
}
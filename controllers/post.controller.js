const postService = require('../services/post.service');
const pick = require('../utils/pick');
const {errorMsg} = require("../utils/responses");

const addNewPost = async (req,res)=>{
    try{
        const data = pick(req.body,['text']);
        const result = await postService.savePost(data,req.user.id);
        res.json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({error: err.message});
    }
}
const listPosts = async (req,res)=>{
    try{
        const result = await postService.getAllPosts();
        res.json(result);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error:err.message});
    }
}

const showPost = async (req,res) => {
    try{
        const result = await postService.getPostById(req.params.id);
        if(!result)
            return res.status(404).json(errorMsg('Post not found'));
        res.json(result);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId')
            return res.status(404).json(errorMsg("Post not found",404));
        res.status(500).json({error:err.message});
    }
}

const destroyPost = async (req,res) => {
    try{
        const result = await postService.deletePostById(req.params.id,req.user.id);
        if(!result)
            return res.status(404).json(errorMsg("Post not found",404));
        res.json(result);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId')
            return res.status(404).json(errorMsg("Post not found",404));
        res.status(500).json({error:err.message});
    }
}


const addLike = async (req,res) =>{
    try{
        const result = await postService.likePost(req.params.id,req.user.id);
        res.status(result.status).json({msg: result.msg});
    }catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId')
            return res.status(404).json(errorMsg("Post not found",404));
        res.status(500).json({error:err.message});
    }
}

const removeLike = (req,res) => {
    try{

    }catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId')
            return res.status(404).json(errorMsg("Post not found",404));
        res.status(500).json({error:err.message});
    }
}
module.exports = {
    addNewPost,
    showPost,
    listPosts,
    destroyPost,
    addLike,
    removeLike
}
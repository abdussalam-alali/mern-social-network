const postService = require('../services/post.service');
const pick = require('../utils/pick');

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
module.exports = {
    addNewPost,
}
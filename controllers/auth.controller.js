const authService = require('../services/auth.service');

const getUser = async (req,res) =>{
    try{
        const result = await authService.verifyTokenAndGetUser(req);
        return res.status(200).json(result);
    }catch (err) {
        console.log(err);
        return res.status(500).json({msg:'internal Server Error'});
    }

}

const authenticate = async (req,res) =>{
    try{
        const { email, password } = req.body;
        const result = await authService.attemptLogin(email,password);
        return res.status(200).json(result);
    }catch (err){
        console.error(err.message);
        res.status(500).json({msg:'internal server error'});
    }
}
module.exports = {
    getUser,
    authenticate,
}
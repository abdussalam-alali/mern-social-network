const user = require('../models/User.model');
const { errorMsg, successMsg} = require('../utils/responses');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("config");
const verifyTokenAndGetUser = (request)=>{
    return user.findById(request.user.id).select('-password');
}

const attemptLogin = async (email,password) =>{
    const usr = await user.findOne({email});
    if(!usr){
        return errorMsg('Invalid Credentials');
    }
    console.log(usr);
    const isMatch = await bcrypt.compare(password, usr.password);
    if(!isMatch) {
        return errorMsg('Invalid Credentials');
    }
    const payload = {
        user: {
            id: usr.id,
        }
    }
    const token = await jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
            expiresIn: 36000
        }
    );

    return successMsg({token},'Logged Successfully!');


}
module.exports = {
    verifyTokenAndGetUser,
    attemptLogin,
}
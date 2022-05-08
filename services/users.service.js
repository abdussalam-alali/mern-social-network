const User = require('../models/User.model');
const { errorMsg, successMsg} = require('../utils/responses');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const handleUserRegister = async (data) =>{

    try{
        // check if user exist
        let user = await User.findOne({email: data.email})
        if(user){
            return {
                success: false,
            }
        }
        // get user gravatar
        const avatar = gravatar.url(data.email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        // create new user
        user = new User(data);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(data.password, salt);
        user.avatar = avatar;
        await user.save();
        var result = { token: null };
        const payload = {
            user: {
                id: user.id,
            }
        }
        const token = await jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 36000
            }
            );


        return successMsg({token},'User registered successfully');

        // return web token

    }catch (err){
        console.log(err);
        console.error(err.message);
        return -1;
    }

}

module.exports = {
    handleUserRegister,
}
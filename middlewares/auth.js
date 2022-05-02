const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User.model');
module.exports  = async (req,res,next) =>{
    // Get the token from headers
    const token = req.header('x-auth-token');
    // check if no token
    if(!token) {
        return res.status(401).json({ msg: 'Unauthorized, No Token' });
    }

    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;
        return next();
        const dbUser = await User.findOne({_id: req.user.id});
        if(dbUser)
            next();
        res.status(402).json({msg:"Unauthorized"});
    }catch(err) {
        console.error(err.message);
        res.status(401).json({msg: 'Invalid token'});
    }
}
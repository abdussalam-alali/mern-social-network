const catchAsync = require('../utils/catchAsync');
const {validationResult} = require("express-validator/check");
const userService = require("../services/users.service");
const pick = require('../utils/pick');

const register =catchAsync(
    async (req,res) =>{
    const data = pick(req.body,['name','email','password']);
    const result = await userService.handleUserRegister(data);

    return res.json(result);
});


module.exports = {
    register,
}
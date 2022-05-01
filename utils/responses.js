
const errorMsg = (msg, statusCode=500)=>{
    return {
        errors: [
            {
                msg,
                status: statusCode
            }
        ]
    }
}

const successMsg = (data,msg='') =>{
    return {
        success: true,
        data,
        msg
    }
}
module.exports = {
    errorMsg,
    successMsg
}
const JWT = require("jsonwebtoken")

const generateToken = (id)=>{
    let token = JWT.sign({_id:id}, "Maxviy@Key");
    return token;
}

// Export module

module.exports = {generateToken}
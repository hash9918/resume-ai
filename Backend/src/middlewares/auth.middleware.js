const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")


//here next is used to pass the control after doing the logic of middleware to the next middleware or controller in the route handler
async function authUser(req,res,next){

    const token = req.cookies.token


    if(!token){
        return res.status(401).json({message:"NO Token provided"})
    }

    const isTokenBlackListed = await tokenBlackListModel.findOne({
        token
    })

    if(isTokenBlackListed){
        return res.status(401).json({message:"Token is invalid"})
    }

try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()

}catch(err){
    return res.status(401).json({message:"Unauthorized"})
}


}


module.exports = { authUser }
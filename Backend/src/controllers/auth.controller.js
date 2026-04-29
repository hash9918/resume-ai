const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blacklist.model')

//controller function is used to handle the logic of a specific route. it is called by the router when a request is made to that route. in routes/auth.routes.js we have defined a route for registering a new user and we have assigned the controller function to handle the logic of that route. when a request is made to that route, the controller function will be called and it will handle the logic of registering a new user.

/**
 * @name registerUser
 * @description register a new user, expects username, email and password in the request body
 * @access public
 */




async function registerUserController(req,res){

    console.log(req.body)

    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    const userAlreadyExists = await userModel.findOne({
        //or operator is used to check if either the username or email already exists in the database.
        $or: [{username},{email}]
    })
    if(userAlreadyExists){
        return res.status(400).json({message:"user already exists   "})
    }
    const hash = await bcrypt.hash(password,10);


    //create a new user in the database with the provided username, email and hashed password. 
    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    //generate a json web token for the newly created user. the token will be used for authentication in future requests. the token will contain the user's id and it will be signed with a secret key. the token will expire in 1 day.
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

    //setting the cookie with the token and sending the response back to the client. the cookie will be used for authentication in future requests. the cookie will expire in 1 day.
    res.cookie("token",token).status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })


}




/**
 * @name loginUser
 * @description login a user, expects email and password in the request body
 * @access public
 */


async function loginUserController(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({   message:"invalid email or password"})
    }


    //here we compare the password provided and the stored in db, here the password is hashed so its not changed back to original, here the compare uses the same hashing algorithm to hash the provided password and then compares it with the stored hashed password. if they match, it returns true, otherwise it returns false.
    const isPasswordValid = await bcrypt.compare(password,user.password)



    if(!isPasswordValid){
        return res.status(400).json({message:"invalid email or password"})
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

    res.cookie("token",token).status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


/**
 * @name logoutUser
 * @description logout a user, clear the cookie and add the token to the blacklist
 * @access private
 */

async function logoutUserController(req,res){
    const token = req.cookies.token
    if(token){
        //here we are adding the token to the blacklist, so that it cannot be used for authentication in future requests. the token will be removed from the blacklist after it expires.
        await tokenBlackListModel.create({token})
        res.clearCookie("token").status(200).json({message:"user logged out successfully"})
    }
}


/**
 * @name getMe
 * @description get the logged in user details.
 * @access private  
 */

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message:"user details fetched succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports = {registerUserController, loginUserController, logoutUserController , getMeController}
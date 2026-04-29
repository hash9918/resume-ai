const {Router} = require('express')
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js")

const authRouter = Router()


/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access public
 */

authRouter.get("/test",(req,res)=>{
    res.status(200).json({message:"auth route is working"})
})
authRouter.post("/register",authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description login a user
 * @access public
 */

authRouter.post("/login",authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description logout a user and clear cookie and add the token to the blacklist
 * @access private
 */

authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser,authController.getMeController)




module.exports = authRouter
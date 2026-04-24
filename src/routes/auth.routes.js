const {Router} = require('express')
const authController = require("../controllers/auth.controller.js")

const authRouter = Router()


/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access public
 */


authRouter.post("/register",authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description login a user
 * @access public
 */

authRouter.get("/login",authController.loginUserController)


module.exports = authRouter
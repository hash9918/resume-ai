const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')



// it is middleware that parses incoming request bodies with json payloads
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth.routes")



// it is middleware that directs all requests to /api/auth to the auth router
app.use("/api/auth", authRouter)

module.exports = app



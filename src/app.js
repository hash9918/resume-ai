const express = require('express')
const app = express()

const authRouter = require("./routes/auth.routes")

// it is middleware that parses incoming request bodies with json payloads
app.use(express.json())

// it is middleware that directs all requests to /api/auth to the auth router
app.use("/api/auth", authRouter)

module.exports = app



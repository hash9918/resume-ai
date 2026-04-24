const app = require("./src/app")
require('dotenv').config()
const connectToDb = require("./src/config/database")







connectToDb();

app.listen(process.env.PORT,()=>{
    console.log(    `server is running on ${process.env.PORT} `)
})
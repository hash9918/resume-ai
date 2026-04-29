const mongoose = require('mongoose')

require('dotenv').config()

async function connectToDb() {

   try{
     mongoose.connect(process.env.MONGO_URI)

    console.log("connnected to db")
   }
   catch(e)
   {console.log(e)}
    
}

module.exports = connectToDb
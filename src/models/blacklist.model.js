const mongoose = require("mongoose")

const blackListSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"]
    },

},{
    timestamps:true
})


const tokenBlackListModel = mongoose.model("tokenBlackList",blackListSchema)

module.exports = tokenBlackListModel
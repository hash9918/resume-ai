const mongoose = require("mongoose")

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"]
    },

},{
    timestamps:true
})


const tokenBlackListModel = mongoose.model("tokenBlackList",blackListTokenSchema)

module.exports = tokenBlackListModel
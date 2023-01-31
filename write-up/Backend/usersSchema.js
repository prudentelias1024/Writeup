const mongoose = require('mongoose')
const user = new mongoose.Schema({
     firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    public_picture:{type:String, required:true},
    password:{type:String, required:true},
    joined_on: {type:Date, required:true}
})
module.exports = mongoose.model("Users", user)
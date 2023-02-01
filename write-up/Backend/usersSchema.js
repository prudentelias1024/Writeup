const mongoose = require('mongoose')
const user = new mongoose.Schema({
     name:{type:String, required:true},
   account_type: {type:String, required: true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    public_picture:{type:String, required:true},
    joined_on: {type:Date, required:true}
})
module.exports = mongoose.model("Users", user)
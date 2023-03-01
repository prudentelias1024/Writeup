const mongoose = require('mongoose')
const user = new mongoose.Schema({
     name:{type:String, required:true},
   account_type: {type:String, required: true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    public_picture:{type:String, required:true},
    joined_on: {type:Date, required:true},
    followers: [
      {type:mongoose.Schema.Types.ObjectId,
      ref: 'Users'
      }
    ],
    following: [
      {type:mongoose.Schema.Types.ObjectId,
      ref: 'Users'}],
    followingTags: [
      {type:String, required:false }],
    bio: {type:String,default :() => ''},
    work: {type:String,default :() => ''},
    hobby: {type:String,default :() => ''},
    webUrl: {type:String, required:false},
    location: {type:String,default :() => ''},
    googleId: {type:String},
    twitterId: {type:String},
    githubId: {type:String}
})
module.exports = mongoose.model("Users", user)
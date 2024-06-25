const mongoose = require('mongoose')
const user = new mongoose.Schema({
     premiumPlan: {type:String, default: () => 'free'},
     name:{type:String, required:true},
  
     lastActive:
      {type:Date, required:false},
     lastProfileChange:
      {type:Date, required:false},
      lastPosted:
      {type:Date, required:false},
      lastActiveNotified:
      {type:Date, required:false},
      lastPostedNotified:
      {type:Date, required:false},
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
    notis: [
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
    websiteUrl: {type:String,default :() => ''},
    work: {type:String,default :() => ''},
    hobby: {type:String,default :() => ''},
    webUrl: {type:String, required:false},
    location: {type:String,default :() => ''},
    googleId: {type:String},
    twitterId: {type:String},
    githubId: {type:String},
    verified: {type:Boolean,default: () => false }
})
module.exports = mongoose.model("Users", user)
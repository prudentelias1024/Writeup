const mongoose = require('mongoose')
const Organizations = new mongoose.Schema({
     premiumPlan: {type:String, default: () => 'free'},
     name:{type:String, required:true},
     lastActive:
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
    organizationFollowers: [
        {type:mongoose.Schema.Types.ObjectId,
            ref: 'Organizations'
            }
    ],
    organizationFollowing: [
        {type:mongoose.Schema.Types.ObjectId,
            ref: 'Organizations'
            }
    ],
    following: [
      {type:mongoose.Schema.Types.ObjectId,
      ref: 'Users'}],
    followingTags: [
      {type:String, required:false }],
    webUrl: {type:String, required:false},
    location: {type:String,default :() => ''},
    googleId: {type:String},
    twitterId: {type:String},
    githubId: {type:String},
    verified: {type:Boolean,default: () => false }
})
module.exports = mongoose.model("Organizations", Organizations)
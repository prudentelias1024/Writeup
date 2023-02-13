const mongoose = require('mongoose')
const BlogPosts = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    
    image: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true},
    excerpt:
     {
        type:String,
        required:true
     },
    created: {
        type:Date,
        required:true
    },
    excerpt: {
        type:String,
        required:true
    },
    views: {
        type:Number,
        required:true
    },
    comments: [
         {
            user:mongoose.SchemaTypes.ObjectId,
             message: String
        } ],
    likes: 
    [{
            user:mongoose.SchemaTypes.ObjectId
        }],
    bookmarks: [
        {user:mongoose.SchemaTypes.ObjectId
        
        }]
})

module.exports =  mongoose.model('BlogPosts',BlogPosts)
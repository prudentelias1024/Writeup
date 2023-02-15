const mongoose = require('mongoose')
const PublishedPosts = new mongoose.Schema({
    author: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    
    postId: {

        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    tags: {
        type: [String],
        required:true
    },
    body: {
        type:String,
        required:true
    },
  
    
    withExcerpt: {
        type:Boolean,
        required:true
     },
    created: {
        type:Date,
        required:true
    },
    coverImageURL: {
        type:String,
        required:false
    },
   
    views: {
        type:Number,
        required:false
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

module.exports =  mongoose.model('PublishedPosts',PublishedPosts)
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
            user : { type: mongoose.Schema.Types.ObjectId,  ref: 'Users',
            likes: [{
                                user:{ type: mongoose.Schema.Types.ObjectId,
                    ref: 'Users',

            }}],
            replies: [{type:mongoose.Schema.Types.ObjectId,  ref: 'Users'}]        
        },
            message: String
        } ],
    likes: 
    [{
            
             type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
            
        }],
    bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                    ref: 'Users'
                },
         
        
        ]
})

module.exports =  mongoose.model('PublishedPosts',PublishedPosts)
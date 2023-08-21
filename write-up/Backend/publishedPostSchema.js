const mongoose = require('mongoose')
const PublishedPosts = new mongoose.Schema({
    verifiedAuthor: {type: Boolean, default :() => false},
    authorPremiumPlan: {type:String, default: () => 'free'},
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

     readingTime : {
        type: String,
        required: true
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
         default: 0,
        required:true
    },
    viewedBy :[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
            required: false
         
    }
    ],
      
   
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
         
        
        ],
    reposts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                    ref: 'Users'
                },
         
        
        ],
        collaborators: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false
    }]
})
module.exports =  mongoose.model('PublishedPosts',PublishedPosts)
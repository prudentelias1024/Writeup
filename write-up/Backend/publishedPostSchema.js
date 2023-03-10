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
         default: 0,
        required:true
    },
    viewedBy :[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    comments: [
         {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            createdAt: {  type:Date, required:true, default:() => new Date.now()   },
            user : { type: mongoose.Schema.Types.ObjectId,  ref: 'Users'},
            message: {type:String, required:true},
            likes: [
                {
                user:
                {
                     type: mongoose.Schema.Types.ObjectId,
                    ref: 'Users',

            }
        }
    ],
            replies: [{
                
                user:
                {
                    type:mongoose.Schema.Types.ObjectId, 
                     ref: 'Users'},
                message: {
                    type:String,
                     required:true},
                likes: [{
                                    user:{ type: mongoose.Schema.Types.ObjectId,
                        ref: 'Users',
    
                }}],
            }]        
        },
          
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
         
        
        ]
})

module.exports =  mongoose.model('PublishedPosts',PublishedPosts)
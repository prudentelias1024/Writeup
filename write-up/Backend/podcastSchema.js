const mongoose = require('mongoose')
const Podcast = new mongoose.Schema({
    verifiedAuthor: {type: Boolean, default :() => false},
    authorPremiumPlan: {type:String, default: () => 'free'},
    author: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    
    podcastId: {

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
   
  
   
    created: {
        type:Date,
        required:true
    },
    podcastURL: {
        type:String,
        required:true
    },
   
    listeners: {
        type:Number,
         default: 0,
        required:true
    },
    listenedBy :[{
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
         
        
        ],
        collaborators: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false
    }]
})
module.exports =  mongoose.model('Podcast',Podcast)
const mongoose = require('mongoose')

const reelsSchema = new mongoose.Schema({
    verifiedAuthor: {type: Boolean, default :() => false},
    authorPremiumPlan: {type:String, default: () => 'free'},
    reelId: {
        type: String,
        required: true,
    },
    created: {
        type:Date,
        required:true
    },
    reelImageURL: {
        type:String,
        required:false
    },
    reposts: [{
        user:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',}}],              
        
        bookmarks: [{
                            user:{ type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',

        }}],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    
    },
    type: {
        type: String,
        required: true
    }
    ,
    votes: {
        type:Number,
        required: false
    },
    tags:   {
        type: [String],
        required:true
    }  ,
    options: [
       {
          pollname:  {type:String, required:false},
          vote: {type:Number,
            default: 0,
             required:true},
             percentage: {
                type:Number,
                required: false
             }
       }
    ],
    impressions: {
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

                reposts: [{
                user:{ type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',}}],              
                
                bookmarks: [{
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
        text: {
           type: String,
           required: true
        }
       

})
module.exports = mongoose.model('reels', reelsSchema)
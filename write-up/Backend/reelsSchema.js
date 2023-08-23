const mongoose = require('mongoose')

const reelsSchema = new mongoose.Schema({
    verifiedAuthor: {type: Boolean, default :() => false},
    authorPremiumPlan: {type:String, default: () => 'free'},
    postId: {
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
        text: {
           type: String,
           required: true
        }
       

})
module.exports = mongoose.model('reels', reelsSchema)
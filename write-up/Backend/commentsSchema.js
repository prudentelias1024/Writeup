const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
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
    images: [{
        type:String,
        required:false
    }],
    reposts: [{
        user:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',required:false}}],              
        
        bookmarks: [{
                            user:{ type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                required:false

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
    tags: [{
        type: String,
        required: true
    }]
    ,
    votes: {
        type:Number,
        required: false
    },
    
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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        required: false
     
}],
                reposts: [{
                user:{ type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'

            }}],              
                
                bookmarks: [{
                                    user:{ type: mongoose.Schema.Types.ObjectId,
                        ref: 'Users',
    
                }}],
   
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
module.exports = mongoose.model('Comments', commentsSchema)
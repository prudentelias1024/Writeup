const mongoose = require('mongoose')

const reelsSchema = new mongoose.Schema({
    reelsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    
    },
    type: {
        type: String,
        required: true
    }
    ,
    options: [
        {type:String, required:true}
    ],
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
        text: {
           type: String,
           required: true
        }
       

})
module.exports = mongoose.model('reels', reelsSchema)
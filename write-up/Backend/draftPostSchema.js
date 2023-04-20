const mongoose = require('mongoose')
const DraftsPosts = new mongoose.Schema({
    verifiedAuthor: {type: Boolean, default :() => false},
    authorPremiumPlan: {type:String, default: () => 'free'},
    author: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    draftId: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    
    coverImageUrl: {
        type:String,
        required:false
    },
    body: {
        type:String,
        required:true
    },
    readingTime : {
        type: String,
        required: true
     },
    
        withExcerpt: {
        type:Boolean,
        required:false
     },
    created: {
        type:Date,
        required:true
    },
    tags: {
        type: [String],
        required:false
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
        required: false
}]
   
})


module.exports =  mongoose.model('DraftPosts',DraftsPosts)
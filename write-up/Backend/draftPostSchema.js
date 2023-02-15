const mongoose = require('mongoose')
const DraftsPosts = new mongoose.Schema({
    postId: {
        type:String,
        required:true
    },
    userId: {
        type: String,
        required:true,
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
    
        withExcerpt: {
        type:Boolean,
        required:true
     },
    created: {
        type:Date,
        required:true
    },
    tags: {
        type: [String],
        required:true
    },
   
})

module.exports =  mongoose.model('DraftPosts',DraftsPosts)
const mongoose = require('mongoose')

const Bookmarks = new mongoose.Schema({
    _id:  
     {
        type: mongoose.Schema.Types.ObjectId,
        required: true    
    },

    type: {
        type: String,
        required: true
    },

    reelsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reels',
        required: false
    
    },
    
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PublishedPosts',
        required: false
    
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    
    },

    bookmarked_on : {
        type:Date,
        required:true
    },
   

   
})


module.exports =  mongoose.model('Bookmarks',Bookmarks)
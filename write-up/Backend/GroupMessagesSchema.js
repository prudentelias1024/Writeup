const mongoose = require('mongoose')

const groupMessagesSchema = new mongoose.Schema({
    convo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupConversations', 
        required: true
    }
    ,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    received_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
        
    }],

    seen_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
        
    }],

    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages', 
     

        }],
    
        text: {
            type: String,
            required: true
        },
    
    sent_on : {
        type: Date,
        default: Date.now
   
    },
   
    
    video: {
        type: String,
        reqired: false
    },
    photo: {
        type: String,
        reqired: false
    },
    audio: {
        type: String,
        reqired: false
    }

});



module.exports = mongoose.model("GroupMessages", groupMessagesSchema)
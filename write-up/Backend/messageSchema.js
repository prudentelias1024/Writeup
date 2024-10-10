const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },

    text: {
        type: String,
        required: true
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages', 
     

        }
    ],
    sent: {
        type: Boolean,
        required: false,
        default: true
   
    },
    delivered: {
        type: Boolean,
        required: false,
        default: false
   
    },
    seen: {
        type: Boolean,
        required: false,
        default: false
    },
    
    sent_on : {
        type: Date,
        default: Date.now
   
    },
    delivered_on : {
        type: Date,
        required: false
    },
    
    seen_on : {
        type: Date,
        required: false
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



module.exports = mongoose.model("Messages", messagesSchema)
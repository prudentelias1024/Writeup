const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages' ,
        required: false
    },
    lastMessageTimestamp: {
        type: Date,
        default: Date.now
    },
    status: {
     type: String,
     required: true   
    }
   
}, { timestamps: true });



module.exports = mongoose.model("Conversations" ,conversationSchema)
const mongoose = require('mongoose')

const groupConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true
    }],
    adminLocked:  {
        type: Boolean,
        required:true,
        default: () => false 
    },
    name: {
      type: String,
      required:true  
    },
    description: {
      type: String,
      required:true  
    },

    icon: {
      type: String,
      required:true  
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages' ,
        required: false
    },
    lastMessageTimestamp: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        default: ()=> 'group'
    }
}, { timestamps: true });



module.exports = mongoose.model("GroupConversations" ,groupConversationSchema)
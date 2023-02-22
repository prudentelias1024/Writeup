const mongoose = require('mongoose')

const notificationsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      message: [
        {
        user:{type: mongoose.Schema.Types.ObjectId,
             ref: 'Users'    
        }, 
        message: {
            type: String,
            required:false
        }
        }],
      
      type: {
        type: String,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
     
})


module.exports = mongoose.model("notifications", notificationsSchema)
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
        },
        post: {
            type:mongoose.Schema.Types.ObjectId,
        ref: 'PublishedPosts'
    }
        }],
       link: {
        type: String,
        required: true
       },
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
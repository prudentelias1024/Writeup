const mongoose = require('mongoose')

const notificationsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    actionUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    postId: {
        type: String,
        required: false,
      },
      message: [
        {
        user: [
          {
            
       name:
          {
          type:String,
             }, 

        public_picture: {
          type:String
        },
          link: {
            type:String,
            
          }
        }], 
        
       post: [
          {

          name:
          {
          type:String,
         
          }, 
          link: {
            type:String,
           
          }
        }]
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
       
          type:Date,
           required:true,
            default:() => new Date   
      },
     
})


module.exports = mongoose.model("notifications", notificationsSchema)
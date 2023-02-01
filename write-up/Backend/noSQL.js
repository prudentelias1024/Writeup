const mongoose  = require("mongoose")
const connectMongooseDB = () => {
    mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    },)
}
mongoose.set('strictQuery',true)

module.exports = connectMongooseDB
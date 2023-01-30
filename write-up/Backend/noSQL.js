const mongoose  = require("mongoose")
const connectMongooseDB = () => {
    mongoose.connect("mongodb+srv://Elias:Bukola_13@cluster0.tgmtr5q.mongodb.net/?retryWrites=true&w=majority",{
        useUnifiedTopology:true,
        useNewUrlParser: true
    },)
}

module.exports = connectMongooseDB
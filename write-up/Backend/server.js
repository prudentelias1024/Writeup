require('dotenv').config()
const express = require('express');
const mongoose= require('mongoose');
const app = express()
const connectToMongooseDB = require("./noSQL")
const pool = require("./mysql")
const cookieParser = require('cookie-parser')
const passport = require('passport')
const passportLocal = require('passport-local')
const bcrypt = require('bcryptjs')
const expressSession = require('express-session')
const bodyParser = require('body-parser');
const loginAPI = require('./loginAPI')
const cors = require('cors')
const User = require('./usersSchema')
//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSession({
    secret:'inkware',
    resave: true,
    saveUninitialized: true
}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser("inkware"))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

//Routes Middlewares


app.post('/login' ,(req,res, next) => {
    User.findOne({email: req.body.email},(err,user) => {
        if(err){throw err}
        if(!user){
            res.send('https://localhost:3000/signup')
        }
        if(user){ res.send(user)}
    })
//    passport.authenticate("local",(err,user,info) => {
//     if (err) {
//         throw err;
//     }
//     if (!user) {
//         res.send("No User Exists")
//     } else {
//         req.logIn(user, err => {
//             if(err) throw err;
//             res.send("Successfully Authenticated");
//             console.log(req.user);
//           res.send(req.user);
//         })
//     }
    
//    })(req,res,next);
})
app.post('/signup' ,async(req,res) => {
    
    // req.body = req.body.userInfo
    console.log(req.body)
    User.findOne({email: req.body.email}, async(err,doc) => {
        console.log(doc)
        if(err){
            throw err
        }
        if(doc){
            res.send({message: "User Exists", data:doc})
        }
       if(!doc){
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            public_picture: req.body.public_picture,
            username: req.body.email.toString().split('@')[0],
            joined_on: req.body.joined_on,
            account_type: req.body.account_type
        })
        await newUser.save()
        res.send("User Created")
       }
    })
})
app.get('/user' ,(req,res) => {
 
})






connectToMongooseDB()

mongoose.connection.once("open", () => {
    console.log("Connected to Mongodb")
})


app.listen("5000",() => {
    console.log("Server is listening at PORT 5000")
})
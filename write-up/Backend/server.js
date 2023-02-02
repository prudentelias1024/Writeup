require('dotenv').config()
const express = require('express');
const mongoose= require('mongoose');
const app = express()
const connectToMongooseDB = require("./noSQL")
const pool = require("./mysql")
const expressSession = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors')
const User = require('./usersSchema')
const jwt = require('jsonwebtoken')
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

//Routes Middlewares
const verify = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        let token = authHeader.toString().split(' ')[1]
     jwt.verify(token,'Inkware Non-Member', (err,user) => {
            if(err){res.status(401).json("Token is invalid")}
            if(user){
                User.findOne({username: user}, (err,user) => {
                    if(err){throw err}
                    
                    req.user = user;
                    next();
                })
            }
        })
    } else {
        res.status(403).json("You are not authenticated")
    }
}

app.post('/api/login' ,(req,res) => {
    User.findOne({email: req.body.email},(err,user) => {
        if(err){throw err}
        if(!user){
          res.send({message: 'User Doesn\t Exists'})
        }
        if(user){
                      let access_token = jwt.sign(user.username,'Inkware Non-Member')
            res.send({Authorization: `Bearer ${access_token}`})
        }
    })
})
app.post('/api/signup' ,async(req,res) => {
    
    // req.body = req.body.userInfo
    console.log(req.body)
    User.findOne({email: req.body.email}, async(err,doc) => {
        console.log(doc)
        if(err){
            throw err
        }
        if(doc){
            res.send({message: "User Exists"})
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
        res.send({message: "User Created"})
       }
    })
})

app.get('/api/user' , verify, (req,res) => {
    // console.log(req.user)
  res.send(req.user)
})






connectToMongooseDB()

mongoose.connection.once("open", () => {
    console.log("Connected to Mongodb")
})


app.listen("5000",() => {
    console.log("Server is listening at PORT 5000")
})
require('dotenv').config()
const express = require('express');
const mongoose= require('mongoose');
const app = express()
const connectToMongooseDB = require("./noSQL")
const expressSession = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors')
const PublishedPosts = require('./publishedPostSchema')
const DraftPosts = require('./draftPostSchema')
const User = require('./usersSchema')
const jwt = require('jsonwebtoken')
const moment = require('moment');
const { populate } = require('./usersSchema');
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
    console.log(req.body)
     User.findOne({googleId: req.body.googleId},(err,user) => {
        console.log(user)
        if(err){throw err}
        if(!user){
          res.send({message: 'User Doesn\t Exists'})
        }
        if(user){
                      let access_token = jwt.sign(user.username,process.env.INKUP_SECRET_KEY)
            res.send({Authorization: `Bearer ${access_token}`})
        }
    })
})
app.post('/post/create', verify, async(req,res) => {
    
    let {title,body,tags,coverImageURL,withExcerpt, postId} = req.body
     tags  = tags.split(' ')
    const publishedPosts = new PublishedPosts({
        postId: postId,
        title: title,
        body:  body,
        tags:tags,
         coverImageURL: coverImageURL,
        author: req.user._id,
        created: moment(),
        withExcerpt: withExcerpt
        
    })
   await  publishedPosts.save()
    res.send({message:"Published"})

})
app.post('/post/draft', verify, (req,res) => {
    let {title,body,tags,coverImageURL,withExcerpt, postId} = req.body
     tags  = tags.split(' ')
    const draftPosts = new DraftPosts({
        postId: postId,
        title: title,
        body:  body,
        tags:tags,
        coverImageURL: coverImageURL,
        userId: req.user._id,
        withExcerpt: withExcerpt
        
    })
     draftPosts.save()
     res.send({message:"Saved as Draft"})


})

app.get('/posts', verify, (req,res) => {
    PublishedPosts.find().populate('author').exec((err,doc) => {
        if (err) {
            throw err
        }
        if(doc){
            console.log(doc)
            res.send(doc)
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
            account_type: req.body.account_type,
            googleId: req.body.googleId
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

app.post('/api/user/edit', verify, (req,res) => {
    changes = req.body.profileChanges
    console.log(req.body)
    console.log(req.user)
   
  console.log(changes)
    //we'll find difference and if any changes is made we update it in the Db
    User.findByIdAndUpdate(req.user._id, {username: String(changes.username)},{new:true}, (err,doc) => {
        if(err){throw err}
        if(doc){
            console.log(doc)
           let access_token =  jwt.sign(doc.username,process.env.INKUP_SECRET_KEY )
           console.log(access_token)
           res.send({user:doc, Authorization: `Bearer ${access_token}` })
        }
    })
})




connectToMongooseDB()

mongoose.connection.once("open", () => {
    console.log("Connected to Mongodb")
})


app.listen("5000",() => {
    console.log("Server is listening at PORT 5000")
})
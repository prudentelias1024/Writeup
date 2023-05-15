require('dotenv').config()
const express = require('express');
const mongoose= require('mongoose');
const app = express()
const connectToMongooseDB = require("./noSQL")
const expressSession = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors')
const mailgen = require('mailgen')
//Schemas
const PublishedPosts = require('./publishedPostSchema')
const DraftPosts = require('./draftPostSchema')
const User = require('./usersSchema')
const notifications   = require('./notificationsSchema')
const jwt = require('jsonwebtoken')
const moment = require('moment');
const { populate } = require('./usersSchema');
const axios = require('axios')
const firebase = require('firebase-admin')
const http = require('http')
const server = http.createServer(app)
const nodemailer = require('nodemailer')
const cron = require('node-cron');
const draftPostSchema = require('./draftPostSchema');
const publishedPostSchema = require('./publishedPostSchema');
const usersSchema = require('./usersSchema');
const reels = require('./reelsSchema');
//Dynamic URL
let URL;

if (process.env.NODE_ENV == 'production') {
    URL = "https://writeup.vercel.app"
  }else{
    URL = "http://localhost:3000"
           
  }
const io  = require('socket.io')(server, {
    
    cors:{
    origin: URL,
    method: ["GET", "POST"],
    
}
})
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
cron.schedule('0 0 12 * * ', () => {
    console.log('Running .......')
User.find().select('lastPosted lastPosteNotified name email').exec((err,users) => {
 users.forEach(async(user) => {
 if(moment().diff(moment(user.lastPosted)) >= 30 || moment().diff(moment(user.lastPostedNotified)) >= 30) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
           auth: {
            user: 'inkup1024@gmail.com',
            pass: 'zyghrqwepszerctl'
            
        },
        tls: {
            rejectUnauthorized: false
          }
    
      })

      let message = {
        from: "'Inkup' <Inkup1024@gmail.com>", //my email address
        to: `${user.email}`,
        subject: 'Don\'t Forget to Post on Our App!',
        text: 'It\'s been a long time!',
        attachment: [{
            filename: 'inkup.png',
            path: '/inkup.png',
            cid: 'inkup.png'
        }],
        html: `" <p style='font-family: Outfit; font-size: 1.5em;'>Dear ${user.name}</p> <br>
         <p style='font-family: Outfit; font-size: 1.5em;'> 
        We hope this email finds you well. We wanted to send you a friendly reminder about our app, which we think could be very useful for you.
         </p> <br> 
         <p style='font-family: Outfit; font-size: 1.5em;'> 
         As you may recall, our app can help you as a Writer, Programmer and Podcaster. We noticed that you haven't posted since your last post and more often as you used to, and we wanted to encourage you to give it another try and help us build our  community.
         </p> <br> 
         <p style='font-family: Outfit; font-size: 1.5em;'> 
         So why not give it another try? We think you'll be pleasantly surprised by how much it can simplify your daily routine. If you have any questions or concerns, please don't hesitate to reach out to us.

         </p> <br> 

         <p style='font-family: Outfit; font-size: 1.5em;'> 
         Thank you for considering our app, and we look forward to hearing from you soon.
         </p> <br> 

         <p style='font-family: Outfit; font-size: 1.5em;'> 
         Thank you for considering our app, and we look forward to hearing from you soon.
         </p> <br> 
         
         <p> Best regards, <br>
       ${user.name}"`
      }

   let messageId =  await  (await transporter.sendMail(message)).messageId
   User.findOneAndUpdate({email:user.email},{$set: {lastPostedNotified: new Date}}).exec((err,doc) => {
    if (err) {
        throw err
    }
   })
 }

 if (moment().diff(moment(user.lastActive)) >= 7 || moment().diff(moment(user.lastActiveNotified)) >= 7) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
           auth: {
            user: 'inkup1024@gmail.com',
            pass: 'zyghrqwepszerctl'
            
        },
        tls: {
            rejectUnauthorized: false
          }
    
      })

      let message = {
        from: "'Inkup' <Inkup1024@gmail.com>", //my email address
        to: `${user.email}`,
        subject: 'Don\'t Forget to Use Our App!',
        text: 'It\'s been a long time!',
        attachment: [{
            filename: 'inkup.png',
            path: '/inkup.png',
            cid: 'inkup.png'
        }],
        html: `" <p style='font-family: Outfit; font-size: 1.5em;'>Dear ${user.name}</p> <br>
         <p style='font-family: Outfit; font-size: 1.5em;'> 
        We hope this email finds you well. We wanted to send you a friendly reminder about our app, which we think could be very useful for you.
         </p> <br> 
         <p style='font-family: Outfit; font-size: 1.5em;'> 
         As you may recall, our app can help you as a Writer, Programmer and Podcaster. We noticed that you haven't been using our application as often as you used to, and we wanted to encourage you to give it another try and help us build our  community.
         </p> <br> 
         <p style='font-family: Outfit; font-size: 1.5em;'> 
         So why not give it another try? We think you'll be pleasantly surprised by how much it can simplify your daily routine. If you have any questions or concerns, please don't hesitate to reach out to us.

         </p> <br> 

         <p style='font-family: Outfit; font-size: 1.5em;'> 
         Thank you for considering our app, and we look forward to hearing from you soon.
         </p> <br> 

         <p style='font-family: Outfit; font-size: 1.5em;'> 
         Thank you for considering our app, and we look forward to hearing from you soon.
         </p> <br> 
         
         <p> Best regards, <br>
       ${user.name}"`
      }
      User.findOneAndUpdate({email:user.email},{$set: {lastActiveNotified: new Date}}).exec((err,doc) => {
        if (err) {
            throw err
        }
       })
   let messageId =  await  (await transporter.sendMail(message)).messageId
 }
})
})

})

//sockets 
io.on('connection',(socket) => {
    console.log(`Connected : ${socket.id}`)
    //How to pass headers to socket
    socket.on('getNotifications', (data) => {
    //  console.log(data)
 })
})

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
console.log(URL)
app.use(cors({
    origin: URL,
    credentials: true
}))

//Routes Middlewares
const verify = (req,res,next) => {
    res.setHeader("Access-Control-Allow-Credentials","true")
    const authHeader = req.headers.authorization
    if(authHeader){
        let token = authHeader.toString().split(' ')[1]
       
     jwt.verify(token,process.env.INKUP_SECRET_KEY, (err,user) => {
            if(err){res.status(401).json("Token is invalid")}
            if(user){
            
                User.findOne({username: user}).populate('followers').populate('following').exec((err,userDoc) => {
                    if(err){throw err} 
                     if(userDoc){
                        req.user = userDoc;
                        next();
                     } else {
                   
                        res.status(403).json("You are not authenticated")
                     }
                    
                })
            } 
        })
    } else {
        res.status(403).json("You are not authenticated")
    }
}

const verifyAdmin = (req,res,next) => {
    res.setHeader("Access-Control-Allow-Credentials","true")
    const authHeader = req.headers.authorization
    if(authHeader){
        let token = authHeader.toString().split(' ')[1]
       
     jwt.verify(token,process.env.INKUP_SECRET_KEY, (err,user) => {
            if(err){ req.status = 401; res.status(401).json("Token is invalid")}
            if(user){
            
                User.findOne({username: user}).exec((err,userDoc) => {
                    if(err){throw err} 
                     if(userDoc){
                       if(userDoc.username == 'prudentelias' || userDoc.username == 'InkupOfficial')
                       req.status = 200
                        next();
                     } else {
                        req.status = 403
                        res.status(403).json("You are not authenticated")
                     }
                    
                })
            } 
        })
    } else {
        req.status = 403
        res.status(403).json("You are not authenticated")
    }
}



const followingTagsPosts = (tags) => {
    //First algorithm, the one which takes precedence over other algorithm this algorithm is handpicked by the user the moment they follow a tag
    let followingPosts = []
     tags.map((tag) => {
         PublishedPosts.find({tags: {$in: `#${tag}`}}).exec((err,doc) => {
           if(err){throw err}
           if(doc){
           
            doc.map((post) => {
                //This prevent the algorithm from giving duplicate post given the user is following the tags of the post
                if(followingPosts.filter((followingPost) => {return followingPost.postId == post.postId }).length == 0){
                   followingPosts.push(post)
                   console.log(followingPosts.length)
                }
            })
           }
        })

     })
     return  followingPosts
}
const followingUserPosts = (authors) => {
let interestedUserPosts = []
    authors.map((author) => {
        PublishedPosts.find({author: author }).exec((err,doc) => {
           if(err){throw err}
           if(doc){
            interestedUserPosts.push(doc)
           }
        })

    })
    return interestedUserPosts
}

app.post('/api/user/attendance',verify, async(req,res) => {
    console.log(req.body)
User.findOneAndUpdate({email: req.user.email}, {$set :{lastActive: req.body.moment}}, (err,doc) => {
    if(err){
        throw err
    }
    if(doc){
        console.log(doc)
    }
})
})
app.get('/', (req,res) => {
    res.setHeader("Access-Control-Allow-Credentials","true")
    res.send('API is running....')
})

app.get('/api/notifications', verify, async(req,res) => {
  
notifications.find({userId: req.user._id},(err,doc) => {
    if(err){throw err}
    if(doc) {
       
        res.send(doc.reverse())
    }
})
})


    app.post('/api/notification/read', verify, async(req,res) => {
     notifications.findByIdAndUpdate(req.body._id, {read:true},{new:true}, (err,doc) => {
        if(err){throw err}
        if(doc){
            
            res.send(doc)
        }
    })
})


app.post('/api/notification/collaboration', verify, async(req,res) => {
    notifications.find({actionUserId:req.user._id, postId: req.body.draftId, userId: req.body.collaboratorId , type: 'collaboration'}).exec(async(err,doc) => {
        if(err){throw err}
        if(doc){
            if(doc.length == 0 ){
                const notification = new notifications({
                    actionUserVerified: req.user.verified,
                    userId: req.body.collaboratorId,
                    actionUserId: req.user._id,
                    postId: req.body.draftId,
                    message: [
                        {
                            user: [
                                {name:req.user.name},
                                {link: `/@${req.user.username}`},
                                {public_picture: req.user.public_picture}
                            ],
                            post: [{name: req.body.title},
                               {link: `/post/edit/${req.body.draftId}`}
                            ], 
                        }
                    ],
                    type: 'collaboration'

            
                })
            
                await notification.save()
            
            }
        } 
    })
})

app.post('/api/notification/like',verify, async(req,res) => {
  const {postId, author,post_name} = req.body
  notifications.find({actionUserId: req.user._id, postId:postId}).select('type').exec(async(err,doc)=> {
   if (err) { throw err;}
    if (doc) {
        console.log(doc)
        console.log(req.user._id, author._id)
          //incase there's nothing in the db
     
  if (doc.length == 0 ) {
    console.log(doc.length)
       if (req.user._id !== author._id ) {
              
    const newNotification = new notifications({
        actionUserVerified: req.user.verified,
        userId: author._id, //Notification receiver
        postId: postId,
        actionUserId: req.user._id,
        message: [
            {

            user: [{name: req.user.name}, {link:`/@${req.user.username}`},{public_picture: req.user.public_picture}]
        
            ,
            post: [{name: post_name }, {link: `p/@${author.username}/${postId}`}]
        }
         ],
        type: 'like'
       

    })
    await newNotification.save()

       }
    }else{
         //check against duplications of notifications
         //If the author likes his/her post do not create any notifications
       let exists =  doc.some((notification) =>{return notification.type == 'like'} )
     console.log(exists)
    if (exists === false &&  req.user._id !== author._id) {
        
    
    const newNotification = new notifications({
        userId: author._id,
        postId: postId,
        actionUserId: req.user._id,
        message: [
            {

            user: [{name: req.user.name}, {link:`/@${req.user.username}`},{public_picture: req.user.public_picture}]
        
            ,
            post: [{name: post_name }, {link: `p/@${author.username}/${postId}`}]
        }
         ],
        type: 'like'
       

    })
    await newNotification.save()
}
    }

     
    }
  })

   
  
})
app.get('/api/admin/isAdmin', verifyAdmin, async(req,res) => {
    if(req.status == 200){
        res.send({isAdmin: true})
    } else {
        res.send({isAdmin:false})
    }
})
app.get('/api/admin/users', verifyAdmin, async(req,res) => {
    User.find().exec(async(err,doc) => {
    if (req.status == 200) {
        res.send(doc)
    } else {
        res.send({status: 403})
    }
    })
})

app.get('/api/admin/posts', verifyAdmin, async(req,res) => {
    PublishedPosts.find().populate('author').exec(async(err,doc) => {

        if (req.status == 200) {
            res.send(doc)
        }else {
            res.send({status: 403})
        }
    })
})
app.get('/api/admin/drafts', verifyAdmin, async(req,res) => {
    DraftPosts.find().populate('author').exec(async(err,doc) => {

        if (req.status == 200) {
            res.send(doc)
        } else {
            res.send({status: 403})
        }
    })
})
app.get('/api/admin/notifications', verifyAdmin, async(req,res) => {
    notifications.find().exec(async(err,doc) => {

        if (req.status == 200) {
            res.send(doc)
        } else {
            res.send({status: 403})
        }
    })
})

app.post('/api/notification/comment',verify, async(req,res) => {
    const {postId, author,post_name} = req.body
    notifications.find({actionUserId: req.user._id, postId:postId}).select('type').exec(async(err,doc)=> {
     if (err) { throw err;}
      if (doc) {
          console.log(doc)
          console.log(req.user._id, author._id)
            //incase there's nothing in the db
       
    if (doc.length == 0 ) {
      console.log(doc.length)
         if (req.user._id !== author._id ) {
                
      const newNotification = new notifications({
        actionUserVerified: req.user.verified,
          userId: author._id, //Notification receiver
          postId: postId,
          actionUserId: req.user._id,
          message: [
         
              {
  
              user: [{name: req.user.name}, {link:`/@${req.user.username}`},{public_picture: req.user.public_picture}]
          
              ,
              post: [{name: post_name }, {link: `p/@${author.username}/${postId}`}]
          }
           ],
          type: 'comment'
         
  
      })
      await newNotification.save()
  
         }
      }else{
           //check against duplications of notifications
           //If the author likes his/her post do not create any notifications
         let exists =  doc.some((notification) =>{return notification.type == 'comment'} )
       console.log(exists)
      if (exists === false &&  req.user._id !== author._id) {
          
      
      const newNotification = new notifications({
          userId: author._id,
          postId: postId,
          actionUserId: req.user._id,
          message: [
              {
  
              user: [{name: req.user.name}, {link:`/@${req.user.username}`},{public_picture: req.user.public_picture}]
          
              ,
              post: [{name: post_name }, {link: `p/@${author.username}/${postId}`}]
          }
           ],
          type: 'comment'
         
  
      })
      await newNotification.save()
  }
      }
  
       
      }
    })
  
     
})
app.post('/api/notification/bookmark',verify, async(req,res) => {
     const {postId, author,post_name} = req.body
     notifications.find({actionUserId: req.user._id, postId:postId}).select('type').exec(async(err,doc)=> {
        if (err) {
         throw err;
        }
         if (doc) {
        if (doc.length == 0) {
            if (req.user._id !== author._id ) {
   
            const newNotification = new notifications({
                actionUserVerified: req.user.verified,
                userId: author._id,
                postId: postId,
                actionUserId: req.user._id,
                
                message: [{user: [{name: req.user.name}, {link:`/@${req.user.username}`},{public_picture: req.user.public_picture}],post: [{name: post_name }, {link: `p/${author.username}/${postId}`}]} ],
                type: 'bookmark'
            
            })
            await newNotification.save()
        }
        } else {
             //check against duplications of notifications
             let exists =  doc.some((notification) =>{return notification.type == 'bookmark'} )
          if (exists === false  && author._id !== req.user._id) {
            //check if the author of the post doesn't bookmark if the author bookmark his/her post don't create notification
           
        
            const newNotification = new notifications({
                userId: author._id,
                actionUserId: req.user._id,
                postId: postId,
                message: [{user: [{name: req.user.name}, {link:`/@${req.user.username}`},{public_picture: req.user.public_picture}],post: [{name: post_name }, {link: `p/${author.username}/${postId}`}]} ],
                type: 'bookmark'
            
            })
            await newNotification.save()
        }  
}
         }
        })
})
app.post('/api/notification/welcome',verify, (req,res) => {

})
app.post('/api/notification/follow',verify, async(req,res) => {
    const {postId, author,post_name} = req.body
    const newNotification = new notifications({
        actionUserVerified: req.user.verified,
        userId: author._id,
        message: [{user: [{name: req.user.name}, {link:`/@${req.user.username}`},{public_picture: author.public_picture}]} ],
        type: 'follow'
       

    })
    await newNotification.save()
})

 app.post('/api/follow', verify,  (req,res) => {    
    let {user,author} = req.body;
  
    // add user to the author followers list
    User.findOneAndUpdate({username:author.username}, {$push: {followers: req.user._id} }, {new:true},(err,doc) => {
        if(err){throw err} 
       console.log(doc)
      
    })
            // Add the author the  user following list
        User.findOneAndUpdate({username:user.username}, {$push: {following: mongoose.Types.ObjectId(author._id)} }, {new: true}, (err,doc1) => {
            if(err){throw err}
            
            console.log(doc1)
        
    })
   followers = []
   following = []

 })

 app.post('/api/unfollow', verify,  (req,res) => {
    let {user,author} = req.body;
    let followers = [],following = [];
    //get list of followers for the author
    User.find({username:author.username} ,(err,doc) =>{
    if(err){throw err}
    if (doc) {
        followers = doc[0].followers
    }
    })
    //remove user from the list of followers followers and return new list of followers
    followers = followers.filter((follower) => {
        return  user._id  !==  follower
    })
    //get the list of following for the user
    User.find({username:user.username},(err,doc) =>{
    if(err){throw err}
    if (doc) {
        following = doc[0].following
    }
    })

     following = following.filter((followinguser) => {
        return followinguser !== author._id
     })

    //add user to the author followers list
    User.findOneAndUpdate({username:author.username}, {followers: followers}, (err,doc) => {
        if(err){throw err} else{
        
      
            
            //Add the author the  user following list
        User.findOneAndUpdate({username:user.username}, {following: following}, {new: true}, (err,doc1) => {
            if(err){throw err}

        })
  
    }
    })
   
 })

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

app.get('/api/user' , verify, (req,res) => {
    // console.log(req.user)
  res.send(req.user)
})

app.post('/api/signup' ,async(req,res) => {
   
   
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
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            
            auth: {
                user: 'inkup1024@gmail.com',
                pass: 'zyghrqwepszerctl'
                
            }
        
        
          })

          let message = {
            from: "'Inkup' <Inkup1024@gmail.com>", //my email address
            to: `${req.body.email}`,
            subject: 'Account Successfully Created',
            text: 'Welcome to Inkup',
            attachment: [{
                filename: 'inkup.png',
                path: '/inkup.png',
                cid: 'inkup.png'
            }],
            html: `" <p style='font-family: Outfit; font-size: 1.5em;'>Welcome to Inkup</p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> Join our community of writers and showcase your skills!. </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> <b> Dear  ${req.body.name} </b>, I hope this email finds you well. I am reaching out to you on behalf of our app [Inkup], which is a platform that showcases articles written by users like yourself. </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> We believe that you have a unique perspective and valuable insights that our readers would love to hear about. We would be thrilled if you could join our community of writers and share your knowledge and experiences with us </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> Not only will you have the opportunity to showcase your skills and expertise, but you will also be able to connect with other like-minded individuals who share your passion for writing. Our platform is user-friendly and provides a supportive environment for writers of all levels to grow and develop their skills</p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> If you are interested in writing for us, please let us know and we will provide you with more information on how to get started. We would be honored to have you as part of our community and can't wait to see the amazing content you will create. To write another article. Click on <a href='https://writeup.vercel.app/create'>Write a post </a> </p> <br> <p style='font-family: Outfit; font-size: 1.5em;' >Thank you for considering this opportunity. We look forward to hearing back from you soon.</p>  <p> Best regards, <br>
           ${req.body.name}"`
          }

       let messageId =  await  (await transporter.sendMail(message)).messageId
        console.log(`An E-mail has been sent to: ${req.body.email} with message id: ${messageId}`)
      
       }
    })
})

// Tags Generator
app.post('/api/ai/generateTag', async(req,res) => {
    const content = req.body.content
    const title = req.body.title
    // axios.post
})


/**
 CRUD OPERATIONS FOR POSTS (DRAFTS AND PUBLISHED) HERE
 */
app.delete('/draft/:draftId', verify, async(req,res) => {
    DraftPosts.findOneAndDelete({draftId: req.params.draftId}, (err,doc) => {
        if(err){throw err}
        if(doc){res.send({status:200})}
    })
})
app.put('/draft/:draftId', verify, async(req,res) => {
    console.log(req.body)
    DraftPosts.findOneAndUpdate({draftId: req.params.draftId}, req.body, (err,doc) => {
     if(err){throw err}
     if(doc){ res.send({status:200})}
    })
})

app.post('/post/draft', verify, async(req,res) => {
    let draftedBefore;
    console.log(req.body)
    let quality = false
    // if(quality){
    
    DraftPosts.find({author: req.user._id}, (err,doc) => {
        if(err){throw err}
        if(doc){
            if(doc.length > 0){
                draftedBefore = true
            } else {
                draftedBefore = false
            }
        }
    })
    let {title,body,tags,coverImageURL, withExcerpt,draftId, collaborators} = req.body
    if(tags !== undefined){
        tags = tags.split(' ')
    }
    const avgWPM = 250;
    let words = body.split(' ').length       
    let minutes = Math.ceil(words/avgWPM)
    let readingTime = `${minutes} mins read`
    const draftPosts = new DraftPosts({
        title: title,
        body:  body,
        tags:tags,
        draftId: draftId,
        coverImageURL: coverImageURL,
        author: req.user._id,
        created: moment(),
        withExcerpt: withExcerpt,
        readingTime: readingTime,
        collaborators: collaborators,
    })
    await draftPosts.save()
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
            user: 'inkup1024@gmail.com',
            pass: 'zyghrqwepszerctl'
            
        },
        tls: {
  rejectUnauthorized: false
}
    
    
      })

      let message = {
        from: "'Inkup' <Inkup1024@gmail.com>", //my email address
        to: `${req.user.email}`,
        subject: `Your post, ${title} has been saved as Draft. Let\'s Keep the Momentum Going.`,
        text: `${title} saved`,
        attachment: [{
            filename: 'inkup.png',
            path: '/inkup.png',
            cid: 'inkup.png'
        }],
        html: ` <p style='font-family: Outfit; font-size: 1.5em;'> <br> We want to personally congratulate you on your ${draftedBefore == false ?  'First Draft!' : 'Successful Draft'} on Inkup Let\'s Keep the Momentum Going. It was a pleasure to see you again and it’s great to see the insights and perspective that you have prepared for our community. Your article will gain a lot of positive feedback and engagement from our readers. </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> We know that writing can be a challenging process, but we wanted to encourage you to continue sharing your ideas and knowledge with us. We believe that you are gifted and special to our community and we would love to see more of your work on our platform. </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> As a writer on Inkup, you have access to a creative set of people in our community of fellow writers and readers who appreciate and enjoy your  quality content. By publishing more articles, you will have the opportunity to gain more exposure, connect with more people, and further establish yourself as an expert in your field, that's is why it is neccessary to take your time to draft your ideas and knowledge before showing it to the world</p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> Please let us know if you need any support, guidance or feedback to get started on your next article. We are here to help you succeed and grow as a writer. To publish again article. Click on <a href='https://writeup.vercel.app/create'>Write a post </a> </p> <br> <p style='font-family: Outfit; font-size: 1.5em;' >Thank you again for your contribution to our platform. We are excited to see what you will create next.</p>  <p> Best regards, Inkup <br>
       ${req.user.name}"`
      }

   let messageId =  await  (await transporter.sendMail(message)).messageId
    
    DraftPosts.find({draftId: req.body.draftId}).populate('author').exec((err,doc) => {
        if(err){throw err}
        if(doc){
            res.send({message:"Drafted", data: doc[0]}).status(200)
        }
    })
// }  else {
//     res.send({message: 'Your Content contains junk contetnt. Please revised and check again'})
// }
})

app.delete('/draft/:id', verify, (req,res) => {
    DraftPosts.deleteOne({draftId: req.params.id },{new:true},(err,doc) => {
        if(err){throw err} 
        if(doc) {
            res.send({status: 200, data:{doc}})
        }
    })
})

app.delete('/post/:id', verify, (req,res) => {
    PublishedPosts.deleteOne({postId:req.params.id}, (err,doc) => {
        if(err){throw err}
        if(doc){
            res.send('Content successfully deleted').status(200)
        }

    })
})

//Update Poll
app.put('/reels/poll/:id', verify, async(req,res) => {
    reels.findOneAndUpdate({reelId: req.body.reelId}, req.body,{new:true}, (err,doc)=> {
        if (err) {
            throw err;
        } 
        if(doc){
             res.send({status:200 , data: doc})
        }
    })
})

/** CRUD Operation for Reels */
app.post('/reels/create', verify, async(req,res) => {
    
 let modOptions = []
 req.body.options.map((option) => {
    modOptions.push({pollname: option, vote: 0})
 })
 let newReels = new reels({
    verifiedAuthor: req.user.verified,
    authorPremiumPlan: req.user.premiumPlan,
    authorId: req.user._id,
    created: moment(),
    text: req.body.text,
    options: modOptions,
    tags: req.body.tags,
    type: req.body.type,
    reelId: req.body.reelsId,
    reelImageURL: req.body.reelImageURL

 })
//  User.findOneAndUpdate({email: email}, {$set :{lastPosted: new Date}}, (err,doc) => {
//     if(err){
//         throw err
//     }
//     if(doc){
//         console.log(doc)
//     }
// })
})

app.post('/post/create', verify, async(req,res) => {
    let publishedBefore;
    PublishedPosts.find({author: req.user._id}, (err,doc) => {
        if(err){throw err}
        if(doc){
            if(doc.length > 0){
                publishedBefore = true
            } else {
                publishedBefore = false
            }
        }
    })
    let {title,body,tags,coverImageURL,withExcerpt, postId} = req.body
    console.log(req.body)
     tags  = tags.split(' ')
    
        const avgWPM = 250;
        let words = body.split(' ').length
       
        let minutes = Math.ceil(words/avgWPM)
       
        let readingTime = `${minutes} mins read`
         
  
    const publishedPosts = new PublishedPosts({
        verifiedAuthor: req.user.verified,
        authorPremiumPlan: req.user.premiumPlan,
        postId: postId,
        title: title,
        body:  body,
        tags:tags,
         coverImageURL: coverImageURL,
        author: req.user._id,
        created: moment(),
        withExcerpt: withExcerpt,
        readingTime: readingTime
        
    })
   await  publishedPosts.save()
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
            user: 'inkup1024@gmail.com',
            pass: 'zyghrqwepszerctl'
            
        }
    
    
      })
      const  {username,name,email} = req.user

      let message = {
        from: "'Inkup' <Inkup1024@gmail.com>", //my email address
        to: `${req.user.email}`,
        subject: ` Congratulations on Your ${publishedBefore == true ? 'Successful Post': 'First Article!'} Let\'s Keep the Momentum Going.`,
        text: 'Article Published',
        attachment: [{
            filename: 'inkup.png',
            path: '/inkup.png',
            cid: 'inkup.png'
        }],
        html: ` <p style='font-family: Outfit; font-size: 1.5em;'>Welcome to Inkup</p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> Join our community of writers and showcase your skills!. </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> <br> Dear  ${name}, <br> We want to personally congratulate you on your ${publishedBefore == false ?  'First Article!' : 'Successful Post'} on Inkup Let\'s Keep the Momentum Going. It was a pleasure to read and it’s great to see the insights and perspective that you have shared with our community. Your article has already gained a lot of positive feedback and engagement from our readers. </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> I know that writing can be a challenging process, but I wanted to encourage you to continue sharing your ideas and knowledge with us. We believe that your voice is unique and valuable, and we would love to see more of your work on our platform. </p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> As a writer on Inkup, you have access to a supportive community of fellow writers and readers who appreciate and enjoy quality content. By publishing more articles, you will have the opportunity to gain more exposure, connect with more people, and further establish yourself as an expert in your field</p> <br> <p style='font-family: Outfit; font-size: 1.5em;'> Please let us know if you need any support, guidance or feedback to get started on your next article. We are here to help you succeed and grow as a writer. To publish again article. Click on <a href='https://writeup.vercel.app/create'>Write a post </a> </p> <br> <p style='font-family: Outfit; font-size: 1.5em;' >Thank you again for your contribution to our platform. We are excited to see what you will create next.</p>  <p> Best regards, <br>
       ${name}`
      }

   let messageId =  await  (await transporter.sendMail(message)).messageId
    console.log(`An E-mail has been sent to: ${email} with message id: ${messageId}`)
   
    User.findOneAndUpdate({email: email}, {$set :{lastPosted: new Date}}, (err,doc) => {
        if(err){
            throw err
        }
        if(doc){
            console.log(doc)
        }
    })
    PublishedPosts.find({postId: req.body.postId}).populate('author').populate('likes').populate('bookmarks').populate('comments.user').exec((err,doc) => {
        if(err){throw err}
        if(doc){
            res.send({status:"Published", data: doc[0]})
        }
    })

    


})




app.get('/post/:username/:postId',  (req,res) => {
    let {username,postId} = req.params
    console.log(req.params)
    username = username.split('@')[1]
     PublishedPosts.find({postId: postId}).populate('author').populate('likes').populate('bookmarks').populate('comments.user').exec((err,doc) => {
        if (err) {
            throw err
        }
        if(doc){
           
        if (doc[0].author.username == username) {
            
        }
                  res.send(doc[0])
              
        
        }
    })
})
app.get('/api/user')
app.post('/post/viewed', verify, (req,res) => {
    let viewers = [], views;
   PublishedPosts.find({postId: req.body.postId}).select('views viewedBy').exec((err,doc) => {
     viewers = doc[0].viewedBy
     views = doc[0].views
     views += 1;
     if(viewers.indexOf(req.user._id) == -1){
            PublishedPosts.findOneAndUpdate({postId: req.body.postId}, {$push: {viewedBy: req.user._id}, views: views}, {new: true}, (err,doc) => {
          if(err){
            throw err
          }
            })
     }
     
   }) 

})

app.get('/post/getAuthorPosts/:username/:postId', (req,res) => {
    PublishedPosts.find({username: req.params.username, postId: {$ne: req.params.postId}}).populate('author').exec((err,doc) => {
        if (err) {
            throw err
        }
        if (doc) {
            console.log(doc)
            res.send(doc)
        }
    })
})

app.get('/api/user/findCollaborators/:username', (req,res) => {
 console.log(req.params.username)
    User.find({username : {$regex:'^'+ req.params.username, $options: 'i'}}, (err,users) => {
        if(err){ throw err;
        }else {
            console.log(users)
        res.send(users)
        }
})
})

app.get('/api/tags', (req,res) => {
    PublishedPosts.find().select('tags title').exec((err,doc) => {
        if (err) {
            throw err
        }   
        if (doc) {
            res.send(doc)
        }
    })
})

app.post('/api/search', (req,res) => {
   

    
   let tags = []
    PublishedPosts.find({title : {$regex: '^'+ req.body.query, $options: 'i'}}).populate('author').exec((err,post) => {
      if(err){ 
        throw err
      } if(post) {
        User.find({name : {$regex:'^'+ req.body.query, $options: 'i'}}, (err,user) => {
            if(err){ 
              throw err
            } if(user){
           PublishedPosts.find({tags:  {$in : `#${req.body.query}`} },(err,doc) => {
               if(err){throw err}
               if(doc){
                doc.forEach((post) => {
                  post.tags.map(tag=> {
                    if(tags.indexOf(tag) == -1){
                        tags.push(tag)
                    }
                  })
                })
                res.send({post:post,user:user,tags:tags})
            }
           })
            
           
            }
          })
      
      }
    })
  
 
  
})

app.get('/api/bookmarked',verify, (req,res) => {
    PublishedPosts.find().select('bookmarks title tags viewedBy comments likes created  author postId').where('bookmarks').equals(req.user._id).populate('author').exec((err,doc) => {
        if (err) {
            throw err
        }   
        if (doc) {
            res.send(doc)
        }
    })
})
app.post('/api/tags/follow', verify, (req,res) => {
    User.findOneAndUpdate({email: req.user.email}, {$push: {followingTags: req.body.tag}},{new:true},(err,doc) => {
    if(err){
        throw err;
    }else {
        res.send(doc)
    }
   })
})
app.post('/api/tags/unfollow', verify, (req,res) => {
   User.findOneAndUpdate({email: req.user.email}, {$pull: {followingTags: req.body.tag}},{new: true},(err,doc) => {
    if(err){
        throw err;
    } else {
        res.send(doc)
    }
   })
})

app.get('/api/tags/:name', (req,res) => {
    res.setHeader("Access-Control-Allow-Credentials","true")
    console.log(req.params.name)
    PublishedPosts.find({tags: {$in: `#${req.params.name}`}}).populate('author').exec((err,doc) => {
      if(err){
        throw err
      } if (doc) {
        res.send(doc)
       
      }
    })
})
app.get('/api/posts',  (req,res) => {
    res.setHeader("Access-Control-Allow-Credentials","true")
     PublishedPosts.find().populate('author').populate('likes').populate('bookmarks').populate('comments.user').populate('collaborators').exec((err,doc) => {
       if (err) {
           throw err
       }
       if(doc){
         res.send(doc)
       
       }
   })
  
  
})
app.get('/api/posts/personalised', verify, (req,res) => {
    let userPersonalised = []
    res.setHeader("Access-Control-Allow-Credentials","true")
    console.log(followingTagsPosts(req.user.followingTags))
    console.log(followingUserPosts(req.user.following))
    
  
  
})

app.post('/post/like', verify, (req,res) => {
    
   PublishedPosts.findOne({postId: req.body.postId}).select('likes').exec((err,doc) => {
    if (err) {throw err  }
    if (doc) {
      
        
      if(   doc.likes.indexOf(req.user._id) == -1){
        PublishedPosts.findOneAndUpdate({postId: req.body.postId},{$push: {likes: req.user._id}}, {new:false}, (err,doc) => {
            if (err) {
                throw err
            } if(doc){
         
            }
            PublishedPosts.find({postId: req.body.postId}).populate('likes').populate('author').exec((err,populatedDoc) => {
            if (err) {
                throw err
            }
            if (populatedDoc) {
                res.send(populatedDoc[0])
            }
            
        })
    
        })
      }

     }
   }) 
  
})
app.post('/post/comment', verify, (req,res) => {
    PublishedPosts.findOneAndUpdate({postId: req.body.postId},{$push: {comments: [{user: req.user._id, message: req.body.comment}] }}, {new:true}, (err,doc) => {
        if (err) {
            throw err
        } 
        PublishedPosts.find({postId: req.body.postId}).populate('likes').populate('author').populate("comments").exec((err,populatedDoc) => {
        if (err) {
            throw err
        }
        if (populatedDoc) {
          res.send(populatedDoc)
        }
        
    })
    })
})
app.get('/api/user/verified/:id',(req,res) => {
    User.findById(req.params.id).select("verified").exec((err,doc) => {
        if(err){throw err}
        if(doc){
            res.send(doc.verified).status(200)
        }
    })
})

app.post('/post/unlike', verify, (req,res) => {
    PublishedPosts.findOneAndUpdate({postId: req.body.postId},{$pull:{likes: req.user._id}}, {new:false}, (err,doc) => {
        if (err) {
            throw err
        }
        PublishedPosts.find({postId: req.body.postId}).populate('likes').populate('author').exec((err,populatedDoc) => {
        if (err) {
            throw err
        }
        if (populatedDoc) {
            res.send(populatedDoc[0])
        }
        
    })
    })
})

app.post('/post/bookmark', verify, (req,res) => {
    console.log(req.body.postId);
    console.log(req.user._id);
    PublishedPosts.findOne({postId: req.body.postId}).select('bookmarks').exec((err,doc) => {
        if (err) {throw err  }
        if (doc) {
            
          if(doc.bookmarks.indexOf(req.user._id) == -1){
    PublishedPosts.findOneAndUpdate({postId: req.body.postId},{$push: {bookmarks: req.user._id}}, {new:false}, (err,doc) => {
        if (err) {
            throw err
        }
        PublishedPosts.find({postId: req.body.postId}).populate('likes').populate('bookmarks').populate('author').exec((err,populatedDoc) => {
        if (err) {
            throw err
        }
        if (populatedDoc) {
            res.send(populatedDoc[0])
        }
        
    })
    })
}
}
})
})
app.post('/post/unbookmark', verify, (req,res) => {
    console.log(req.body.postId);
    console.log(req.user._id);
    PublishedPosts.findOneAndUpdate({postId: req.body.postId},{$pull: {bookmarks: req.user._id}}, {new:false}, (err,doc) => {
        if (err) {
            throw err
        }
        PublishedPosts.find({postId: req.body.postId}).populate('likes').populate('bookmarks').populate('author').exec((err,populatedDoc) => {
        if (err) {
            throw err
        }
        if (populatedDoc) {
            res.send(populatedDoc[0])
        }
        
    })
    })
})

app.post('/api/publicPicture', async(req,res) => {
    let pictureBuffer = await (await axios.get(req.body.public_picture,{ responseType: 'blob',
       
    })).data
     
        res.send(pictureBuffer)
})

app.get('/api/user/:username',(req,res) => {
    User.find({username:req.params.username}).populate('followers').populate('following').populate('followingTags').exec((err,doc) => {
        if(err){throw err}
        if(doc && doc.length > 0){res.send(doc[0])}else{
            res.send('null')
        }
    })
})
app.get('/api/posts/:username',(req,res) => {
 User.find({username:req.params.username}).select('id').exec((err,doc) => {
  if(err){throw err}
  if(doc && doc.length > 0){
    const userId = doc[0].id
    PublishedPosts.find({author:userId}).populate('author').populate('likes').populate('collaborators').populate('comments').populate('bookmarks').exec((err,doc) => {
        if(err){throw err}
        if(doc){res.send(doc)}
    })
  } else {
    res.send('null')
  }
   })

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
app.get('/api/user/posts/my', verify, (req,res) => {
    
    PublishedPosts.find({author: req.user._id}, (err,doc) => {
        if(err){throw err}
        if(doc){
            console.log(doc)
            res.send(doc)
        }
    })

})
app.get('/api/user/posts/collaborated', verify, (req,res) => {
    DraftPosts.find({collaborators: {$in: req.user._id}}).populate('author').exec((err,doc) => {
        if(err){throw err}
        if(doc){
            res.send(doc); 
           
        }
    })
})

app.get('/api/user/posts/drafts', verify, (req,res) => {
    
    DraftPosts.find({author: req.user._id}, (err,doc) => {
        if(err){throw err}
        if(doc){
            console.log(doc)
            res.send(doc)
        }
    })
})
app.get('/api/user/drafts/:draftId', verify, (req,res) => {
    
    DraftPosts.find({draftId: req.params.draftId}).populate('collaborators').exec((err,doc) => {
        if(err){throw err}
        if(doc){
            console.log(doc)
            res.send(doc[0])
        }
    })
})
app.get('/api/user/posts/totalLikes', verify, (req,res) => {
    let totalLikes = 0;
    PublishedPosts.find({author: req.user._id}, (err,posts) => {
        if(err){throw err}
        if(posts){
          posts.forEach((post) => {
            totalLikes += post.likes.length 
          })
          res.send({totalLikes})
        }
    })
})
app.get('/api/user/posts/totalComments', verify, (req,res) => {
    let totalComments = 0;
    PublishedPosts.find({author: req.user._id}, (err,posts) => {
        if(err){throw err}
        if(posts){
          posts.forEach((post) => {
            totalComments += post.comments.length 
          })
          res.send({totalComments})
        }
    })
})
app.get('/api/user/posts/totalBookmarks', verify, (req,res) => {
    let totalBookmarks = 0;
    PublishedPosts.find({author: req.user._id}, (err,posts) => {
        if(err){throw err}
        if(posts){
          posts.forEach((post) => {
            totalBookmarks += post.bookmarks.length 
          })
          res.send({totalBookmarks})
        }
    })
})



connectToMongooseDB()

// User.updateMany({}, {$set: {lastActiveNotified: '', lastPostedNotified: ''}}).then(result => {
//     console.log(`Updated ${result.upsertedCount} documents`)
// }).catch(err => {
//     console.log(err)
// })

// PublishedPosts.updateMany({}, {$set: {verifiedAuthor: false, authorPremiumPlan: 'free', collaborators:[], }}).then(result => {
//     console.log(`Updated ${result.upsertedCount} documents`)
// }).catch(err => {
//     console.log(err)
// })
// notifications.updateMany({}, {$set: {actionUserVerified: false, }}).then(result => {
//     console.log(`Updated ${result.upsertedCount} documents`)
// }).catch(err => {
//     console.log(err)
// })

mongoose.connection.once("open", () => {
    console.log("Connected to Mongodb")
})


server.listen("5000",() => {
    console.log("Server is listening at PORT 5000")
})
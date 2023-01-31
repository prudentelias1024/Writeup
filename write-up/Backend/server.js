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


//Routes Middlewares
app.post('/login' ,(req,res) => {
    console.log(req.body)
})
app.post('/register' ,(req,res) => {
    console.log(req.body)
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
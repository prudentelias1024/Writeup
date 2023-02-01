const User = require('./usersSchema')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.use(new localStrategy((email,account_type,done)=> { //Passes Username and Account_type to Passport
        
        User.find({email:email}, (err,user) => {
            console.log(user)
            if(!user){
               return done(null,false)
            }
            if(err){
                throw err;
            }
            if (user) {
                if(user.account_type == account_type){
                    return done(null,user)
                } else {
                    return done(null,false)
                }
             
              
            }
           })
    })),
    passport.serializeUser((user,cb) => {//Stores a cookie to the browser
        cb(null,user.id)
    })
    passport.deserializeUser((id,cb) => {
        User.findOne({_id: id}, (err,user) => {
            cb(err,user);
        })
    })
}
const loginAPI = require('express').Router()
loginAPI.post('/',(req,res) => {
    res.send("Hi")
})
const e = require('express')
const mysql = require('mysql')
let pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: '',
    database: 'Inkup',
    connectionLimit: 3
})

pool.getConnection((err,connection) => {
    if(!err){
        console.log('Connected Succesfully to inkup using Thread Id:'+ connection.threadId)
    } else {
        console.log(err)
    }
})
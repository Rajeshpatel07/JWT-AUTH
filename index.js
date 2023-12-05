require('dotenv').config()
const express=require('express');
// const jwt=require('jsonwebtoken');
const routes=require('./src/routes/routes');
const server=express()


const cookieparser=require('cookie-parser');
server.use(cookieparser())

server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use(express.static('public'))

server.set('view engine','ejs');

server.use(routes);

//Demo of using cookie-parser
// server.get('/setcookie',(req,res)=>{

//     res.cookie('name',true,{httpOnly:true});

//     res.send("Cookie is set..")
// })


// server.get('/read-cookie',(req,res)=>{
//     const cookies=req.cookies;
//     console.log(req.cookies)

//     res.json(cookies)
// })

server.listen(process.env.PORT)
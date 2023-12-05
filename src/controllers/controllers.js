const { Error } = require('mongoose');
const users=require('../models/users');

const jwt= require('jsonwebtoken');


const handleError=(err)=>{
    // console.log(err.message,err.code) //printing the error message and code
    let error={email:'',password:''}; //creating a object

    
    //Handling unique email error See the model/user.js
    if(err.code===11000){
        error.email='The username is already registered'
        return error;
    }

    //Login route error handle
    if(err.message=='The Email is not Registered'){
        error.email='The Email is not Registered'
        return error;
    }
    //Login route error handle
    if(err.message=='Incorrect Password'){
        error.password='Incorrect Password'
        return error;
    }


    //Inside err object 
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{  //inside err objects--> properties

            //in error object properties.path means the same in error object
            //properties.message is the message which will store inside the error object
            error[properties.path]=properties.message;
        })
    }

    return error
}

function token(id){
    return jwt.sign({id:id},process.env.SECRET_KEY);
}

//GET Request..
const homepage=(req,res)=>{
    res.render('home');
}

//GET Request..
const signup_get=(req,res)=>{
    res.render('signup');
}

//GET Request..
const login_get=(req,res)=>{
    res.render('login');
}

//POST Request..
const signup_post=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await users.create({
            email:email,
            password:password
        })

        res.json({user:user._id});
    }catch(err){
        const errors=handleError(err); //calling the function.
        res.json({errors})

    }
}

//POST Request..
const login_post=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await users.login(email,password);
        const accesstoken=token(user._id);
        res.cookie('jwt',accesstoken,{httpOnly:true});
        res.json({user:user._id})
    }catch(err){
        const errors=handleError(err);
        // console.log(errors);
        res.json({errors});
    }
}

const logout=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}


const welcome=(req,res)=>{
    res.render('welcome');
}

module.exports={homepage,signup_get,login_get,signup_post,login_post,welcome,logout};
const Router = require('express').Router();
const User = require('../Schema/user.schema');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const { set } = require('mongoose');
require('dotenv').config();

Router.post('/signup',async (req,res)=>{
    const {email,password,username} = req.body;

   try{
       //validation
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            throw 'invalid email!';
        }
        if(!email.length || !password.length){ //0 - false any - true
            throw 'Please enter email and password!';
        }
        //encypting password.
        let encrpytedPassword = bcrypt.hashSync(password,10);
        //storing in database        
        let newUser = new User({
            email:email,
            password:encrpytedPassword,
            username:username
        })

        let data = await newUser.save();
        
        res.status(200).json({
            message:"Your account is created!",
            user:data
        })

   }catch(e){
       res.status(401).json({
           error:e
       })
   }
})

Router.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    try{
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            throw 'invalid email!';
        }
        if(!email.length || !password.length){ //0 - false any - true
            throw 'Please enter email and password!';
        }
        const user = await User.findOne({email:email});

        if(!user){
            throw 'Invalid email! please create your account.'
        }

        let isCorrectPass = await bcrypt.compare(password, user.password);

        if(!isCorrectPass){
            throw 'Incorrect password!'
        }
        
        //generating token for user verifications.
        let token = jwt.sign({
          email,
          id:user._id
        },process.env.SECRET) // getting the secret from .env file

        //let data = jwt.verify(token,process.env.SECRET)
        res.status(200).json({
            message:"You are signed in successfully!",
            token
        })

    }catch(e){
        res.status(401).json({
            error:e
        })
    }
})

module.exports = Router;
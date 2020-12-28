const Router = require('express').Router();
const verifyLogin = require('../middlewares/verifyLogin');
const News = require('../Schema/news.schema');
const Subs=require('../Schema/user.schema')

Router.get('/',async (req,res)=>{
    let news = await News.find({});
    res.status(200).json({
        message:'these are all news',
        posts:news
    })
})
Router.get('/users',async(req,res)=>{
    let data=await Subs.find({})
    res.status(200).json({
        Users_data:data
    })
})

Router.post('/post',verifyLogin, async (req,res)=>{
    try{
        const {title,url} = req.body;
        //validations

        //saving in database
        let news = new News({
            title,
            url,
            author:req.user.username
        })

        let savedNews = await news.save();

        res.status(200).json({
            message:"news has been posted!",
            post:savedNews
        })

    }catch(e){
        res.status(402).json({
            message:"Some error occured while posting news!",
        })
    }
})

Router.post('/upvote/:id',verifyLogin,async(req,res)=>{
    try{
        
        let id=req.params.id;
        let post=await News.findOne({_id:id})
        if(post.upVotedBy.includes(req.user._id)){
            throw "already voted can't vote again"
        }
        await News.findOneAndUpdate({_id:id},{ upvotes:post.upvotes+1,$push:{ upVotedBy: req.user._id }})
        post=await News.findOne({_id:id})
        res.status(200).json({
            message:"upvotes have been updated",
            post:post
        })
       
    }catch(e){
            res.status(400).json({
                message:"unable to vote",
                error:e
            })
        }
    
})

module.exports = Router;
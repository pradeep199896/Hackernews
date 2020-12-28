const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required'],
        unique:true
    },
    url:{
        type:String,
        required:[true,'url is required']
    },
    upvotes:{
        type:Number,
        default:0
    },
    author:{
        type:String,
        required:[true,"author is required!"]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    upVotedBy:{
        type:Array,
        default:[]
    }
})

const News = mongoose.model('News',newsSchema);


module.exports = News;


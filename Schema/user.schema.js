const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    username:{
        type:String,
        default:"default_user"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model('User',userSchema);//creates collection

module.exports = User;


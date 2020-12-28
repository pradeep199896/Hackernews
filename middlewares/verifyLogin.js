const jwt = require('jsonwebtoken');
const User = require('../Schema/user.schema');
require('dotenv').config();

const verifyLogin = async (req,res,next)=>{
    let token = req.header('auth');
    try{
        if(!token) throw 'No token provided!';

        const user = jwt.verify(token,process.env.SECRET);
        // user{
        //     email:"sadsa",
        //     _id:'sadsd'
        // }
        if(!user) throw 'invalid token!';

        let userFromDatabase = await User.findOne({email:user.email});
        if(!userFromDatabase) throw 'user not found!';
        req.user = userFromDatabase;
        next();

    }catch(e){
        
        res.status(401).json({
            message:"You are not logged in!",
            error:e
        })
    }
}

module.exports = verifyLogin;

// let data = {
//     id:1
// }
// console.log(data);

// data.name ='name';

// data = {
//     id:1,
//     name:'name'
// }
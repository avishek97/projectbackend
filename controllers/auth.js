const User = require("../models/user")
const {check, validationResult}=require('express-validator')
var jwt=require('jsonwebtoken')
var expresssJwt=require('express-jwt')


exports.signout=(req,res)=>{
    res.clearCookie("token"),
    res.json({message:"signout is confirmed"})

}
exports.signup=(req,res)=>{
   const errors=validationResult(req)
   if(!errors.isEmpty()){
       return res.status(422).json({
           err:errors.array()[0].msg
       })
   }

    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
           return res.status(400).json({err:"error while saving"})
        }
        return res.json(user)
    })
}



exports.signin=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            err:errors.array()[0].msg
        })
    }
    const {email,password}= req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.json({err:"Email not found"})
        }
        if(!user.autheticate(password))
        {
            return res.json({err:"password thik nhi h bhai"})
        }
        const token=jwt.sign({_id:user._id},process.env.SECRET)
        // put token into cookie
        res.cookie("token",token,{expire: new Date + 9999})
    
       const {_id,name,email,role}=user;
       res.json({token,user:{_id,name,email,role}})
    })
    // creating token
   
}

// JWT is a self compacted way of securely transfer of information between parties as a json
// This information can be verified and trusted because it is digitally signed. JWTs can be
//  signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

//  jwt consist of three parts 1. Header 2. payload 3.signature
//  Header contains two parts type of token i.e., JWT and algo
// of the token i.e., SHA256

// payload it consist of claims of entity or data

// signature encode the header,encode the payload,encode the type algo together

// HMACSHA256(
//   base64UrlEncode(header) + "." +
//   base64UrlEncode(payload),
//   secret)


// protected routes

exports.isSignedIn=expresssJwt({
    secret:process.env.SECRET,
     userProperty: "auth"           // we can use anythings in place of auth.
    //  this user property contain the _id of the user
    
})

// express-jwt is used to decode the payload available on request via userProperty
// its give the id of the user which is farther used for verification purpose

// custom routes

exports.isAuthentication=(req,res,next)=>{
    let cheaker= req.profile && req.auth && req.auth._id == req.profile._id;
    if(!cheaker)
    {
        return res.status(403).json({
            error:"ACCESS DENIED!"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0)
    {
        return res.status(403).json({
            error:"You are not Admin, access denied"
        })
    }
    next();
}


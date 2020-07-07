const mongoose = require('mongoose')
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        maxlengh:25
    },
    lastname:{
        type:String,
        trim:true,
        maxlengh:25
    },
    email:{
        type:String,
        trim:true,
        require:true,
        // unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    // TODO: come back here
    encry_password:{
        type:String,
        // require:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps:true})

userSchema.virtual("password")
    .set(function(password){
        this._password=password
        this.salt=uuidv1()
        this.encry_password= this.securePassword(password)
    })
    .get(function(){
        return this._password
    })
    
userSchema.methods = {
    autheticate: function(plainpassword){
       return this.securePassword(plainpassword)===this.encry_password;
    },
    securePassword : function(plainpassword){   // may not understnd the arrow func.
        if(!plainpassword) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch(err){
            return "";
        }

    }
}

module.exports = mongoose.model("User", userSchema);

// sha256 is a popular hashing algorithm
// crypto.createHmac(algorithm,key)
//  by using sha256 algorith createHmac create the hash object with key and msg which is 
// there inside the .update("")
// this together will form encrypted password which is than saved into Database
// https://www.youtube.com/watch?v=emBgrRIyyWQ&t=141s for diagrametic knowledge go to this YT link :)
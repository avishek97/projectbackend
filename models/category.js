const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        required:true
    }
},{timestamps:true}) // timestamps record the time when its created or updated!!

module.exports = mongoose.model("Category", categorySchema)
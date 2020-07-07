const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,

    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength: 1000,
    },
    price:{
        type:Number,
        required:true,
        maxlength:20
    },
    category:{
        type: ObjectId,
        ref: "Category",
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data: Buffer,
        contentType:String
    }
    // TODO: Need to add the size once i know how to use this.
}, {timestamps:true})

module.exports = mongoose.model("Product", productSchema)
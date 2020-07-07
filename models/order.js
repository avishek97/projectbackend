const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
// Cart 
const ProductCartSchema = new mongoose.Schema({
  product:{
    type:ObjectId,
    ref: "Product"
  },
  name:String,
  count:Number,
  price:Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

const orderSchema = new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address: String,
    status:{
      type:String,
      default:"Received",
      enum:["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    update:Date,
    user:{
        type:ObjectId,
        ref: "User"
    }

},{timestamps:true})
const Order = mongoose.model("Order", orderSchema)

module.exports = {Order, ProductCart}
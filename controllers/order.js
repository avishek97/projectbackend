const {Order,ProductCart} = require('../models/order');


exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order)=>{
        if(err){
            return res.json({error:"No order found in DB"})
        }
        req.order=order;
        next();
    })
}
exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile
    order.save((err,order)=>{
        if(err){
            return res.json({error:"fail to createOrder"})
            
        }
        res.json(order)
    })
}

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.json({error:"No orders found"})
        }
        res.json(order)
    })

}

exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus=(req,res)=>{
    Order.update(
        {_id:req.body._id},
        {$set:{status:req.body.status}}
    ),
    (err,order)=>{
        if(err){
            return res.json({error:"cannot update order"})
            
        }
        res.json(order)
    }
}
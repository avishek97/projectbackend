const Product=require('../models/product')
const mongoose=require('mongoose')
const formidable=require('formidable')
const _ =require('lodash')
const fs=require('fs')
const product = require('../models/product')
const { parseInt } = require('lodash')

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,prod)=>{
        if(err)
        {
            return res.json({error:"Product not found"})
        }
        req.product=prod;
        next();
    })
}

exports.createProduct=(req,res)=>{
    let form= new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.json({error:"Problem in image"})
        }
        const {name,description,price,category,stock}=fields;

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.json({err:"please include all the fields"})
        }

        let product=new Product(fields)

        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.json({error:"photo is too big to be uploaded"})
            }
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
            console.log(product);
        }

        product.save((err,product)=>{
            if(err){
                return res.json({error:"photo failed to upload"})
            }
            return res.json(product)
        })
    })
}

exports.getProduct=(req,res)=>{
    req.product.photo= undefined
    return res.json(req.product)
}

// middleware 
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("content-type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.updateProduct=(req,res)=>{
    let form= new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.json({error:"Problem in image"})
        }
       ;

        // updation code    
        let product= req.product
        product= _.extend(product,fields)

        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.json({error:"photo is too big to be uploaded"})
            }
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
            console.log(product);
        }

        product.save((err,product)=>{
            if(err){
                return res.json({error:"updation fail"})
            }
            return res.json(product)
        })
    })

}

exports.deleteProduct=(req,res)=>{
    let product = req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.json({error:"failed to delete the product"})
        }
        return res.json({message:`${deletedProduct} is deleted`})
    })
}


exports.getAllProducts=(req,res)=>{
   let limit=req.query.limit ? parseInt(req.query.limit) : 8
   let sortBy = req.query.limit ? req.query.limit : "_id"
    Product.find()
    .select('-photo')
    .populate("category")
    .limit(limit)
    .exec((err,product)=>{
        if(err){
            return res.json({error:"failed to show product"})
        }
        return res.json(product)
    })
}
//  Bulkwrite use to perform an operation in bulk 
// which mostly consist of updatation 
// updateStock here used to update the stock and
// sold on purchase of any item.
// bulwrite takes 3 param 1. operation to be performed
// 2. contains optional part which are genarally boolean
// which mean if true then perform that else not
// 3. constains callback (err,operationResult)
exports.updateStock=(req,res)=>{

    let myOperation=req.body.order.product.map(prod=>{

        return{
            updateOne:{
                filter: {_id : prod._id},
                update: {$inc: {stock: -prod.count,sold:+prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperation, {}, (err,product)=>{
        if(err){
            return res.json({error:"Bulk operation failed"})
        }
        next()
    })
}

exports.getAllUniqueCategories=(req,res)=>{
    // distinct select and give the output based of first param
    // sec param contain options based on which we wanna show the mess
    // third is call back 
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.json({error:"No category found"})
        }
        res.json(category)
    })
}
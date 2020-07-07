const Category=require('../models/category')

exports.getCategoryById=(req,res,next,id)=>{
    
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({err:"category not found"})
        }
        req.category=cate;
    })
    
    next();
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body)
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"No being able to save"
            })
        }
        res.json({category})
    })

}

exports.getCategory=(req,res)=>{
    return res.json(req.category)
}


exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,cate)=>{
        if(err){
            err:"cannot able to find category"
        }
        return res.json(cate)
    })
}

exports.updateCategory=(req,res)=>{
    const category=req.category
    category.name=req.body.name

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({err:"Category not updated"})
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory=(req,res)=>{
    const category=req.category
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({err:"Category not deleted"})
        }
        res.json({message:`category deleted ${category.name}`})
    })
}
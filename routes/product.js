const express= require('express');
const router=express.Router()
const {getUserById}=require('../controllers/user')
const {isAdmin,isAuthentication,isSignedIn}=require('../controllers/auth')
const {getProductById,createProduct,getProduct, photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories}=require('../controllers/product')

// routes to get the product and user ID
router.param('userId',getUserById)
router.param('productId',getProductById)
// to create the product
router.post('/product/create/:userId',isSignedIn,isAdmin,isAuthentication,createProduct)
// To delete the product
router.delete('/product/:productId/:userId',isSignedIn,isAdmin,isAuthentication,deleteProduct)
// To update the product
router.put('/product/:productId/:userId',isSignedIn,isAdmin,isAuthentication,updateProduct)
// To get a particular product
router.get('/product/:productId',getProduct)
router.get('/product/photo/:productId',photo)
// To list all the product
router.get('/product',getAllProducts)
router.get('/product/categories',getAllUniqueCategories)
module.exports=router
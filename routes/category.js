const express=require('express')
const router=express.Router()
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory}=require('../controllers/category');
const {getUserById}=require('../controllers/user');
const {isAdmin,isSignedIn,isAuthentication}=require('../controllers/auth');

// params here
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

// actual route
router.post("/category/create/:userId",isSignedIn,isAuthentication,isAdmin,createCategory)
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)
router.put("/category/:categoryId/:userId",isSignedIn,isAuthentication,isAdmin,updateCategory)
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthentication,isAdmin,removeCategory)
module.exports=router;
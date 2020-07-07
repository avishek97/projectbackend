const express= require('express');
const router = express.Router();
const {getUser, getUserById,updateUser,userPurchaseList}=require('../controllers/user')
const {isAdmin,isSignedIn,isAuthentication}=require('../controllers/auth')

router.param('userId',getUserById)
router.get('/user/:userId',isSignedIn,isAuthentication,getUser)
router.get('/orders/user/:userId',isSignedIn,isAuthentication,userPurchaseList)
router.put('/user/:userId',isSignedIn,isAuthentication,updateUser)
module.exports=router;
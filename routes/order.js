const express =require('express')
const router=express.Router()
const {isAdmin,isAuthentication,isSignedIn} =require('../controllers/auth')
const {pushOrderInPurchaseList,getUserById} = require('../controllers/user')
const {updateStock}=require('../controllers/product')
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} = require('../controllers/order')
const { updateCategory } = require('../controllers/category')

router.post('/order/create/:userId',
isSignedIn,
isAuthentication,
pushOrderInPurchaseList,
updateCategory,
createOrder
)
router.get('/order/all/:userId', isSignedIn,isAuthentication,isAdmin,getAllOrders)

router.get('/order/status/:userId',isSignedIn,isAuthentication,isAdmin,getOrderStatus)
router.put('/order/:orderId/status/:userId', isSignedIn,isAuthentication,isAdmin,updateStatus)
module.exports=router
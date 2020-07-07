const express=require('express');
const router=express.Router();
const {check, validationResult}=require('express-validator')
const {signout, signup,signin,isSignedIn}= require("../controllers/auth")
// GET- To get data from DB or i can say just to get data from DB.
// POST- To insert something to DB.
// PUT- To update something to DB.
// DELETE- To delete data from DB.
router.post("/signup",[
    check("name","name should be more than 3 words ").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","password should of 3 character long").isLength({min:3})
],signup)

router.post('/signin',[
    check("email","Email is required").isEmail(),
    check("password","password should of 3 character long").isLength({min:3})
],signin)



router.get("/signout",signout) // we put all the call back into the controllers
module.exports=router; 
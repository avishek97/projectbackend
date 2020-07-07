const {email,password}=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            err:errors.array()[0].msg
            
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user)
        {
            res.status(400).json({
                err:"USER email do not exist!"
            })
        }
        if(!user.autheticate(password)){
            return res.status(401).json({
                 err:"Email and pAssword is invalid"
             })
         }
// Token to save the 
         const token=jwt.sign({_id:user._id},process.env.SECRET)

         res.cookie("token",token,{expire: new Date + 9999})

        //  send  response to frontend
        const {_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}});
    })


    {
        "email":"avi@gmail.com",
        "password":"123456",
        "name":"Avsihek",
        "lastname":"Mishra"
    }

































    
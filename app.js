require('dotenv').config();
// It loads the environment variables like PORT, mongodb connection link
// from a  .env file into peocess.env as it contain secret info
// it doesn't appear on UI.

const mongoose = require('mongoose');
const express=require('express');
const app=express();
// my routes
const authRouter=require("./routes/auth")
const putRouter=require('./routes/user')
const categoryRouter=require('./routes/category')
const productRouter=require('./routes/product')
const orderRouter=require('./routes/order')
// Middleware functions are functions that have access to the request object (req), the response object (res),
// and the next function in the application’s request-response cycle.


// body-parser extract the entire body portion of an incoming request stream and exposes it on req. body 
// This body-parser module parses the JSON, buffer, 
// string and URL encoded data submitted using HTTP POST request
const bodyParser=require("body-parser")
const cookieParser=require('cookie-parser') // using itjust to follow the bootcamp, personally dnt knw its impnce.

// it tells the browser to give a web application running at one origin access, 
//  to selected resources from a different origin.

const cors=require('cors')

// we put all the DB connections and schema into models

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch((err)=>{
    console.log(err)
 })

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api",authRouter); //we put all the routers into seperate router file
app.use('/api',putRouter);
app.use('/api',categoryRouter);
app.use('/api',productRouter);
app.use('/api',orderRouter);

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${8000}`)
})
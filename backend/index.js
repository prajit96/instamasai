const express=require("express")
var cors=require("cors")
const { userRoute } = require("./routes/user.route")
const { postRoute } = require("./routes/post.route")
const { connection } = require("./db")
const { auth } = require("./middleware/post.middleware")
const app=express()
app.use(cors())
app.use(express.json())
require("dotenv").config()
app.use("/users",userRoute)
app.use(auth)
app.use("/posts",postRoute)

app.listen(process.env.port, async ()=>{
    try{
        await connection
        console.log("Database is connected");
    }catch(err){
        console.log({msg:err.message});
    }
    console.log(`server is running at port ${process.env.port}`);
})

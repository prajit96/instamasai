const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const { isPresent } = require("../middleware/user.middleware")
const userRoute=express.Router()

userRoute.post("/register",isPresent,(req,res)=>{
    const {name,email,password,gender,age,city,is_married}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            const data=new UserModel({
                name,
                email,
                password:hash,
                gender,
                age,
                is_married,
            })
            await data.save()
            res.status(200).send("User egister Successfully")
        })
    }catch(err){
        res.status(400).send({msg: err.message})
    }
})

userRoute.post("/login", async (req,res)=>{
    const {email,password}=req.body
    try{
        const user= await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,(err,result)=>{
                if(result){
                    res.status(200).send({
                        msg:"user login successfully",
                        token:jwt.sign({userId:user._id},"masai")
                    })
                } else {
                    res.status(400).send({msg:"Wrong Credentials"})
                }
            })
        }
    }catch(err){
        res.status(400).send({msg:err.message})
    }
})

module.exports={
    userRoute
}
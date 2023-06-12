const {UserModel}=require("../models/user.model")

const isPresent=async (req,res,next)=>{
    const {email}=req.body
    const user = await UserModel.findOne({email})
    if(user){
        res.status({msg: "User already exist, please login"})
    }else{
        next()
    }
}
module.exports={
    isPresent
}
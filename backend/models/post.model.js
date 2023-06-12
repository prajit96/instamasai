const mongoose=require("mongoose")

const postSchema=new mongoose.Schema(
    {
        title: {type: String, required:true},
        body: {type: String, required:true},
        device: {type: String, required:true},
        no_of_comments: {type: String, required:true},
        userId:String
    },
    {
        versionKey:false,
    }
)

const PostModel=mongoose.model("post", postSchema)
module.exports={
    PostModel
}
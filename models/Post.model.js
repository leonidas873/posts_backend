import mongoose from "mongoose"

const Schema = mongoose.Schema



const postSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    text: {
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        default:[]
    },
    category:{
        type:String,
        required:true
    },
    authorId:{
        type:Schema.Types.ObjectId,
        required:true
    }
}, {timestamps:true})


export default mongoose.model('Post', postSchema)
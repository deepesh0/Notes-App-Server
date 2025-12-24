import mongoose from "mongoose";

const favlistSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'User required']
    },
        note:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'note',
        required:[true,'Note required']
    }
},{timestamps:true})

const FavList = mongoose.model('favlist',favlistSchema)
export default FavList
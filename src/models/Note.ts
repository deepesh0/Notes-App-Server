import mongoose from "mongoose";
//create a schema
//model based on that schema

const noteSchema= new mongoose.Schema({

    title:{
        type:String,
        required:true

    },
    content:{
        type:String,
        required:true
    },
    photo:{
        type:{  
        path:String,
        public_id:String       
    }},
        user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },

    
},{timestamps:true})//createdAt, updatedAT

const Note= mongoose.model("note", noteSchema)
export default Note;
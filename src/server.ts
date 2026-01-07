
import express from 'express';
import 'dotenv/config';
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import cookieParser  from 'cookie-parser'
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import userRoutes from './routes/userRoutes';
import favouriteRoutes from './routes/favouriteRoutes.js';

// console.log(process.env.MONGO_URI);

// const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
// console.log(process.env.PORT)


//middleware
app.use(cors({origin:'http://localhost:5173',
  credentials:true 
    
}))

app.use(cookieParser())
// app.use(express.json());
app.use(express.json({limit:'5mb'}))
app.use('/api/uploads',express.static('uploads/'))

app.use(rateLimiter)


app.use((req,res,next)=>{
    console.log(`Req method id ${req.method} & Req URL is ${req.url}`)
    next()
})

app.use("/api/notes", notesRoutes);
app.use("/api/auth",userRoutes)
app.use("/api/favourites",favouriteRoutes)

// app.get("/api/notes", (req,res) =>{
//     res.send("you are in notes");
// })

// app.post("/api/notes",(req,res) =>{
//     res.status(201).json({message:"post posted"});
// })
// //for example id hhtp://localhost:5050/api/notes/12345
// app.put("/api/notes/:id",(req,res) =>{
//     res.status(200).json({message:"post updated"});
// })

// app.delete("/api/notes/:id",(req,res) =>{
//     res.status(200).json({message:"post deleted"});
// })


connectDB().then(()=>{

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
})
})

 //mongodb+srv://bhattaraideepesh07_db_user:OuVljY6ybO7wAD9J@cluster0.ncgvjkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
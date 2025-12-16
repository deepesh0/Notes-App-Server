import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected succesfully")
    } catch(error){
    console.log("Error Connecting",error);
    
    process.exit(1); //failure
    }
}
connectDB()
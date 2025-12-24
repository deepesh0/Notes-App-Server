import mongoose from "mongoose";
import { db_config } from "./config";

export const connectDB = async () => {
  try {
    await mongoose.connect(db_config.db_uri, {
      dbName: db_config.db_name,
      autoCreate: true,
    });
    console.log("MongoDB Connected succesfully");
  } catch (error) {
    console.log("Error Connecting", error);

    process.exit(1); //failure
  }
};
connectDB();

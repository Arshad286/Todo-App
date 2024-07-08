import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connect = async () => {
  try{
     await mongoose.connect(process.env.CONNECTION_STRING)
     console.log("MongoDB connected");

  }catch(err){
     console.log("MongoDB connection failed", err);
  }
};


export default Connect ;